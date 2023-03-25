import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(
    Cookies.get("token") && jwt_decode(Cookies.get("token"))
  );
  const [userdata, setuserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "http://localhost:8800/api/auth/user",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              token: Cookies.get("token"),
            },
          }
        );
        setuserData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  if (loading) return "Loading";

  return (
    <AuthContext.Provider
      value={{ verified, setVerified, user, setUser, userdata, setuserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
