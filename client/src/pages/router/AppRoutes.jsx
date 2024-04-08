import { Routes, Route, Navigate } from "react-router-dom";
import Me from "../Me";
import Server from "../Server";
import Login from "../Login";
import Register from "../Register";
import { useAuthContext } from "../../../context/AuthContext";

const AppRoutes = () => {
  const { authState } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={authState ? <Me /> : <Navigate to="/login" />} />
      <Route
        path="/channels/@me"
        element={authState ? <Me /> : <Navigate to="/login" />}
      />
      <Route
        path="/channels/:serverId/"
        element={authState ? <Server /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={authState ? <Navigate to="/channels/@me" /> : <Login />}
      />
      <Route
        path="/register"
        element={authState ? <Navigate to="/channels/@me" /> : <Register />}
      />
    </Routes>
  );
};

export default AppRoutes;
