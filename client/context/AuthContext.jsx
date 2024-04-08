import { createContext, useContext, useState } from "react";
export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
