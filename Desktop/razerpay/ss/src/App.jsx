import { useState, useEffect } from 'react'
import './App.css'
import BidDetails from './components/BidDetails'

function App() {
  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay SDK loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Farmer's Market</h1>
        <p>Buy directly from farmers with secure payments</p>
      </header>
      
      <main className="app-main">
        <BidDetails bidId="bid123" />
      </main>
      
      <footer className="app-footer">
        <p>© 2023 Farmer's Market. All rights reserved.</p>
        <p>Powered by Razorpay</p>
      </footer>
    </div>
  )
}

export default App
