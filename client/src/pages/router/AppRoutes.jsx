import { Routes, Route } from "react-router-dom";
import Me from "../../me";
import Login from "../Login";
import Register from "../Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="me" element={<Me />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
