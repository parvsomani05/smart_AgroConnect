import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; // Adjust path as needed
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const OtpLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Initialize Recaptcha on component mount
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => console.log("reCAPTCHA verified!", response),
        "expired-callback": () => console.error("reCAPTCHA expired, please refresh."),
      });
    }
  }, []);

  // ✅ Function to send OTP
  const sendOtp = async () => {
    if (phone.length < 10) {
      setMessage("⚠️ Enter a valid phone number.");
      return;
    }

    const formattedPhone = `+${phone.replace(/\D/g, "")}`;
    try {
      const result = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setConfirmationResult(result);
      setMessage("✅ OTP Sent Successfully.");
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  // ✅ Function to verify OTP
  const verifyOtp = async () => {
    if (!confirmationResult) {
      setMessage("⚠️ Please request OTP first.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      setMessage("🎉 Login Successful!");
    } catch (error) {
      setMessage(`❌ Invalid OTP. Try Again.`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">OTP Login</h2>

      {/* Phone Number Input */}
      <input
        type="text"
        placeholder="Enter Phone Number"
        className="border p-2 w-full mb-2"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full mb-4"
        onClick={sendOtp}
      >
        Send OTP
      </button>

      {/* OTP Input */}
      <input
        type="text"
        placeholder="Enter OTP"
        className="border p-2 w-full mb-2"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
        onClick={verifyOtp}
      >
        Verify OTP
      </button>

      {/* Message Display */}
      <p className="mt-4 text-center">{message}</p>

      {/* reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OtpLogin;
