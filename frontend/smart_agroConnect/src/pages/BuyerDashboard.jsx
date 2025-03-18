import React, { useEffect, useState } from "react";
import axios from "axios";

const BuyerDashboard = () => {
  const [commodities, setCommodities] = useState([]);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commoditiesResponse = await axios.get(
          "http://localhost:5000/api/commodities"
        );
        const bidsResponse = await axios.get("http://localhost:5000/api/bids", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCommodities(commoditiesResponse.data);
        setBids(bidsResponse.data);
      } catch (error) {
        console.error("Error fetching buyer data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBid = async (commodityId, amount) => {
    try {
      await axios.post(
        "http://localhost:5000/api/bids/place",
        { amount, commodityId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Refresh bids
      const bidsResponse = await axios.get("http://localhost:5000/api/bids", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBids(bidsResponse.data);
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="display-4">Buyer Dashboard</h1>
      <div className="mt-4">
        <h2>Available Commodities</h2>
        <ul>
          {commodities.map((commodity) => (
            <li key={commodity._id}>
              {commodity.name} - {commodity.price} - {commodity.location}
              <button
                onClick={() =>
                  handleBid(commodity._id, prompt("Enter bid amount"))
                }
                className="btn btn-primary ms-2"
              >
                Place Bid
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2>Your Bids</h2>
        <ul>
          {bids.map((bid) => (
            <li key={bid._id}>
              {bid.amount} - {bid.commodity.name} - {bid.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BuyerDashboard;
