import { useState } from "react";
import Chana from "../images/chana1.jpg";
import Kapas from "../images/kapas.jpg";
import Navbar from "../Components/Navbar";
import { FaFileUpload, FaIdCard, FaRegFileAlt,FaSearch, FaCheckCircle } from "react-icons/fa";

export default function FarmerRegistration() {

  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [aadharFile, setAadharFile] = useState(null);
  const [chequeFile, setChequeFile] = useState(null);
  const [selectedCommodities, setSelectedCommodities] = useState([]);
  const [formData, setFormData] = useState({
    mobileNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    pinCode: "",
    address: "",
    district: "",
    city: "",
    state: "",
    taluka: "",

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// step 3 functions 
  const handleAadharChange = (e) => {
    setAadharFile(e.target.files[0]);
  };
  
  const handleChequeChange = (e) => {
    setChequeFile(e.target.files[0]);
  };

  const isFormComplete = aadharFile && chequeFile;

   
  const commodities = [
    { name: "Chana (Chickpea)", image: Chana },
    { name: "Bajari (Pearl Millet)", image: Bajari },
    { name: "Ghau (Wheat)", image: Ghau },
    { name: "Kapas (Cotton)", image: Kapas }
  ];
  const toggleCommodity = (commodity) => {
    setSelectedCommodities((prev) =>
      prev.includes(commodity)
        ? prev.filter((item) => item !== commodity)
        : [...prev, commodity]
    );
  };

  const nextStep = () => {
    if (step < 4) {
      setCompletedSteps({ ...completedSteps, [step]: true });
      setStep(step + 1);
    }
  };

  const goToStep = (targetStep) => {
    if (completedSteps[targetStep - 1] || targetStep === 1) {
      setStep(targetStep);
    }
  };


  return (
    <div className="bg-green-50 min-h-screen">
      <Navbar />
      <div className="flex p-6">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-green-600 text-xl mb-4">Registration Steps</h2>
          <ul>
            {["Mobile Verification", "Basic Details", "Upload Documents", "Add Commodities"].map(
              (phase, index) => (
                <li
                  key={index}
                  className={`p-2 mb-2 rounded-lg cursor-pointer ${step === index + 1 ? "bg-green-300 text-white" : "bg-gray-100"}`}

                >
                  {phase}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Form */}
        <div className="w-3/4 bg-white p-6 rounded-lg shadow-md ml-6">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Farmer Registration</h2>

          {/* Step 1: Mobile Verification */}
          {step === 1 && (
            <div>
              <label className="block mb-2 font-semibold">Mobile Number*</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mb-4"
                placeholder="Enter your mobile number"
                required
              />
              
              <label className="block mb-2 font-semibold">Username*</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mb-4"
                placeholder="Enter your username"
                required
              />

              <label className="block mb-2 font-semibold">Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mb-4"
                placeholder="Enter password"
                required
              />

              <label className="block mb-2 font-semibold">Confirm Password*</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mb-4"
                placeholder="Confirm password"
                required
              />

              <button
                onClick={nextStep}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Basic Details */}
          {step === 2 && (
            <div>
              {/* Row 1 */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 font-semibold">Your Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Email ID*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">PIN Code*</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter PIN code"
                    required
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block mb-2 font-semibold">Your Address*</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">State*</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your state"
                    required
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block mb-2 font-semibold">District*</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your district"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">City/Town/Village*</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter city/town/village"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Taluka*</label>
                  <input
                    type="text"
                    name="taluka"
                    value={formData.taluka}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter taluka"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
               <div className="mt-6">
                <button onClick={() => goToStep(1)} className="bg-gray-300 px-6 py-2 rounded-lg mr-2 hover:bg-gray-400">
                  Back
                </button>
                <button onClick={nextStep} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
           
           
           <div className="flex justify-center p-6">
             <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
               <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
                 <FaFileUpload className="mr-2" /> Upload Documents
               </h2>
     
               <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col gap-4">
                 {/* Aadhaar Upload */}
                 <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-100">
                   <div className="flex items-center">
                     <FaIdCard className="text-2xl text-gray-600 mr-2" />
                     <span>Aadhaar Card/Voter ID</span>
                   </div>
                   <div>
                     <input type="file" id="aadharUpload" className="hidden" onChange={handleAadharChange} />
                     <label htmlFor="aadharUpload" className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">Browse</label>
                   </div>
                 </div>
                 {aadharFile && <p className="text-green-600">Uploaded: {aadharFile.name}</p>}
     
                 {/* Cancelled Cheque Upload */}
                 <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-100">
                   <div className="flex items-center">
                     <FaRegFileAlt className="text-2xl text-gray-600 mr-2" />
                     <span>Cancelled Cheque</span>
                   </div>
                   <div>
                     <input type="file" id="chequeUpload" className="hidden" onChange={handleChequeChange} />
                     <label htmlFor="chequeUpload" className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">Browse</label>
                   </div>
                 </div>
                 {chequeFile && <p className="text-green-600">Uploaded: {chequeFile.name}</p>}
               </div>
               
               <div className="mt-6">
                <button onClick={() => goToStep(2)} className="bg-gray-300 px-6 py-2 rounded-lg mr-2 hover:bg-gray-400">
                  Back
                </button>
                <button 
                    onClick={nextStep}
                    className={`px-6 py-2 rounded-lg mt-4 ${isFormComplete ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-500"}`} 
                    disabled={!isFormComplete}
                  >
                  Continue
                </button>
              </div>
             </div>
           </div>
        
          )}
       
       {step === 4 && (
  <div className="w-3/4 bg-white p-6 rounded-lg shadow-md ml-6">
    <h2 className="text-2xl font-bold text-green-600 mb-4">Select Your Commodities</h2>
    
    {/* Search Bar */}
    <div className="relative mb-4">
      <input
        type="text"
        className="w-full p-3 border rounded-lg pl-10"
        placeholder="Search commodities..."
      />
      <FaSearch className="absolute left-3 top-3 text-gray-500" />
    </div>

    {/* Commodities Grid */}
    <div className="grid grid-cols-4 gap-4">
      {commodities.map((commodity, index) => (
        <div
          key={index}
          className={`border rounded-lg p-2 cursor-pointer text-center ${
            selectedCommodities.includes(commodity.name) ? "bg-green-200" : "bg-gray-100"
          }`}
          onClick={() => toggleCommodity(commodity.name)}
        >
          <img src={commodity.image} alt={commodity.name} className="w-full h-20 object-cover rounded" />
          <p className="mt-2 font-semibold">{commodity.name}</p>
        </div>
      ))}
    </div>

    {/* Selected Commodities */}
    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
      <h3 className="font-bold text-green-600">Selected Commodities</h3>
      {selectedCommodities.length > 0 ? (
        <ul className="mt-2">
          {selectedCommodities.map((item, idx) => (
            <li key={idx} className="flex items-center text-green-700">
              <FaCheckCircle className="mr-2" /> {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You haven't picked any commodity yet.</p>
      )}
    </div>

    {/* Navigation Buttons */}
    <div className="mt-6 flex justify-between">
      <button onClick={() => goToStep(3)} className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400">
        Back
      </button>
      <button 
        onClick={selectedCommodities.length > 0 ? nextStep : null} 
        className={`px-6 py-2 rounded-lg ${
          selectedCommodities.length > 0 ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`} 
        disabled={selectedCommodities.length === 0}
      >
        Submit
      </button>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
} 