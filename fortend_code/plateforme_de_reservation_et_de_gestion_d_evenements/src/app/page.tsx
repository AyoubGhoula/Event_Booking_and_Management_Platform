"use client";
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import SignIn from '../pages/Sign-in/Sign-in';
import SignUp from '../pages/Sign-up/Sign-up';
import { BroadcastChannel } from 'worker_threads';



const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/sign-up" element={<SignUp/>} />
    <Route path="/" element={<Home/>} /> 
    <Route path="/sign-in" element={<SignIn/>} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
