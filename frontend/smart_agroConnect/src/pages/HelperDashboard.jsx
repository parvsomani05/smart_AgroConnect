import React, { useEffect, useState } from "react";
import axios from "axios";

const HelperDashboard = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFarmers(response.data.filter((user) => user.role === "Farmer"));
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="display-4">Helper Dashboard</h1>
      <div className="mt-4">
        <h2>Assigned Farmers</h2>
        <ul>
          {farmers.map((farmer) => (
            <li key={farmer._id}>
              {farmer.name} - {farmer.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HelperDashboard;
