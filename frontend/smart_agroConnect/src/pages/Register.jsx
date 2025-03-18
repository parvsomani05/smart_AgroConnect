import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Farmer");
  const [panCard, setPanCard] = useState("");
  const [cancelledCheque, setCancelledCheque] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role,
          documents: { panCard, cancelledCheque },
        }
      );
      localStorage.setItem("token", data.token);
      if (role === "Farmer") {
        history.push("/farmer-dashboard");
      } else if (role === "Buyer") {
        history.push("/buyer-dashboard");
      } else if (role === "Helper") {
        history.push("/helper-dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="display-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select"
            required
          >
            <option value="Farmer">Farmer</option>
            <option value="Buyer">Buyer</option>
            <option value="Helper">Helper</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">PAN Card</label>
          <input
            type="text"
            value={panCard}
            onChange={(e) => setPanCard(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cancelled Cheque</label>
          <input
            type="text"
            value={cancelledCheque}
            onChange={(e) => setCancelledCheque(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
