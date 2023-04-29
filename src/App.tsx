import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginOrRegister } from "./pages/LoginOrRegister";
// import { Layout } from "./Layout";
import { BuyerRegistrationForm } from "./pages/BuyerRegistrationForm";
import { BidderRegistrationForm } from "./pages/BidderRegistrationForm";
import { BuyerLandingPage } from "./pages/LandingPages/BuyerLandingPage";
import { BidderLandingPage } from "./pages/LandingPages/BidderLandingPage";
import { AdminLandingPage } from "./pages/LandingPages/AdminLandingPage";
import { CreateTender } from "./pages/LandingPages/CreateTender";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginOrRegister" element={<LoginOrRegister />} />
        <Route path="/BUYERRegistration" element={<BuyerRegistrationForm />} />
        <Route
          path="/BIDDERRegistration"
          element={<BidderRegistrationForm />}
        />
        <Route path="/BuyerLandingPage" element={<BuyerLandingPage />} />
        <Route path="/BidderLandingPage" element={<BidderLandingPage />} />
        <Route path="/AdminLandingPage" element={<AdminLandingPage />} />
        <Route path="/createTender" element={<CreateTender />} />
        {/* <Route path="/Layout" element={<Layout />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
