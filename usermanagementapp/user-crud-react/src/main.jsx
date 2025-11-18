import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import AddUser from "./pages/AddUser.jsx";
import EditUser from "./pages/EditUser.jsx";
import UserDetails from "./pages/UserDetails.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="users/:id" element={<UserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
