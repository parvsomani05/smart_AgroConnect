import { useState } from "react";
import OTPInput from "../../components/OTPInput";

export default function FarmerLogin() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-2xl font-bold mb-5">Farmer Login - Step {step}/4</h2>
      
      {step === 1 && (
        <div>
          <h3>OTP Authentication</h3>
          <OTPInput />
          <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 mt-3">Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Personal Details</h3>
          <input type="text" placeholder="Full Name" className="border p-2 w-full" />
          <input type="text" placeholder="Phone Number" className="border p-2 w-full mt-2" />
          <button onClick={handleBack} className="bg-gray-400 text-white px-4 py-2 mt-3">Back</button>
          <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 mt-3 ml-2">Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Upload Documents</h3>
          <input type="file" className="border p-2 w-full" />
          <button onClick={handleBack} className="bg-gray-400 text-white px-4 py-2 mt-3">Back</button>
          <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 mt-3 ml-2">Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3>Select Commodity</h3>
          <select className="border p-2 w-full">
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
          </select>
          <button onClick={handleBack} className="bg-gray-400 text-white px-4 py-2 mt-3">Back</button>
          <button className="bg-green-500 text-white px-4 py-2 mt-3 ml-2">Submit</button>
        </div>
      )}
    </div>
  );
}
