import { useState, useEffect } from 'react';
import Checkout from './Checkout';
import './BidDetails.css';

// This is a mock component - in a real app, you would fetch this data from your API
const BidDetails = ({ bidId }) => {
  const [bid, setBid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Mock user data (in a real app, this would come from authentication)
  const buyer = {
    id: "buyer123",
    name: "John Buyer",
    email: "buyer@example.com",
    phone: "9876543210"
  };
  
  useEffect(() => {
    // Mock API call to get bid details
    const fetchBidDetails = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock bid data
        const mockBid = {
          id: bidId || "bid123",
          farmerId: "farmer456",
          buyerId: "buyer123",
          productName: "Organic Tomatoes",
          initialPrice: 80,
          winningPrice: 95,
          status: "completed",
          isWinner: true
        };
        
        // Mock farmer data
        const mockFarmer = {
          id: "farmer456",
          name: "Alice Farmer",
          quantity: 10, // kg or units
          product: "Organic Tomatoes"
        };
        
        setBid({
          ...mockBid,
          farmer: mockFarmer
        });
        
        setLoading(false);
      } catch (err) {
        setError("Failed to load bid details");
        setLoading(false);
      }
    };
    
    fetchBidDetails();
  }, [bidId]);
  
  if (loading) {
    return <div className="loading">Loading bid details...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (!bid) {
    return <div className="not-found">Bid not found</div>;
  }
  
  return (
    <div className="bid-details-container">
      <h2>Bid Details</h2>
      
      <div className="bid-card">
        <div className="bid-header">
          <h3>{bid.farmer.product}</h3>
          <span className={`status ${bid.status}`}>{bid.status}</span>
        </div>
        
        <div className="bid-body">
          <p><strong>Farmer:</strong> {bid.farmer.name}</p>
          <p><strong>Initial Price:</strong> ₹{bid.initialPrice} per unit</p>
          <p><strong>Winning Price:</strong> ₹{bid.winningPrice} per unit</p>
          <p><strong>Quantity:</strong> {bid.farmer.quantity} units</p>
          <p><strong>Total Amount:</strong> ₹{bid.winningPrice * bid.farmer.quantity}</p>
        </div>
        
        {bid.isWinner && !showCheckout && (
          <div className="bid-actions">
            <button 
              onClick={() => setShowCheckout(true)}
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      
      {showCheckout && (
        <div className="checkout-section">
          <Checkout 
            bid={bid} 
            farmer={bid.farmer} 
            buyer={buyer} 
          />
        </div>
      )}
    </div>
  );
};

export default BidDetails; 