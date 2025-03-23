import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer"); // Default role
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!phone || !password) {
      setMessage("Please enter both phone number and password.");
      return;
    }

    console.log("Logging in with:", { phone, password, role });
    navigate(`/${role}-dashboard`);
  };

  const handleRegisterRedirect = () => {
    navigate(`/${role}-register`);
  };

  return (
    <div>
      <Navbar />
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-[#D4EDDA] p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
            Login
          </h2>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="font-bold block text-center mb-2">Select Role:</label>
            <div className="grid grid-cols-2 gap-3">
              {["farmer", "admin", "helper", "buyer"].map((r) => (
                <motion.div
                  key={r}
                  className={`cursor-pointer py-2 text-center rounded-lg font-semibold transition-all ${
                    role === r
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setRole(r)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </motion.div>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg transition-all"
              whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </button>
          </form>

          {message && <p className="text-center text-red-500 mt-4">{message}</p>}

          <p className="text-center mt-4">
            Not registered?{" "}
            <button
              onClick={handleRegisterRedirect}
              className="text-blue-500 hover:underline"
            >
              Create an account
            </button>
          </p>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
}
