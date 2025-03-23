import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const API_URL = `${BASE_URL}/api/payment`;

// Create axios instance with proper timeout
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

class PaymentService {
  // Create Razorpay order
  static async createOrder(paymentData) {
    try {
      const response = await apiClient.post('/create-order', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Verify payment after successful transaction
  static async verifyPayment(paymentData) {
    try {
      const response = await apiClient.post('/verify-payment', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }

  // Get transaction details by ID
  static async getTransactionDetails(transactionId) {
    try {
      const response = await apiClient.get(`/transaction/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction details:', error);
      throw error;
    }
  }
}

export default PaymentService; 