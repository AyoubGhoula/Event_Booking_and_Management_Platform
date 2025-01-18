"use client";
import React, { useState, useRef, useEffect, use } from'react';
import Navbar from "../components/Navbar";
import axios from 'axios';
import { motion,AnimatePresence,useAnimate } from "framer-motion";
import { Tooltip } from 'react-tooltip'

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  type: string;
  location: string;
  image?: string; // Optional because some events might not have images
}
interface Notification {
    id: number;
    type: string;
    envoye_le: string;
    contenu: string;
    name_evenement: string;
  }
const UpcomingEvents = () => {
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
  // const notifications: Notification[] = [
  //   {
  //     id: 1,
  //     dateEnvoi: '2024-12-01 10:00:00',
  //     type: 'Event Update',
  //     contenu: 'The schedule for the Tech Conference 2024 has been updated. New session times and speakers have been added. Please review the updated agenda to make sure you are attending the sessions that interest you most.',
  //     id_event: 10,
  //     event_name: 'Tech Conference 2024',
  //   },
  //   {
  //     id: 2,
  //     dateEnvoi: '2024-12-03 15:30:00',
  //     type: 'New Speaker Added',
  //     contenu: 'We are excited to announce a new keynote speaker for the Music Festival 2024. Dr. Jane Smith, a renowned musicologist, will discuss the future of music festivals and the role of technology in live performances. Don\'t miss her talk on April 22, 2024.',
  //     id_event: 9,
  //     event_name: 'Music Festival 2024',
  //   },
  //   {
  //     id: 3,
  //     dateEnvoi: '2024-12-04 11:45:00',
  //     type: 'Event Cancellation',
  //     contenu: 'We regret to inform you that the Art Exhibition scheduled for May 10, 2024, has been canceled due to unforeseen circumstances. We apologize for any inconvenience this may cause and are working on rescheduling the event for later in the year.',
  //     id_event: 8,
  //     event_name: 'Art Exhibition',
  //   },
  //   {
  //     id: 4,
  //     dateEnvoi: '2024-12-05 09:00:00',
  //     type: 'Event Reminder',
  //     contenu: 'Just a friendly reminder that the Tech Conference 2024 will start in two weeks. Please make sure you have your tickets and know the session times. Also, the venue has been updated, so please check the new location information on your ticket.',
  //     id_event: 10,
  //   event_name: 'Tech Conference 2024',
  //   },
  //   {
  //     id: 5,
  //     dateEnvoi: '2024-12-06 16:00:00',
  //     type: 'Special Offer',
  //     contenu: 'As a valued participant of the Music Festival 2024, we are offering a 20% discount on VIP tickets for the next 48 hours. Take advantage of this special offer and get access to exclusive backstage content and a meet-and-greet with the artists!',
  //     id_event: 9,
  //     event_name: 'Music Festival 2024',
  //   },
  //   {
  //     id: 6,
  //     dateEnvoi: '2024-12-07 12:30:00',
  //     type: 'New Update',
  //     contenu: 'The Art Exhibition has been rescheduled to June 15, 2024. We are thrilled to bring you new exhibits, and we will provide more details soon. We appreciate your understanding and hope to see you there!',
  //     id_event: 8,
  //     event_name: 'Art Exhibition',
  //   },
  // ];
  const [searchTitle, setSearchTitle] = useState<string>("");
const [searchType, setSearchType] = useState<string>("");
const [searchDate, setSearchDate] = useState<string>("");
const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
const [isHovered, setIsHovered] = useState(false);
const [selectedId, setSelectedId] = useState<number | null>(null);
const dropdownRef = useRef<HTMLDivElement>(null);
const [loaded, setLoaded] = useState(false);

const [gradient, setGradient] = useState("");
const imageRef = useRef<HTMLImageElement>(null);


const [showProfileModal, setShowProfileModal] = useState(false);
const [userDetails, setUserDetails] = useState({
    name: '',
    first_name: '',
    email: '',
    phone: '',
    // Add other user details as needed
  });

const fetchUserDetails = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setUserDetails(response.data);
  } catch (error) {
    console.error('Failed to fetch user details:', error);
  }
};

const handleUpdateUser = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.put('http://localhost:8000/api/user', userDetails, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.message) {
      showNotification('success', response.data.message);
      setShowProfileModal(false);
    }
  } catch (error) {
    console.error('Failed to update user:', error);
    showNotification('error', 'Failed to update user details');
  }
};

const handleLogout = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No token found');
    }

    await axios.post('http://localhost:8000/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    localStorage.removeItem('access_token');
    window.location.href = '/';
  } catch (error) {
    console.error('Failed to logout:', error);
    showNotification('error', 'Failed to logout');
  }
};
const [formCount, setFormCount] = useState(1);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
 
const showNotification = (type: 'success' | 'error', message: string) => {
  setNotification({ type, message });
  setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
};

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
  
const [notifications, setNotifications] = useState<Notification[]>([]);
    
useEffect(() => {
  const fetchNotifications = async () => {
      try {
          const token = localStorage.getItem('access_token');
          if (!token) {
              throw new Error('No token found');
          }

          const response = await axios.get('http://localhost:8000/api/getNotifications', {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });

          const notifications: Notification[] = response.data;
          setNotifications(notifications); 
          
      } catch (error) {
          console.error('Failed to fetch notifications:', error);
          if (axios.isAxiosError(error) && error.response?.status === 401) {
              console.log('Unauthorized: Please log in again');
          }
      }
  };

  fetchNotifications();
}, []); 

return (
    <div className="">
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
<div className='fixed top-18 right-2 z-50 '>
            {/* Notification */}
{notification && (
                <div
                    className={`${
                        notification.type === 'success' ? 'bg-teal-100 border-teal-500 text-teal-900' : 'bg-red-100 border-red-500 text-red-900'
                    } border-t-4 rounded-b px-4 py-3 shadow-md`}
                    role="alert"
                >
                    <div className="flex">
                        <div className="py-1">
                            <svg
                                className={`fill-current h-6 w-6 ${
                                    notification.type === 'success' ? 'text-teal-500' : 'text-red-500'
                                } mr-4`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold">{notification.type === 'success' ? 'Success' : 'Error'}</p>
                            <p className="text-sm">{notification.message}</p>
                        </div>
                    </div>
                </div>
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
      <motion.a href="/participant/Discover_Events" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group mb-7" data-tooltip-id="tooltip-1"
          data-tooltip-content="Discover Events" >
         <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
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
      <motion.a href="/participant/Past_Events" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group " data-tooltip-id="tooltip-3"
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
      <motion.a href="#" className="flex items-center p-2  rounded-lg text-white bg-gray-700 group mt-7"data-tooltip-id="tooltip-4"
          data-tooltip-content="Notifications" whileHover={{ scale: 1.01 }}>
         <svg className="flex-shrink-0 w-5 h-5 transition duration-75 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
         </svg>
         {isHovered && <span className="flex-1 ms-3 whitespace-nowrap">Notifications</span>}
         {/* <span className="flex-1 ms-3 whitespace-nowrap">Notifications</span> */}
          </motion.a>
   </li>
</ul>
<div className="absolute  bottom-0 h-8 border-t pb-10 mb-4 pt-3 border-gray-700">
      <motion.a   className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"data-tooltip-id="tooltip-5"
          data-tooltip-content="Profile" whileHover={{ scale: 1.01 }} onClick={() => {
            fetchUserDetails();
            setShowProfileModal(true);
          }}>
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
   <div className="flex items-center justify-center h-48 mb-4 rounded">
            <div className="mx-auto mt-6 w-full px-6 lg:mx-0 lg:max-w-none max-w-3xl">
              <div className="mb-6 items-end justify-between text-white flex">
                <div>
                  <h1 className="text-9xl p-2 ms:text-2xl font-bold bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">Notifications</h1>
                  <p className="text-gray-400 mt-7 pl-10 text-2xl ">Stay Updated with Notifications</p>
                </div>
              </div>
            </div>
      </div>
    <div className="flex flex-col items-center mt-14"> 
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-6 ">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex flex-row justify-between rounded-2xl bg-gray-800 bg-background/80 backdrop-blur-lg p-2 transition-all duration-100 border border-[#131517] border-opacity-0 hover:border-opacity-10 supports-[backdrop-filter]:bg-background/60 dark:border-opacity-10 dark:border-white dark:hover:border-white dark:hover:border-opacity-20 hover:shadow-[0_0_10px_0_rgba(0,0,0,0.05)]"
          >

            <div className="relative p-4 w-full max-w-2xl max-h-full">

            <div className="relative  rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 cursor-pointer dark:text-white " >
                {notification.name_evenement}
                </h3>
                <h3 className="text-xl font-semibold text-gray-900 cursor-pointer dark:text-white " >
                    {notification.envoye_le}
                </h3>
            </div>
            <div className="p-4 md:p-5 space-y-4">
                <h3 className="text-base leading-relaxed text-gray-100 ">
                    {notification.type}
                </h3>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                   {notification.contenu}
                </p>
            </div>

            
          </div>
          </div>
          </div>
        ))}
      </div>



      </div> 
    </div>
    </div>
 
    <AnimatePresence>
  {showProfileModal && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-md relative bg-gray-800 bg-opacity-55 backdrop-blur-lg  border border-gray-700  ">
      <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => {
            fetchUserDetails();
            setShowProfileModal(false);
          }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-500"> First Name</label>
          <input
            type="text"
            value={userDetails.first_name}
            onChange={(e) => setUserDetails({ ...userDetails, first_name: e.target.value })}
            className="w-full p-2 border bg-gray-800 bg-opacity-70 border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500">Name</label>
          <input
            type="text"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            className="w-full p-2 border bg-gray-800 bg-opacity-70 border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500">Email</label>
          <input
            type="email"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            className="w-full p-2 border bg-gray-800 bg-opacity-70 border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500">Phone</label>
          <input
            type="text"
            value={userDetails.phone}
            onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
            className="w-full p-2 border bg-gray-800 bg-opacity-70 border-gray-600 rounded"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleUpdateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default UpcomingEvents;
