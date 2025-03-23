const Razorpay = require('razorpay');
const crypto = require('crypto');
const Transaction = require('../models/transaction.model');
const dotenv = require('dotenv');

// Ensure environment variables are loaded
dotenv.config();

// Initialize Razorpay with key values from environment variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error('Razorpay API keys are missing in environment variables');
  console.error('Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file');
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET
});

// Create an order for payment
exports.createOrder = async (req, res) => {
  try {
    const { buyerId, farmerId, winningBidPrice, quantity } = req.body;
    
    // Validate request
    if (!buyerId || !farmerId || !winningBidPrice || !quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Calculate total amount
    const totalAmount = winningBidPrice * quantity;
    
    // Razorpay requires amount in smallest currency unit (paise for INR)
    const amountInPaise = Math.round(totalAmount * 100);
    
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto capture payment
    });
    
    // Create transaction record
    try {
      const transaction = new Transaction({
        buyerId,
        farmerId,
        winningBidPrice,
        quantity,
        totalAmount,
        razorpayOrderId: order.id,
        paymentStatus: 'pending'
      });
      
      await transaction.save();
      
      return res.status(200).json({
        success: true,
        order,
        transaction: {
          id: transaction._id,
          amount: totalAmount,
          currency: 'INR'
        },
        key: RAZORPAY_KEY_ID
      });
    } catch (dbError) {
      console.error('Error saving transaction:', dbError);
      
      // If DB fails, still return order for payment processing
      return res.status(200).json({
        success: true,
        order,
        transaction: {
          id: 'temp_' + Date.now(),
          amount: totalAmount,
          currency: 'INR'
        },
        key: RAZORPAY_KEY_ID
      });
    }
    
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

// Verify payment signature
exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpayOrderId, 
      razorpayPaymentId, 
      razorpaySignature,
      transactionId 
    } = req.body;
    
    // Create a signature using the order_id and payment_id
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');
    
    // Compare the signatures
    const isValid = expectedSignature === razorpaySignature;
    
    if (isValid) {
      // Update transaction with payment details
      try {
        await Transaction.findByIdAndUpdate(transactionId, {
          razorpayPaymentId,
          razorpaySignature,
          paymentStatus: 'completed'
        });
      } catch (dbError) {
        console.error('Error updating transaction:', dbError);
      }
      
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      // Update transaction status to failed
      try {
        await Transaction.findByIdAndUpdate(transactionId, {
          paymentStatus: 'failed'
        });
      } catch (dbError) {
        console.error('Error updating transaction:', dbError);
      }
      
      res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};

// Get payment details by transaction ID
exports.getPaymentDetails = async (req, res) => {
  try {
    const { transactionId } = req.params;
    
    const transaction = await Transaction.findById(transactionId);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    res.status(200).json({
      success: true,
      transaction
    });
    
  } catch (error) {
    console.error('Get payment details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment details',
      error: error.message
    });
  }
}; 