"use client";
import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import DropdownMenu from "../../Home/components/DropdownMenu";
import search_page from "../../search_page/search_page";
import serche_page from "../../search_page/search_page";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  
  
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={""} alt="Logo" />
            <span className="text-xl tracking-tight">EventMaster</span>
            </div>
          {/* searche bar */}
          <div className="mb-0 xl:w-96">
          <div className="relative mb-0 flex w-full flex-wrap items-stretch">
            <form method="post" action={serche_page}>
              <input
                  type="search"
                  className="relative m-0  block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-300 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2" />
              </form>
              {/* <!--Search icon--> */}
              <span
                  className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                  id="basic-addon2">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5">
                      <path
                          fillRule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clipRule="evenodd" />
                  </svg>
              </span>
              
          </div>
      </div>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <Link to="/sign-in" className="py-2 px-3 border rounded-md hover:bg-neutral-700">Sign In</Link>
            <Link 
              to="/sign-up"
              className="bg-gradient-to-r from-blue-500 to-blue-800 py-2 px-3 rounded-md"
            >
              Create an account
            </Link>
          </div>
          <div className="flex justify-center items-center h-full ">
          <DropdownMenu />
          </div>
          </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
