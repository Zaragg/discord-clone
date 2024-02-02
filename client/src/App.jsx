import { useState } from "react";
import AppRoutes from "./pages/router/AppRoutes";
import serverList from "./components/serverList";
import "./App.css";
import "./assets/stylesheets/form.css";
import "./assets/stylesheets/mainpage.css";

function App() {
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
