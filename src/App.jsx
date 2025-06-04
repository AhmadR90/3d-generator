import { useState } from "react";

// import "./App.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Index from "./Components";
import Auth from "./pages/Auth";
import ProtectedRoute from "./Components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Footer from "./Components/Footer";
import Subscribe from "./pages/Subscribe";
import Library from "./pages/Library";
import ProfileSettings from "./pages/Profile";
import TokenVerification from "./pages/userVerification";
import ContactPage from "./pages/Contact";
 import useAxiosAuth from "./Hooks/useAxiosAuth"
import SubscriptionFailure from "./pages/PaymentCancel";
// import GalleryGrid from "./Components/Gallery";

function App() {
  // useAxiosAuth()
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/userverification" element={<TokenVerification />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/cancel"
            element={
              <ProtectedRoute>
                <SubscriptionFailure />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
