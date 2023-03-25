import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setuser] = useState(
    Cookies.get("token") && jwt_decode(Cookies.get("token"))?.user  );
  return <AuthContext.Provider value={{user, setuser}}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
