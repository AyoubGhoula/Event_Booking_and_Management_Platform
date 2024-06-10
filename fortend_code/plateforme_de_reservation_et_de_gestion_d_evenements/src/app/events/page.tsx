import React, { useState, useRef, useEffect } from'react';
import Dashbord from "./components/dashbord";
import Navbar from "./components/Navbar";
import HeroSection from './components/herosation';


const events=() =>{

    return (
<>

            <Navbar/>
            <div className='max-w-7xl mx-auto px-6 flex-col '> 
                <Dashbord/> 
                <HeroSection/>
            </div> 
      </>

);

}
export default events ;