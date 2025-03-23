import { useState } from 'react';
import PaymentService from '../services/PaymentService';
import './Checkout.css';

const Checkout = ({ bid, farmer, buyer }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  // Handle checkout button click
  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Calculate total amount
      const totalAmount = bid.winningPrice * farmer.quantity;
      
      // Prepare payment data
      const paymentData = {
        buyerId: buyer.id,
        farmerId: farmer.id,
        winningBidPrice: bid.winningPrice,
        quantity: farmer.quantity
      };
      
      // Create Razorpay order
      const orderData = await PaymentService.createOrder(paymentData);
      
      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }
      
      // Save transaction ID for later use
      setTransactionId(orderData.transaction.id);
      
      // Make sure Razorpay is available
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK is not loaded. Please check your internet connection.');
      }
      
      // Open Razorpay payment form
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Farmer's Market",
        description: `Payment for Bid #${bid.id}`,
        order_id: orderData.order.id,
        handler: function(response) {
          // Handle successful payment
          handlePaymentSuccess(response);
        },
        prefill: {
          name: buyer.name,
          email: buyer.email,
          contact: buyer.phone
        },
        notes: {
          buyerId: buyer.id,
          farmerId: farmer.id,
          bidId: bid.id
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };
      
      const razorpayWindow = new window.Razorpay(options);
      razorpayWindow.open();
      
      // Handle modal close or escape key
      razorpayWindow.on('payment.failed', function(response) {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error.message || 'Payment process failed. Please try again later.');
      setLoading(false);
    }
  };
  
  // Handle payment success from Razorpay
  const handlePaymentSuccess = async (response) => {
    try {
      // Verify payment with our backend
      const verificationData = {
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
        transactionId: transactionId
      };
      
      const result = await PaymentService.verifyPayment(verificationData);
      
      if (result.success) {
        setSuccess(true);
        setError(null);
      } else {
        setError('Payment verification failed. Please contact support.');
      }
      
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Payment verification failed');
      setLoading(false);
    }
  };
  
  if (success) {
    return (
      <div className="payment-success">
        <h3>Payment Successful!</h3>
        <p>Your transaction has been completed.</p>
        {transactionId && (
          <p>Transaction ID: {transactionId}</p>
        )}
      </div>
    );
  }
  
  return (
    <div className="checkout-container">
      <div className="bid-details">
        <h3>Bid Details</h3>
        <div className="bid-info">
          <p><strong>Winning Price:</strong> ₹{bid.winningPrice}</p>
          <p><strong>Quantity:</strong> {farmer.quantity} units</p>
          <p><strong>Total Amount:</strong> ₹{bid.winningPrice * farmer.quantity}</p>
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <button 
        className="checkout-button" 
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Proceed to Checkout'}
      </button>
    </div>
  );
};

export default Checkout; 