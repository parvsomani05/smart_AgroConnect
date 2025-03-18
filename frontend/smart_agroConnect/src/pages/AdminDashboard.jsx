import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:5000/api/admin/users"
        );
        const commoditiesResponse = await axios.get(
          "http://localhost:5000/api/admin/commodities"
        );
        const bidsResponse = await axios.get(
          "http://localhost:5000/api/admin/bids"
        );
        setUsers(usersResponse.data);
        setCommodities(commoditiesResponse.data);
        setBids(bidsResponse.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="display-4">Admin Dashboard</h1>
      <div className="mt-4">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.role}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2>Commodities</h2>
        <ul>
          {commodities.map((commodity) => (
            <li key={commodity._id}>
              {commodity.name} - {commodity.farmer.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2>Bids</h2>
        <ul>
          {bids.map((bid) => (
            <li key={bid._id}>
              {bid.amount} - {bid.commodity.name} - {bid.buyer.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
