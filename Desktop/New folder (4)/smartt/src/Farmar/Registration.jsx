import React, { useState } from "react";
import FarmerRegistration from "./farmer-register";

const Registration = () => {
  const [role, setRole] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
      <div className="flex gap-4">
        {["Farmer", "Buyer", "Admin", "Helper"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-6 py-2 rounded-lg ${
              role === r ? "bg-green-500 text-white" : "bg-gray-300"
            } hover:bg-green-600`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mt-8 w-full max-w-lg">
        {role === "Farmer" && <FarmerRegistration />}
        {role === "Buyer" && <p>Buyer Registration Form Coming Soon...</p>}
        {role === "Admin" && <p>Admin Registration Form Coming Soon...</p>}
        {role === "Helper" && <p>Helper Registration Form Coming Soon...</p>}
      </div>
    </div>
  );
};

export default Registration;
