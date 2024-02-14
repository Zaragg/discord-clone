import { Routes, Route } from "react-router-dom";
import Server from "../Server";
import Login from "../Login";
import Register from "../Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/channels/@me" element={<Server />} />
      <Route path="/channels/:serverId/:channelId" element={<Server />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
