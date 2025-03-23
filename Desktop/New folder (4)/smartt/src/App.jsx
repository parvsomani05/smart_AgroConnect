import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./assets/Home";
import Otplogin from "./Farmar/Otplogin"; // ✅ Corrected path
import Registration from "./Farmar/Registration";
import LoginForAll from "./assets/LoginForAll";
import HelperRegister from "./Helper-entity/helper-register";
import BuyerRegister from "./Buyer/buyer-register";
import FarmerRegister from "./Farmar/farmer-register";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<LoginForAll />} />
        <Route path="/helper-register" element={<HelperRegister />} />
        <Route path="/buyer-register" element={<BuyerRegister />} />
        <Route path="/farmer-register" element={<FarmerRegister />} />
        <Route path="/otp-login" element={<Otplogin />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
