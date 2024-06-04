"use client";
import Navbar from "./components/Navbar";
import React, { useState } from 'react';
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";

const changeColor = () => {
    setBgColor(bgColor === 'bg-blue-500' ? 'bg-green-500' : 'bg-blue-500');
  };
const App = () => {
  
  return (
    <>
      <Navbar/>
       <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection></HeroSection>
        <Footer></Footer>
       </div>
      {/*  <HeroSection />
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
