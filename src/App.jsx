import { useState } from "react";

// import "./App.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Index from "./Components";
import Auth from "./pages/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import GalleryGrid from "./Components/Gallery";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
