import Cookies from "js-cookie";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./Contexts/AuthContext";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

function App() {
  const navigate = useNavigate();
  const login = Cookies.get("token");

  useEffect(() => {
    if (!login) return navigate("/login");
  }, []);

  return (
    <AuthContextProvider>
      {login ? (
        <Dashboard />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </AuthContextProvider>
  );
}

export default App;
