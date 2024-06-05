"use client";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import SignIn from '../pages/Sign-in/Sign-in';
import SignUp from '../pages/Sign-up/Sign-up';
import Serche_page from '../pages/search_page/search_page';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="sign-up" element={<SignUp/>} />
    <Route path="/" element={<Home/>} /> 
    <Route path="sign-in" element={<SignIn/>} />
    <Route path="/search" element={<Serche_page/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
