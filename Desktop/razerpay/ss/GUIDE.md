# Razorpay Integration - Getting Started Guide

This guide will walk you through setting up and running the Razorpay integration for the Farmer's Market application.

## Prerequisites

1. Node.js (v14 or higher)
2. MongoDB installed and running locally
3. Razorpay test account credentials

## Setup Instructions

### 1. Install Dependencies

First, install all required dependencies for both the frontend and backend:

```bash
# From the root directory (ss)
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment Variables

Create or edit the `.env` file in the `server` directory:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/razorpay-integration
RAZORPAY_KEY_ID=rzp_test_TnCsMiuVFGUDje
RAZORPAY_KEY_SECRET=e69v60Wqs04qOHo05TCP4jka
```

Replace the Razorpay keys with your own test account keys.

### 3. Start MongoDB

Ensure MongoDB is running on your local machine before starting the application.

```bash
# Check if MongoDB is running (you should see a MongoDB process)
ps aux | grep mongod
```

If MongoDB is not running, start it using the appropriate command for your operating system.

### 4. Run the Application

You can run both the frontend and backend simultaneously:

```bash
# From the root directory (ss)
npm run start-all
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

Alternatively, you can run them separately:

```bash
# Start frontend only
npm run dev

# Start backend only
npm run start-server
```

## Testing the Integration

1. Open http://localhost:5173 in your browser
2. You'll see a bid details page with a "Proceed to Checkout" button
3. Click on the button to open the Razorpay payment dialog
4. For testing, use these credentials:
   - Card Number: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: Any 3 digits
   - Name: Any name

## Troubleshooting

If you encounter any issues:

1. **Connection refused errors**: Ensure both the frontend and backend servers are running.
2. **MongoDB errors**: Make sure MongoDB is running on port 27017.
3. **Razorpay not loading**: Check browser console for errors and ensure your internet connection is working.
4. **CORS issues**: The server is configured to accept requests from any origin, but if you experience CORS errors, ensure the frontend is calling the correct backend URL.

## Development Tips

- The frontend is built with React + Vite
- The backend uses Express.js with MongoDB
- All payment-related logic is in the `Checkout.jsx` component and `PaymentService.js`
- Test data is provided in `BidDetails.jsx` (in a real app, this would come from an API) 