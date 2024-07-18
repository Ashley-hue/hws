import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/LoginSignup";
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Services from "./pages/Services";
import WeldingMachines from "./pages/WeldingMachines";
import WeldingRods from "./pages/WeldingRods";
import WeldingAccessories from "./pages/WeldingAccessories";
import Descriptions from "./pages/Descriptions";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/weldingmachines" element={<WeldingMachines />} />
            <Route path="/weldingrods" element={<WeldingRods />} />
            <Route
              path="/weldingaccessories"
              element={<WeldingAccessories />}
            />
            <Route path="/description" element={<Descriptions/>}/>
          </Routes>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
/*Account business not cash business*/
