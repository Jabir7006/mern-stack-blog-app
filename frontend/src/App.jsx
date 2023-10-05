import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {UserProvider} from "./context/userContext";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
