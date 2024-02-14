import { Routes, Route } from "react-router-dom";
import Me from "../Me";
import Server from "../Server";
import Login from "../Login";
import Register from "../Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/channels/@me" element={<Me />} />
      <Route path="/channels/:serverId/" element={<Server />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
