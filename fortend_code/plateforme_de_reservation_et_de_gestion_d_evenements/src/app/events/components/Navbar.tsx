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
            {/* searche bar */}
            <div className="mb-0 xl:w-auto mx-auto">
            <div className="relative mb-0 flex w-full flex-wrap items-stretch">
            <form method="post" action={serche_page}>
            <input
              type="search"
              className="relative block w-64 md:w-96 lg:w-[30rem] flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-4 py-2 text-base font-normal leading-6 text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-3 focus:border-primary focus:text-neutral-300 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
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
       
            </div>
            <div className="flex justify-center items-center h-full ">
            {/* <DropdownMenu /> */}
            </div>
            <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
            </div>
        </div>
        {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            
            <div className="flex space-x-6">
                <a href="" className="py-2 px-3 border rounded-md hover:bg-neutral-700">
                Sign In
                </a>
                <a
                href="#"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-800"
                >
                Create an account
                    </a>
            </div>
            </div>
        )}
        </div>
    </nav>
    </>
    );
};

export default Navbar;

{/*<div className="w-full bg-gray-900 text-gray-200 border-b border-gray-800">
                <div className="mx-auto h-16 items-center justify-between px-4 flex">
                  <div>
                    <img src="https://res.cloudinary.com/speedwares/image/upload/v1659284687/windframe-logo-main_daes7r.png"
                        className="block invert h-8 w-auto"/>
                  </div>
                  <div className="ml-40 mr-auto lg:block relative hidden max-w-xs">
                    <p className="items-center pl-3 pointer-events-none absolute inset-y-0 left-0 flex">
                      <span className="items-center justify-center flex">
                        <span className="items-center justify-center flex">
                          <span className="h-5 w-5 items-center justify-center text-gray-400 flex">
                            <span className="items-center justify-center h-full w-full flex">
                              <svg className="w-full h-full" fill="none"  stroke="currentColor"
                                  stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7
                                  0 11-14 0 7 7 0 0114 0z"/></svg>
                            </span>
                          </span>
                        </span>
                      </span>
                    </p>
                    <input type="search" placeholder="Type to search" className="border border border-gray-700
                        focus:border-indigo-600 focus:ring-indigo-600 w-full rounded-lg bg-gray-800 px-3 py-2 pb-2 pl-10 pt-2
                        text-gray-300 sm:text-sm"/>
                  </div>
                  <div className="ml-auto items-center justify-end md:space-x-6 flex space-x-3">
                    <div className="relative">
                      <p className="rounded-full bg-gray-800 pb-1 pl-1 pr-1 pt-1 text-gray-300 transition-all duration-200
                          hover:bg-gray-700 hover:text-gray-900 focus:outline-none">
                        <span className="items-center justify-center flex">
                          <span className="items-center justify-center flex">
                            <span className="items-center justify-center text-gray-300 flex">
                              <span className="items-center justify-center h-full w-full flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem"   fill="currentColor"
                                    className="w-full h-full"><g><path
                                    d="M445.666,4.445c-4.504-4.858-11.756-5.954-17.211-2.19L12.694,290.14c-3.769,2.609-5.878,7.012-5.555,11.586 c0.323,4.574,3.041,8.635,7.139,10.686l95.208,47.607l37.042,86.43c1.78,4.156,5.593,7.082,10.064,7.727 c0.621,0.091,1.242,0.136,1.856,0.136c3.833,0,7.506-1.697,9.989-4.701l38.91-46.994l107.587,52.227 c1.786,0.867,3.725,1.306,5.663,1.306c1.836,0,3.674-0.393,5.384-1.171c3.521-1.604,6.138-4.694,7.146-8.432L448.37,18.128 C449.314,14.629,449.878,8.988,445.666,4.445z M343.154,92.883L116.681,334.604l-71.208-35.603L343.154,92.883z M162.003,416.703 l-27.206-63.48L359.23,113.665L197.278,374.771c-0.836,0.612-1.634,1.305-2.331,2.146L162.003,416.703z M312.148,424.651 l-88.604-43.014L400.427,96.462L312.148,424.651z"/></g></svg>
                              </span>
                            </span>
                          </span>
                        </span>
                      </p>
                    </div>
                    <div className="relative">
                      <p className="rounded-full bg-gray-800 pb-1 pl-1 pr-1 pt-1 text-gray-300 transition-all duration-200
                          hover:bg-gray-700 hover:text-gray-300 focus:outline-none">
                        <span className="items-center justify-center flex">
                          <span className="items-center justify-center flex">
                            <span className="h-6 w-6 items-center justify-center flex">
                              <span className="items-center justify-center h-full w-full flex">
                                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" 
                                    stroke="currentColor" stroke-width="2"><path stroke-linecap="round"
                                    stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002
                                    0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595
                                    1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                              </span>
                            </span>
                          </span>
                        </span>
                      </p>
                      <p className="items-center rounded-full bg-indigo-600 px-1.5 py-0.5 text-xs font-semibold text-white
                          absolute -right-1 -top-px inline-flex">2</p>
                    </div>
                    <div className="items-center justify-center relative flex">
                      <img src="https://static01.nyt.com/images/2019/11/08/world/08quebec/08quebec-superJumbo.jpg" 
                          className="object-cover mr-2 h-9 w-9 rounded-full bg-gray-300"/>
                      <p className="text-sm font-semibold">Marrie Currie</p>
                    </div>
                  </div>
                </div>
</div>*/}