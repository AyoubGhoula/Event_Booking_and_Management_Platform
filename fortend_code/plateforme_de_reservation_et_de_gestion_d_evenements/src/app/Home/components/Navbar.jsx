"use client";
import Link from 'next/link';
import { React, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import DropdownMenu from "./DropdownMenu";
import axios from 'axios';


const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safe to access localStorage
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const user = response.data;
          setRole(user.role); 
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    fetchUserRole();
  }, [token,]);
  const renderMenuItems = () => {
    switch (role) {
      case "participant":
        return (
          <>
            <Link href="/dashboard" className="py-2 px-3 lg:py-2 lg:px-3 border rounded-md hover:bg-neutral-700">Dashboard</Link>
            <Link href="/manage-users" className="py-2 px-3 lg:py-2 lg:px-3 border rounded-md hover:bg-neutral-700">Manage Users</Link>
            <Link href="/manage-events" className="py-2 px-3 lg:py-2 lg:px-3  border rounded-md hover:bg-neutral-700">Manage Events</Link>
            <div className="flex justify-center items-center h-full ">
              
            <DropdownMenu />
          </div>
          </>
        );
      case "organizer":
        return (
          <>
            <Link href="/Home" className="py-2 px-3 border rounded-md hover:bg-neutral-700">Home</Link>
            <Link href="/my-events" className="py-2 px-3 border rounded-md hover:bg-neutral-700">My Events</Link>
            <Link href="/events" className="py-2 px-3 border rounded-md hover:bg-neutral-700">Create Event</Link>
            <Link href="/participants-management" className="py-2 px-3 border rounded-md hover:bg-neutral-700">Participants Management</Link>
            <Link href="/event-feedback" className="py-2 px-3 border rounded-md hover:bg-neutral-700">Event Feedback</Link>
            <div className="flex justify-center items-center h-full ">
            <DropdownMenu />
          </div>
          </>
        );
      case "participant":
        return (
          // participate-
          <>
            <Link href="/Home" className="py-2 px-6 lg:py-2 lg:px-3 border rounded-md hover:bg-neutral-700">Home</Link>
            <Link href="/my-events" className="py-2 px-6 lg:py-2 lg:px-3 border rounded-md hover:bg-neutral-700">My Events</Link>
            <Link href="/event" className="py-2 px-4 lg:py-2 lg:px-3 border rounded-md hover:bg-neutral-700">Participate in Event</Link>
            <div className="flex justify-center items-center px-4 ">
            <DropdownMenu />
          </div>
          </>
        );
      default:
        return (
          <>
          {
            <>
            <Link href="/sign-in" className="py-2 px-3 border rounded-md hover:bg-neutral-700">Sign In</Link>
            <Link href="/sign-up" className="bg-gradient-to-r from-blue-500 to-blue-800 py-2 px-3 rounded-md">Create an account</Link>
          </>}
          </>
        );
    }
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container mx-auto relative lg:text-sm">
        <div className="flex px-7 justify-between items-center lg:px-2">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={""} alt="Logo" />
            <span className="text-xl tracking-tight">EventMaster</span>
          </div>
          
          <div className="hidden lg:flex justify-center space-x-5 items-center">
            {renderMenuItems()}
    
          
          </div>
          <div className="lg:hidden md:flex flex-col justify-end ml-1">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
           <div
          className="origin-top-right absolute right-0 mt-4  rounded-md shadow-lg bg-gray-900 ring-1 ring-divide-gray-100 ring-opacity-5 lg:hidden"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        > <div className="mb-0 xl:w-96">
              <div className="block px-4 py-2 flex w-full  justify-center flex-wrap items-center">
                {renderMenuItems()}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




























// "use client";
// import Link from 'next/link';
// import { React,useState } from "react";
// import { Menu, X } from "lucide-react";
// import DropdownMenu from "./DropdownMenu";
// import serche_page from "../../search/page";

// const Navbar = () => {
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

//   const toggleNavbar = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };
  
  
//   return (
//     <nav className="sticky top-0  z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
//       <div className="container  mx-auto relative lg:text-sm ">
//         <div className="flex  px-7 justify-between items-center lg:px-2">
//           <div className="flex items-center flex-shrink-0">
//             <img className="h-10 w-10 mr-2" src={""} alt="Logo" />
//             <span className="text-xl tracking-tight">EventMaster</span>
//           </div>
          
//           <div className="hidden lg:flex justify-center space-x-12 items-center">
//             <Link href="/Sign_in" className="py-2 px-3 border rounded-md hover:bg-neutral-700">Sign In</Link>
//             <Link 
//               href="/Sign_up"
//               className="bg-gradient-to-r from-blue-500 to-blue-800 py-2 px-3 rounded-md"
//             >
//               Create an account
//             </Link>
//           </div>
//           <div className="flex justify-center items-center h-full ">
//           <DropdownMenu />
//           </div>
//           <div className="lg:hidden md:flex flex-col justify-end ml-1">
//             <button onClick={toggleNavbar}>
//               {mobileDrawerOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//         {mobileDrawerOpen && (
//           <>
//           <div className="fixed  z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
          
//           {/* searche bar */}
//           <div className="mb-0 xl:w-96">
//           <div className="relative mb-0 flex w-full flex-wrap items-stretch">
//               <div className="flex space-x-6 mt-4">
//               <a href="" className="py-2 px-3 border rounded-md hover:bg-neutral-700">
//                 Sign In
//               </a>
//               <a
//                 href="#"
//                 className="py-2 px-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-800"
//               >
//                 Create an account
//               </a>
//             </div>
//           </div>
//           </div>
//           </div>
//           </>
//         )}
//       </div>
//     </nav>
    
//   );
// };

// export default Navbar;
