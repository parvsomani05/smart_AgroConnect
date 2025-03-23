import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FarmerLogin from "./pages/Farmer/FarmerLogin";
import BuyerLogin from "./pages/Buyer/BuyerLogin";
import AdminLogin from "./pages/Admin/AdminLogin";
import HelperLogin from "./pages/Helper/HelperLogin";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path="/farmer/login" element={<FarmerLogin />} />
      <Route path="/buyer/login" element={<BuyerLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/helper/login" element={<HelperLogin />} />
    </Routes>
  </Router>
  );
}

export default App
