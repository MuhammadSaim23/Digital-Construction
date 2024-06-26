import React from "react";
import Home from "./pages";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from './pages/signin'
import SignupPage from "./pages/signup";
import DashboardHome from "./pages/Dashboard";
import BuilderdashboardPage from "./pages/Builderdashboard";
import CustomerdashboardPage from "./pages/Customerdashboard";
import InspectordashboardPage from "./pages/Inspectordashboard";
import AdmindashboardPage from "./pages/Admindashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/signin" element={<SigninPage />} exact />
        <Route path="/signup" element={<SignupPage />} exact />
        <Route path="/Companydashboard" element={<DashboardHome />} exact />
        <Route path="/Builderdashboard" element={<BuilderdashboardPage />} exact />
        <Route path="/Customerdashboard" element={<CustomerdashboardPage />} exact />
        <Route path="/Inspectordashboard" element={<InspectordashboardPage />} exact />
        <Route path="/Admindashboard" element={<AdmindashboardPage />} exact />
      </Routes>
    </Router>
  );
}

export default App;
