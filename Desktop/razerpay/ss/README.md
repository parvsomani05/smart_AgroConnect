# Razorpay Integration for Farmer's Market

This project integrates Razorpay payment gateway for a marketplace where farmers can sell their produce and buyers can make payments using Razorpay.

## Project Structure

The project consists of two main parts:
1. **Frontend**: React application
2. **Backend**: Node.js + Express + MongoDB

## Setup Instructions

### Prerequisites
- Node.js and npm
- MongoDB
- Razorpay test account

### Backend Setup
1. Navigate to the server directory:
   ```
   cd ss/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file with the following:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/razorpay-integration
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the project directory:
   ```
   cd ss
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Features

- Display bid details between farmers and buyers
- Calculate total amount based on winning bid price and quantity
- Integrate with Razorpay payment gateway
- Process secure payments
- Store transaction details in MongoDB

## Payment Flow

1. Buyer wins a bid
2. Buyer clicks "Proceed to Checkout"
3. System calculates the total amount (winningBidPrice * quantity)
4. Creates a Razorpay order through the backend
5. Opens Razorpay payment dialog
6. After successful payment, verifies the payment signature
7. Stores transaction details in the database
8. Shows confirmation to the user

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment**: Razorpay API

## License

MIT
