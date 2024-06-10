"use client";
import Navbar from "./components/Navbar";
import React, { useState } from 'react';
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";   



const App = () => {
  
  return (
    <>
      <Navbar/>
       <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection></HeroSection>
        <Footer></Footer>
       </div>
      {/*  <HeroSection   />
        <FeatureSection />
        <Workflow />
        <Pricing />
        <Testimonials />
        <Footer /> */}
      {/* </div> */}
    </>
  );
};

export default App;
