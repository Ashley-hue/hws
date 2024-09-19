import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import AuthWrapper from "./components/AuthWrapper";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Services from "./pages/Services";
import WeldingMachines from "./pages/WeldingMachines";
import WeldingRods from "./pages/WeldingRods";
import WeldingAccessories from "./pages/WeldingAccessories";
import Descriptions from "./pages/Descriptions";
import LoginSignup from "./pages/LoginSignup";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/login-signup";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/weldingmachines" element={<WeldingMachines />} />
        <Route path="/weldingrods" element={<WeldingRods />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/weldingaccessories" element={<WeldingAccessories />} />
        <Route path="/description" element={<Descriptions />} />
        <Route path="/product/:productId" element={<Descriptions/>}/>
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthWrapper>
        <div>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </div>
      </AuthWrapper>
    </AuthProvider>
  );
}

export default App;
