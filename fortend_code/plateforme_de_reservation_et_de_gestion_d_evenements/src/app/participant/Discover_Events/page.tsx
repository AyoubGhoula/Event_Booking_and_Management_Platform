"use client";
import React, { useState, useRef, useEffect } from'react';
import Navbar from "./components/Navbar";
import axios from 'axios';
import { motion,AnimatePresence,useAnimate } from "framer-motion";
import { Tooltip } from 'react-tooltip'

// interface Event {
//     id: number;
//     name: string;
//     start_datetime:string;
//     date:string;
//     time:string;
//     lient_event: string;
//     prix: number;
//     nm_max: number;
//     nm_participer: number;
//     gender: string;
//     type:string;
//   }
interface Event {
    id: number;
    name: string;
    date: string;
    description: string;
    type: string;
    location: string;
    image?: string; // Optional because some events might not have images
  }
  
const DiscoverEvents = () => {
   const events:Event[] = [
      {
         id:10,
        name: 'Tech Conference 2024',
        date: 'March 15, 2024',
        description: 'A conference showcasing the latest in tech innovation.',
        type: 'Conference',
        location: 'San Francisco, CA',
        image:'/image/278051.jpg'
      },
      {
        id:44,
       name: 'Tech Conference 2024',
       date: 'May 10, 2024',
       description: 'A conference showcasing the latest in tech innovation.',
       type: 'Conference',
       location: 'San Francisco, CA',
       image:'/image/278051.jpg'
     },
     {
        id:47,
       name: 'Tech Conference 2024',
       date: 'May 10, 2024',
       description: 'A conference showcasing the latest in tech innovation.',
       type: 'Conference',
       location: 'San Francisco, CA',
       image:'/image/278051.jpg'
     },
      {
         id:9,
        name: 'Music Festival 2024',
        date: 'April 22, 2024',
        description: 'Join us for an epic outdoor music festival.',
        type: 'Festival',
        location: 'Los Angeles, CA',
        image:'/image/25oct7.jpg',
      },
      {
         id:8,
        name: 'Art Exhibition',
        date: 'May 10, 2024',
        description: 'An exhibition of modern art and installations.',
        type: 'Exhibition',
        location: 'New York, NY',
        image:'/image/10e5ed3a4dc33fbd3b146437610a99b10c0.webp',
      },
      {
         id:7,
        name: 'Music Festival 2024',
        date: 'April 22, 2024',
        description: 'Join us for an epic outdoor music festival.',
        type: 'Festival',
        location: 'Los Angeles, CA',
      },
      {
         id:6,
        name: 'Music Festival 2024',
        date: 'April 22, 2024',
        description: 'Join us for an epic outdoor music festival.',
        type: 'Festival',
        location: 'Los Angeles, CA',
      },
      {
         id:5,
        name: 'Music Festival 2024',
        date: 'April 22, 2024',
        description: 'Join us for an epic outdoor music festival.',
        type: 'Festival',
        location: 'Los Angeles, CA',
      },
      {
         id:4,
        name: 'Music Festival 2024',
        date: 'April 22, 2024',
        description: 'Join us for an epic outdoor music festival.',
        type: 'Festival',
        location: 'Los Angeles, CA',
      },
      {
         id:3,
        name: 'Music Festival 2024',
        date: 'April 22, 2024',
        description: 'Join us for an epic outdoor music festival.',
        type: 'Festival',
        location: 'Los Angeles, CA',
      }
    ];
    const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");
  const [searchDate, setSearchDate] = useState<string>("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const [gradient, setGradient] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);

  
//   const [events, setEvents] =useState<Event[]>([]);
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setMobileDrawerOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//           document.removeEventListener('mousedown', handleClickOutside);
//         };
//       }, []);
//       useEffect(() => {
//         const fetchEvents = async () => {
//           try {
//             const response = await axios.get('http://localhost:8000/api/allevents');
//             const sortedEvents = response.data.sort((a: Event, b: Event) => b.id - a.id);
    
//             // Transform datetime
//             const eventsWithFormattedDate = sortedEvents.map((event: Event) => {
//               const [date, time] = event.start_datetime.split(' ');
//               return { ...event, date, time };
//             });
    
//             setEvents(eventsWithFormattedDate);
//             console.log(eventsWithFormattedDate)
//           } catch (error) {
//             console.error('Error fetching events:', error);
//           }
//         };
    
//         fetchEvents();
//       }, []);

const filteredEvents = events.filter((event) => {
    return (
      (searchTitle === "" ||
        event.name.toLowerCase().includes(searchTitle.toLowerCase())) &&
      (searchType === "" ||
        event.type.toLowerCase().includes(searchType.toLowerCase())) &&
      (searchDate === "" || event.date === searchDate)
    );
  });

  const groupedEvents: Record<string, Event[]> = filteredEvents.reduce(
    (acc, event) => {
      const date = event.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    },
    {} as Record<string, Event[]> 
  );
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
    }
    
      

  return (
    
    <div className=''>
      <div className="fixed top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(42,54,99,0.7),rgba(255,255,255,0))]"></div>
<div className="fixed top-0 bg-[#131517] h-screen w-screen -z-50"></div>
<div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#00000000_40%,#0099FF10_100%)]"></div>
            <Navbar/>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={toggleNavbar}>
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>
<div ref={dropdownRef}>
{mobileDrawerOpen && (

<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform " aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">

      <ul className="space-y-2 font-medium pt-12 mt-5">
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span className="ms-3">Dashboard</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
            </a>
         </li>
      </ul>
   </div>
   {/* <Profile/> */}
</aside>



)}
</div>
<motion.aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-50 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar"  
      onMouseLeave={() => setIsHovered(false)}  >
   <div className="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">

<ul className="space-y-4 font-medium pt-7 mt-8">
<li>
<button  aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-1 mt-2  text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setIsHovered(!isHovered)}>
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>
</li>
   <li>
      <motion.a href="#" className="flex items-center p-2  rounded-lg text-white bg-gray-700 group mb-7" data-tooltip-id="tooltip-1"
          data-tooltip-content="Discover Events" >
         <svg className="flex-shrink-0 w-5 h-5 transition duration-75 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
         </svg>
         {isHovered && <motion.span className="flex-1 ms-3 whitespace-nowrap" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>Discover Events</motion.span>}
          </motion.a>
   </li>
  
   <li>
      <motion.a href="/participant/Upcoming" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group mb-7" data-tooltip-id="tooltip-2"
          data-tooltip-content="Upcoming Events" >
      <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
                  <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z"/>
               </svg>
               {isHovered && <span className="flex-1 ms-3 whitespace-nowrap">Upcoming</span>}
               {/* <span className="flex-1 ms-3 whitespace-nowrap">Upcoming Events</span> */}
      </motion.a>
      
   </li>
    
   <li>
      <motion.a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group mb-7" data-tooltip-id="tooltip-3"
          data-tooltip-content="Past Events" whileHover={{ scale: 1.01 }}>
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
               <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
               <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
               <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
            </svg>
            {isHovered && <span className="flex-1 ms-3 whitespace-nowrap">Past Events</span>}
         {/* <span className="flex-1 ms-3 whitespace-nowrap">Past Events</span> */}
      </motion.a>
   </li>
   <li>
      <motion.a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"data-tooltip-id="tooltip-4"
          data-tooltip-content="Notifications" whileHover={{ scale: 1.01 }}>
         <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
         </svg>
         {isHovered && <span className="flex-1 ms-3 whitespace-nowrap">Notifications</span>}
         {/* <span className="flex-1 ms-3 whitespace-nowrap">Notifications</span> */}
          </motion.a>
   </li>
</ul>
<div className="absolute inset-x-0 bottom-0 h-8 border-t pb-10 mb-4 pt-3 border-gray-700">
      <motion.a   className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"data-tooltip-id="tooltip-5"
          data-tooltip-content="Profile" whileHover={{ scale: 1.01 }}>
      <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
         </svg>
         {isHovered && <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>}
         {/* <span className="flex-1 ms-3 whitespace-nowrap">Profile</span> */}
      </motion.a>
   </div>
</div>
{!isHovered && <div><Tooltip id="tooltip-1" place="right"/>
  <Tooltip id="tooltip-2" place="right" animation="duration-300" />
  <Tooltip id="tooltip-3" place="right" animation="duration-300" />
  <Tooltip id="tooltip-4" place="right" animation="duration-300" />
  <Tooltip id="tooltip-5" place="right" animation="duration-300" /></div> }
</motion.aside>
<div className="p-4 sm:ml-20">
   <div className="p-4  rounded-lg ">
   <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <div className="mx-auto mt-6 w-full px-6 lg:mx-0 lg:max-w-none max-w-3xl">
              <div className="mb-6 items-end justify-between text-white flex">
                <div>
                  <p className="text-xl font-medium lg:text-2xl">Dark dashboard with 3-column sections</p>
                  <p className="text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>
      </div>
    <div className="flex flex-col items-center"> 
      {/* Search Fields */}
      <div className="relative  w-full h-full overflow-x-auto shadow-md sm:rounded-lg ">
        <div className="flex mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-1 items-center justify-center p-6">
        <div className="grid gap-6 md:grid-cols-3">
        <input
          type="text"
          placeholder="Type query"
         value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className=" mx-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Search by type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="mx-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className=" mx-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        
        </div>
        </div>
        </div>
        </div>

    {/* Events List */}
    <div className="space-y-8">
    {Object.entries(groupedEvents).map(([date, events]) => (
          <div key={date} className="space-y-4">
            {/* Date Header */}
            <div className="text-2xl font-semibold">{date}</div>

    <motion.div  >
  <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-6 ">
    {events.length > 0 ? (
        events.map((event) => {
        // Extract colors from the event image
        const image = event.image || '';
        

        return (
          <motion.a
            key={event.id}
            whileHover={{ scale: 1.01 }}
            className="flex flex-row justify-between rounded-2xl bg-[#131517] bg-background/80 backdrop-blur-lg p-2 transition-all duration-100 border border-[#131517] border-opacity-0 hover:border-opacity-10 supports-[backdrop-filter]:bg-background/60 dark:border-opacity-10 dark:border-white dark:hover:border-white dark:hover:border-opacity-20 cursor-pointer hover:shadow-[0_0_10px_0_rgba(0,0,0,0.05)]"
            onClick={() => setSelectedId(event.id)}
          >
            {/* Event Image */}
            <div className="relative  w-2/5 shrink-0 overflow-hidden rounded-xl  bg-gray-800 bg-clip-border text-gray-200">
              <motion.img
                layoutId={`image-${event.id}`}
                src={event.image}
                alt={event.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="flex flex-col items-start content-start justify-between gap-2 p-6">
<h4 className="text-base font-medium scroll-m-20 text-muted-foreground text-cyan-50">
8:30
</h4>
<h2 className="font-semibold tracking-tight text-cyan-50 md:text-lg scroll-m-20 md:font-medium first-letter:uppercase">
{event.name}
</h2>
<div className="flex flex-row gap-2 opacity-50">
<button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r3:" data-state="closed" className="flex items-center gap-1 group">
<div className="flex flex-row items-center gap-2 text-sm font-medium capitalize transition-opacity group-hover:opacity-100 opacity-60">
<span className="w-5 h-5 overflow-hidden rounded-full shadow-sm">
<span className="flex items-center justify-center w-5 h-5 text-xs capitalize border rounded-md bg-slate-400/50">
P

</span>
</span>
{event.type}
</div>
</button>
</div>
<div className="flex flex-row items-center gap-1 opacity-50 ">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pin w-4 h-4 text-muted-foreground">
<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z">
</path>
<circle cx="12" cy="10" r="3">
</circle></svg>
<div className="text-sm font-normal text-muted-foreground first-letter:uppercase">
{event.description}
</div>
</div>
<div className="flex flex-row flex-wrap gap-1 max-w-fit">
<div className="items-center px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent font-medium border border-opacity-20 shadow-none rounded-full overflow-hidden text-nowrap text-ellipsis max-w-[25vw] bg-green-500/20 hover:bg-green-500/20 text-green-500 flex-row flex">
100  
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-right w-5 h-3 px-1">
<path d="M5 12h14">
</path>
<path d="m12 5 7 7-7 7">
</path>
</svg>
200 TND
</div>
<div className="items-center px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent font-medium border border-opacity-20 shadow-none rounded-full overflow-hidden text-nowrap text-ellipsis block max-w-[25vw] bg-teal-500/20 hover:bg-teal-500/20 text-teal-500">
⚡Réservation instantanée
</div>
</div>
</div>
          </motion.a>
        );
      })
    ) : (
      <p>No events found</p>
    )}
  </motion.div>
</motion.div>
</div>
))}
</div>

<AnimatePresence>
  {events.length > 0 && selectedId && (
    <motion.div
      key={selectedId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {/* Popup Container */}
      <div className="relative w-full max-w-7xl  h-[calc(82vh)] ms:max-w-xl flex  bg-gray-800 bg-opacity-55  backdrop-blur-lg  flex-row rounded-xl border border-gray-700">
        {/* Image Section with Navigation */}
        <div className="relative w-4/5  p-0.5 rounded-xl">
          

          {/* Event Image */}
          <img
            ref={imageRef}
            src={events.find((event) => event.id === selectedId).image}
            alt="Event"
            loading="lazy"

            className="object-cover w-full h-[calc(81vh)]  rounded-l-xl" //h-[calc(80vh)]
          />

          
          
        </div>

        {/* Event Details Section */}
        <div className="w-5/6 p-6 flex flex-col h-[calc(82vh)]  overflow-y-auto rounded-r-xl [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-gray-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setSelectedId(null)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Event Details */}
          
          <motion.h1
            layoutId={`title-${selectedId}`}
            className="text-6xl ms:text-4xl mt-3 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            {events.find((event) => event.id === selectedId).name || 'Not available'}
          </motion.h1>
          <motion.h5
            layoutId={`type-${selectedId}`}
            className="text-2xl ms:text-xl text-pink-500 mt-4 ml-2 uppercase"
          >
            {events.find((event) => event.id === selectedId).type || 'Not available'}
          </motion.h5>
          {/* <motion.p
            layoutId={`description-${selectedId}`}
            className="text-gray-700 mt-4 flex-grow"
          >
            {events.find((event) => event.id === selectedId).description || 'Not available' }
          </motion.p> */}
          <div className="flex flex-row mt-2 items-center gap-2 text-sm font-medium capitalize transition-opacity group-hover:opacity-100 opacity-60">
            <span className="w-5 h-5 overflow-hidden rounded-full shadow-sm">
            <img className="aspect-square h-full w-full" alt="[object Object]" src="https://api.tunis.events/storage/0163e32f549766f9ab79102387ae1997f.png"/>
            </span>
            Studio-فن
          </div>

            {/* date */}
          <div className="flex flex-row p-2 mt-4  rounded-xl ">
              <div className="flex items-center w-14 ">
                <div className="flex flex-col w-10 h-10 overflow-hidden border rounded-lg border-primary/10 ">
                  <div className="border-b border-primary/10 bg-primary/20 bg-slate-600 h-5 text-[10px] font-semibold uppercase flex items-center w-full justify-center">
                    nove
                </div>
                <div className="flex items-center justify-center w-full h-8 font-semibold">
                  24
                </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <div className="flex items-center w-full h-6 font-medium capitalize ">
                    dimanche 24 novembre
                    
                  </div>
                  <div className="flex flex-row items-center gap-1 text-sm text-muted-foreground dark:text-accent-foreground/50">
                    14:00
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide  lucide-arrow-right w-3 h-3">
                    <path d="M5 12h14"></path><path d="m12 5 7 7-7 7">
                    </path>
                    </svg> 16:00
                  </div>
                </div>
              </div>
            </div>

          {/* location */}
          <div className="flex flex-col p-2 mt-1 rounded-xl">
            <a className="flex flex-row" target="_blank" href="https://www.google.com/maps/dir/?api=1&amp;destination=5 Av. Taieb Mhiri, Marsa 2070, Tunisie">
              <div className="flex items-center w-14">
                <div className="flex items-center justify-center w-10 h-10 overflow-hidden capitalize border rounded-lg opacity-100 border-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide text-white lucide-map-pin opacity-80">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z">
                  </path>
                  < circle cx="12" cy="10" r="3">
                  </circle>
                  </svg>
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <div className="flex items-start w-full h-6 max-w-[70vw] overflow-hidden font-medium capitalize truncate sm:max-w-none whitespace-nowrap">
                    Studio FAN 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-right h-4 opacity-50">
                    <path d="M7 7h10v10">
                    </path>
                    <path d="M7 17 17 7">
                    </path>
                    </svg>
                  </div>
                  <p className="max-w-[70vw] text-sm capitalize truncate sm:max-w-none text-muted-foreground dark:text-accent-foreground/50 overflow-ellipsis">
                    5 Av. Taieb Mhiri, Marsa 2070, Tunisie 
                  </p>
                </div>
              </div>
            </a>
          </div>

            {/* reservation */}
                <div className="w-full p-2 pt-1 mt-8 space-y-2 border border-gray-700 rounded-xl bg-black bg-opacity-20 ">
                <h1 className="mt-1 ml-1 font-semibold tracking-tight ">
                Obtenir l'accès
                </h1>
                <div role="alert" className="relative w-full rounded-lg px-4 py-3 text-sm [&amp;>svg+div]:translate-y-[-3px] [&amp;>svg]:absolute [&amp;>svg]:left-4 [&amp;>svg]:top-4 [&amp;>svg~*]:pl-7 border border-spacing-0.5  bg-black bg-opacity-30  text-foreground [&amp;>svg]:text-foreground z-10 flex flex-col gap-2  bg-background/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ticket w-4 h-4">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z">
                </path>
                <path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2">
                </path>
                </svg>
                <div className="flex flex-row items-center justify-between align-middle"><h5 className="mb-1 font-medium tracking-tight text-lg">Eggs and Records | 24-11-24</h5><h5 className="mb-1 tracking-tight text-lg font-semibold">
                40
                <sup>
                TND
                </sup>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-qr-code inline-block w-6 h-6 ml-3 ">
                <rect width="5" height="5" x="3" y="3" rx="1">
                </rect>
                <rect width="5" height="5" x="16" y="3" rx="1">
                </rect>
                <rect width="5" height="5" x="3" y="16" rx="1">
                </rect>
                <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path>
                <path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 12h.01"></path>
                <path d="M12 3h.01"></path><path d="M12 16v.01"></path>
                <path d="M16 12h1"></path><path d="M21 12v.01"></path><path d="M12 21v-1">
                  </path>
                  </svg>
                  </h5>
                  </div>
                <div className="text-sm [&amp;_p]:leading-relaxed z-10 flex">
                  <div className="mr-6 text-sm opacity-75 grow text-muted-foreground">
                Sessions from 2 PM to 4 PM at 40 DT per person.
                </div>
                <div className="flex items-center justify-between w-32 ">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border-red-500 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9" data-umami-event="➖ :  Eggs and Records | 24-11-24">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-minus w-4 h-4 text-red-500  " data-umami-event="➖ :  Eggs and Records | 24-11-24">
                <path d="M5 12h14">
                </path>
                </svg>
                </button>
                <span className="mx-4 text-xl text-muted-foreground">0</span>
                <button className="inline-flex items-center justify-center border-green-600 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9" data-umami-event="➕ :  Eggs and Records | 24-11-24">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus w-4 h-4 text-green-400" data-umami-event="➕ :  Eggs and Records | 24-11-24">
                <path d="M5 12h14">
                </path>
                <path d="M12 5v14">
                </path>
                </svg>
                </button>
                </div>
                </div>
                </div>
                </div>
          

{/* discription */}
<div className="w-full p-2 pt-1 space-y-2 border-t mt-7 border-gray-700 mb-4 font-semibold text-gray-300 ">
          <div className="space-y-2 max-w-full my-2">
            <div className="text-justify novel-editor-readonly">
              <div className="w-full max-w-screen-lg rounded-lg min-h-24">
                <div className="relative w-full max-w-screen-lg sm:rounded-lg read-only">
                  <div>
                    <div  translate="no" className="tiptap ProseMirror prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full h-full">
                      <p>Join us for a warm Sunday brunch for Eggs and Records with Farès A. and Melkart for a listening session and a ceramic workshop.</p>
                      <p><br className="ProseMirror-trailingBreak"/></p><p>Ceramic Workshop: Sessions from 2 PM to 4 PM at 40&nbsp;DT&nbsp;per&nbsp;person.</p>
                      <p>Join us for a warm Sunday brunch for Eggs and Records with Farès A. and Melkart for a listening session and a ceramic workshop.</p>
                      <p><br className="ProseMirror-trailingBreak"/></p><p>Ceramic Workshop: Sessions from 2 PM to 4 PM at 40&nbsp;DT&nbsp;per&nbsp;person.</p>
                      <p>Join us for a warm Sunday brunch for Eggs and Records with Farès A. and Melkart for a listening session and a ceramic workshop.</p>
                      <p><br className="ProseMirror-trailingBreak"/></p><p>Ceramic Workshop: Sessions from 2 PM to 4 PM at 40&nbsp;DT&nbsp;per&nbsp;person.</p>
                      <p>Join us for a warm Sunday brunch for Eggs and Records with Farès A. and Melkart for a listening session and a ceramic workshop.</p>
                      <p><br className="ProseMirror-trailingBreak"/></p><p>Ceramic Workshop: Sessions from 2 PM to 4 PM at 40&nbsp;DT&nbsp;per&nbsp;person.</p>
                    
                    </div>
                    <div draggable="true" data-drag-handle="" className="drag-handle hide">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          {/* Bottom Action Buttons */}
          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              onClick={() => setSelectedId(null)}
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


      </div> 
    </div>
    </div>

    </div>
  );
};

export default DiscoverEvents;
