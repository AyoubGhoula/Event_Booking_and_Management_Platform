"use client";
import Link from 'next/link';
import React, {useState } from "react";
import { Menu, X } from "lucide-react";
// import DropdownMenu from "./DropdownMenu";
import serche_page from "../../search/page";

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
    };
    
    
    return (
    <>
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-2 relative lg:text-sm">
        <div className="flex left-0 justify-between items-center">
            <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 " src={""} alt="Logo" />
            <span className="text-xl tracking-tight">EventMaster</span>
            </div>
           
                
            
        
            <div className="hidden lg:flex justify-center space-x-12 items-center">
       
            </div>
            <div className="flex justify-center items-center h-full ">
            {/* <DropdownMenu /> */}
            </div>
            <div className="lg:hidden md:flex flex-col justify-end">
            </div>
        </div>
        </div>
    </nav>
    </>
    );
};

export default Navbar;

