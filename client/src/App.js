import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import About from "./Pages/About";
import Footer from "./Components/Footer";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import { useAuthContext } from "./Contexts/AuthContext";
import Forget from "./Pages/Forget";
import ResetPassword from "./Pages/ResetPassword";
import OrderHistory from "./Pages/OrderHistory";
import Verifcation from "./Pages/Verifcation";
import Chat from "./Components/Chat";

function App() {
  const location = useLocation()
  const { userdata , user } = useAuthContext();


  return (
    <>
      {!(location.pathname === "/verify") && user && userdata?.verified === false && userdata && (
        <div
          class="d-flex align-items-center justify-content-around alert alert-danger w-100 mb-0 rounded-0"
          role="alert"
          style={{ zIndex: 2000000 }}
        >
          WARNING: Complete the KYC verification{" "}
          <a
            className="continue w-auto fs-6 px-4 py-2 mt-0"
            style={{ whiteSpace: "nowrap" }}
            target="_blank"
            href={`/verify?${userdata.neocheckId}`}
          >
            Verify Now!
          </a>
        </div>
      )}

      {userdata && (
      <Chat />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/verify" element={<Verifcation />} />
        <Route path="/forgotpassword" element={<Forget />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
