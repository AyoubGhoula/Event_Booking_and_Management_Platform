"use client";
import React, { useState, useRef, useEffect } from'react';
import Navbar from "../components/Navbar";
import axios from 'axios';
import { motion,AnimatePresence,useAnimate } from "framer-motion";
import { Tooltip } from 'react-tooltip';
import jsPDF from 'jspdf';

interface Event {
  id: number;
  title: string;
  type: string;
  description: string;
  start_date: string;
  end_date: string;
  lieu: string;
  map_link: string;
  max_participants: number;
  current_participants: number;
  organizer: {
    name: string;
    first_name: string;
    email: string;
    avatar: string;
    nom_organisation: string;
    site_web_organisation: string;
  };
  prix: number;
  image: string;
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
const [allEvents, setAllEvents] = useState<Event[]>([]); // Stores all events fetched from the backend
const [groupedEvents, setGroupedEvents] = useState<Record<string, Event[]>>({}); // Stores grouped events after filtering

useEffect(() => {
    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get('http://localhost:8000/api/participant/upcoming-reservations', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const events: Event[] = response.data.data;
            setAllEvents(events); // Save all events for local filtering
            groupAndSetEvents(events); // Initially group all events
        } catch (error) {
            console.error('Failed to fetch events:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                console.log('Unauthorized: Please log in again');
            }
        }
    };

    fetchEvents();
}, []); // Fetch only once when the component mounts
useEffect(() => {
  const filteredEvents = allEvents.filter((event) => {
      return (
          (searchTitle === "" || event.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
          (searchType === "" || event.type.toLowerCase().includes(searchType.toLowerCase())) &&
          (searchDate === "" || 
              new Date(event.start_date).toDateString() === new Date(searchDate).toDateString())
      );
  });

  groupAndSetEvents(filteredEvents);
}, [searchTitle, searchType, searchDate]); // Re-run filtering whenever a filter changes

const groupAndSetEvents = (events: Event[]) => {
  const grouped = events.reduce((acc, event) => {
      const date = new Date(event.start_date).toDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(event);
      return acc;
  }, {} as Record<string, Event[]>);

  setGroupedEvents(grouped);
};
const toggleNavbar = () => {
  setMobileDrawerOpen(!mobileDrawerOpen);
  }
  
  const [reservations, setReservations] = useState([]);

    const fetchReservations = async (eventId: number) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`http://localhost:8000/api/event/${eventId}/my-reservations`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const fetchedReservations = response.data.data.reservations.map((reservation: any) => ({
                full_name: reservation.full_name,
                email: reservation.email,
                phone: reservation.phone,
                reserved_at: reservation.reserved_at,
                code: reservation.code,
            }));

            setReservations(fetchedReservations);
        } catch (error) {
            console.error('Failed to fetch reservations:', error);
        }
    };

    const setSelectedIdfunction = (eventId: number) => {
        setSelectedId(eventId);
        fetchReservations(eventId);
    };

    const generatePDF = async (reservation:any, eventId: number) => {
      try {
      const event= allEvents.find(event => event.id === eventId);
      const doc = new jsPDF();

        // Add a header
        doc.setFontSize(18);
        doc.setTextColor(40, 40, 40);
        doc.text('Event Ticket', 105, 20, { align: 'center' });

         // Draw a horizontal line
         doc.setDrawColor(200, 200, 200);
         doc.line(10, 35, 200, 35);
      
     // Add event details
     doc.setFontSize(14);
     doc.setTextColor(60, 60, 60);
     doc.text('Event Details', 14, 45);
     doc.setFontSize(12);
     doc.text(`Event Name: ${event?.title || 'N/A'}`, 14, 55);
     doc.text(`Start Date: ${new Date(event.start_date).toLocaleString() || 'N/A'}`, 14, 65);
     doc.text(`End Date: ${new Date(event.end_date).toLocaleString() || 'N/A'}`, 14, 75);
     doc.text(`Location: ${event?.lieu || 'N/A'}`, 14, 85);
      // Add reservation details
      doc.setFontSize(14);
      doc.text('Reservation Details', 14, 95);
      doc.setFontSize(12);
      doc.text(`Name: ${reservation.full_name || 'N/A'}`, 14, 105);
      doc.text(`Email: ${reservation.email || 'N/A'}`, 14, 115);
      doc.text(`Phone: ${reservation.phone || 'N/A'}`, 14, 125);
      doc.text(`Code: ${reservation.code || 'N/A'}`, 14, 135);
      doc.text(`Reserved At: ${reservation.reserved_at || 'N/A'}`, 14, 145);

     
      // Add a footer
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('Thank you for reserving with us!', 105, 285, { align: 'center' });

      // Save the PDF
      doc.save(`Ticket_${event.title}_${reservation.full_name}.pdf`);
  } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Error generating the ticket. Please try again.');
  }

    }
    const deleteReservation = async (codeUnique: string) => {
      try {
          const token = localStorage.getItem('access_token');
          if (!token) {
              throw new Error('No token found');
          }
  
          // Send a DELETE request to the backend
          const response = await axios.post(
              `http://localhost:8000/api/cancelReservation`,
              { code_unique: codeUnique },
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
  
          // Filter out the deleted reservation from the state
          setReservations((prevReservations) =>
              prevReservations.filter((reservation) => reservation.code !== codeUnique)
          );
  
          alert(response.data.message || 'Reservation cancelled successfully');
      } catch (error: any) {
          console.error('Failed to delete reservation:', error.response?.data || error.message);
          alert(error.response?.data?.message || 'Failed to cancel reservation');
      }
  };
    

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
<div ref={dropdownRef}>
{mobileDrawerOpen && (
<motion.aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-50 h-screen transition-transform " aria-label="Sidebar"  
      onMouseLeave={() => setIsHovered(false)}  >
   <div className="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">

<ul className="space-y-4 font-medium pt-7 mt-8">
<li>
<button  aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-1 mt-2  text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={toggleNavbar}>
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>
</li>
   <li>
      <motion.a href="/participant/Discover_Events" className="flex items-center p-2  rounded-lg text-white bg-gray-700 group mb-7" data-tooltip-id="tooltip-1"
          data-tooltip-content="Discover Events" >
         <svg className="flex-shrink-0 w-5 h-5 transition duration-75 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
         </svg>
         <motion.span className="flex-1 ms-3 whitespace-nowrap" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>Discover Events</motion.span>
          </motion.a>
   </li>
  
   <li>
      <motion.a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group mb-7" data-tooltip-id="tooltip-2"
          data-tooltip-content="Upcoming Events" >
      <svg className="flex-shrink-0 w-5 h-5 transition duration-75 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
                  <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z"/>
               </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Upcoming</span>
               {/* <span className="flex-1 ms-3 whitespace-nowrap">Upcoming Events</span> */}
      </motion.a>
      
   </li>
    
   <li>
      <motion.a href="/participant/Past_Events" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group mb-7" data-tooltip-id="tooltip-3"
          data-tooltip-content="Past Events" whileHover={{ scale: 1.01 }}>
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
               <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
               <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
               <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Past Events</span>
         {/* <span className="flex-1 ms-3 whitespace-nowrap">Past Events</span> */}
      </motion.a>
   </li>
   <li>
      <motion.a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"data-tooltip-id="tooltip-4"
          data-tooltip-content="Notifications" whileHover={{ scale: 1.01 }}>
         <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
         </svg>
         <span className="flex-1 ms-3 whitespace-nowrap">Notifications</span>
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
        <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
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
      <motion.a href="#" className="flex items-center p-2  rounded-lg text-white bg-gray-700 group mb-7" data-tooltip-id="tooltip-2"
          data-tooltip-content="Upcoming Events" >
      <svg className="flex-shrink-0 w-5 h-5 transition duration-75 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
                  <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z"/>
               </svg>
               {isHovered && <span className="flex-1 ms-3 whitespace-nowrap">Upcoming</span>}
               {/* <span className="flex-1 ms-3 whitespace-nowrap">Upcoming Events</span> */}
      </motion.a>
      
   </li>
    
   <li>
      <motion.a href="/participant/Past_Events" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group mb-7" data-tooltip-id="tooltip-3"
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
      <motion.a href="/participant/Notifications" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"data-tooltip-id="tooltip-4"
          data-tooltip-content="Notifications" whileHover={{ scale: 1.01 }}>
         <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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
                  <h1 className="text-8xl p-2 ms:text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Upcoming Events</h1>
                  <p className="text-gray-400 mt-7  text-2xl pl-10 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Don’t Miss These Upcoming Highlights !!</p>
                </div>
              </div>
            </div>
      </div>
      <div className="flex flex-col items-center"> 
      {/* Search Fields */}
      <div className="relative  w-full h-full overflow-x-auto shadow-md sm:rounded-lg mb-14 mt-10 ">
        <div className="flex mb-4 rounded  ">
            <div className="flex flex-1 items-center justify-center p-2">
        <div className="grid gap-12 md:grid-cols-3 ">
        <input
          type="text"
          placeholder="Type query"
         value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className=" mx-3 bg-transparent border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Search by type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className=" mx-3 bg-transparent border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className=" mx-3 bg-transparent border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        </div>
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
      <motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4 px-14">
          {events.length > 0 ? (
            events.map((event) => (
              <motion.a
                key={event.id}
                whileHover={{ scale: 1.01 }}
                className="flex flex-row justify-between rounded-2xl bg-[#131517] bg-background/80 backdrop-blur-lg p-2 transition-all duration-100 border border-[#131517] border-opacity-0 hover:border-opacity-10 supports-[backdrop-filter]:bg-background/60 dark:border-opacity-10 dark:border-white dark:hover:border-white dark:hover:border-opacity-20 cursor-pointer hover:shadow-[0_0_10px_0_rgba(0,0,0,0.05)]"
                onClick={() => setSelectedIdfunction(event.id)}
              >
                <div className="relative w-2/5 shrink-0 overflow-hidden rounded-xl bg-gray-800 bg-clip-border text-gray-200">
                  <motion.img
                    layoutId={`image-${event.id}`}
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start content-start justify-between gap-2 p-6 ">
                  <h4 className="text-base font-medium scroll-m-20 text-muted-foreground text-cyan-50">
                    {new Date(event.start_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </h4>
                  <h5 className=" text-cyan-50 opacity-5">_______________________________________</h5>
                  <h2 className="font-semibold tracking-tight text-cyan-50 md:text-lg scroll-m-20 md:font-medium first-letter:uppercase">
                    {event.title}
                  </h2>
                  <div className="flex flex-row gap-2 opacity-50">
                    <button type="button" className="flex items-center gap-1 group">
                      <div className="flex flex-row items-center gap-2 text-sm font-medium capitalize transition-opacity group-hover:opacity-100 opacity-60">
                      <div className="flex flex-row mt-2 items-center gap-2 text-sm font-medium capitalize transition-opacity group-hover:opacity-100 opacity-60">
                      <span className="w-5 h-5 overflow-hidden rounded-full shadow-sm">
                      <img className="aspect-square h-full w-full" alt="Organizer Logo" src={event.organizer.avatar} />
                        </span>
                        </div>
                        <a href={event.organizer.site_web_organisation}>
                        {`${event.organizer.nom_organisation}`}
                        </a>
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-row items-center gap-1 opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4 text-muted-foreground">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div className="text-sm font-normal text-muted-foreground first-letter:uppercase">
                      {event.lieu}

                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap gap-1 max-w-fit">
                    <motion.div className="items-center px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent font-medium border border-opacity-20 shadow-none rounded-full overflow-hidden text-nowrap text-ellipsis block max-w-[25vw] bg-teal-500/20 hover:bg-teal-500/20 text-teal-500">
                      {`${event.type}`}
                    </motion.div>
                    <div className="items-center px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent font-medium border border-opacity-20 shadow-none rounded-full overflow-hidden text-nowrap text-ellipsis max-w-[25vw] bg-green-500/20 hover:bg-green-500/20 text-green-500 flex-row flex">
                      {`${event.prix} TND`}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))
          ) : (
            <p>No events found</p>
          )}
        </motion.div>
      </motion.div>
    </div>
  ))}
</div>

<AnimatePresence>
  {allEvents.length > 0 && selectedId && (
    <motion.div
      key={selectedId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      
      <div className="relative w-full max-w-7xl h-[calc(82vh)] ms:max-w-xl flex bg-gray-800 bg-opacity-55 backdrop-blur-lg flex-row rounded-xl border border-gray-700">
        <div className="relative w-4/5 p-0.5 rounded-xl">
          <img
            ref={imageRef}
            src={allEvents.find((event) => event.id === selectedId)?.image || "fallback-image-url.jpg"}
            alt="Event"
            loading="lazy"
            className="object-cover w-full h-[calc(81vh)] rounded-l-xl"
          />
        </div>
        <div className="w-5/6 p-6 flex flex-col h-[calc(82vh)] overflow-y-auto rounded-r-xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setSelectedId(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <motion.h1
            layoutId={`title-${selectedId}`}
            className="text-6xl ms:text-4xl mt-3 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            {allEvents.find((event) => event.id === selectedId)?.title || 'Not available'}
          </motion.h1>
          <motion.h5
            layoutId={`type-${selectedId}`}
            className="text-2xl ms:text-xl text-pink-500 mt-4 ml-2 uppercase"
          >
            {allEvents.find((event) => event.id === selectedId)?.type || 'Not available'}
          </motion.h5>
          <div className="flex flex-row mt-2 ml-2 items-center gap-2 text-sm font-medium capitalize transition-opacity group-hover:opacity-100 opacity-60">
            <span className="w-7 h-7 overflow-hidden rounded-full shadow-sm ">
              <img className="aspect-square h-full w-full" alt="Organizer Logo" src={allEvents.find((event) => event.id === selectedId)?.organizer.avatar || ''} />
            </span>
            {allEvents.find((event) => event.id === selectedId)?.organizer.nom_organisation || 'Not available'}
          </div>
          <div className="flex flex-row p-2 mt-4 rounded-xl">
            <div className="flex items-center w-14">
              <div className="flex flex-col w-10 h-10 overflow-hidden border rounded-lg border-primary/10">
                <div className="border-b border-primary/10 bg-primary/20 bg-slate-600 h-5 text-[10px] font-semibold uppercase flex items-center w-full justify-center">
                  {new Date(allEvents.find((event) => event.id === selectedId)?.start_date || '').toLocaleString('default', { month: 'short' })}
                </div>
                <div className="flex items-center justify-center w-full h-8 font-semibold">
                  {new Date(allEvents.find((event) => event.id === selectedId)?.start_date || '').getDate()}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <div className="flex items-center w-full h-6 font-medium capitalize">
                  {new Date(allEvents.find((event) => event.id === selectedId)?.start_date || '').toLocaleDateString()}
                </div>
                <div className="flex flex-row items-center gap-1 text-sm text-muted-foreground dark:text-accent-foreground/50">
                  {new Date(allEvents.find((event) => event.id === selectedId)?.start_date || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-3 h-3">
                    <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
                  </svg>
                  {new Date(allEvents.find((event) => event.id === selectedId)?.end_date || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-2 mt-1 rounded-xl">
            <a className="flex flex-row" target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(allEvents.find((event) => event.id === selectedId)?.lieu || '')}`}>
              <div className="flex items-center w-14">
                <div className="flex items-center justify-center w-10 h-10 overflow-hidden capitalize border rounded-lg opacity-100 border-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide text-white lucide-map-pin opacity-80">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <div className="flex items-start w-full h-6 max-w-[70vw] overflow-hidden font-medium capitalize truncate sm:max-w-none whitespace-nowrap">
                    {allEvents.find((event) => event.id === selectedId)?.lieu || 'Location not available'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right h-4 opacity-50">
                      <path d="M7 7h10v10"></path>
                      <path d="M7 17 17 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
          
          <div className="w-full p-2 pt-1 space-y-2 border-t mt-7 border-gray-700 mb-4 font-semibold text-gray-300">
            <div className="space-y-2 max-w-full my-2">
              <div className="text-justify novel-editor-readonly">
                <div className="w-full max-w-screen-lg rounded-lg min-h-24">
                  <div className="relative w-full max-w-screen-lg sm:rounded-lg read-only">
                    <div>
                      <div translate="no" className="tiptap ProseMirror prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full h-full">
                        {allEvents.find((event) => event.id === selectedId)?.description || 'Event description not available'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-2 pt-1 space-y-2 border-t mt-1 border-gray-700 mb-4 font-semibold text-gray-300">
            <div className="space-y-2 max-w-full my-2">
                <div className="text-justify">
                    <div className="w-full max-w-screen-lg rounded-lg min-h-24">
                        <div className="relative w-full max-w-screen-lg sm:rounded-lg">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-gray-700">
                                        <th className="py-2 px-4">Full Name</th>
                                        <th className="py-2 px-4">Email</th>
                                        <th className="py-2 px-4">Phone Number</th>
                                        <th className="py-2 px-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((reservation, index) => (
                                        <tr key={index} className="border-b border-gray-700">
                                            <td className="py-2 px-4">{reservation.full_name}</td>
                                            <td className="py-2 px-4">{reservation.email}</td>
                                            <td className="py-2 px-4">{reservation.phone}</td>
                                            <td className="py-2 px-4 text-center">
                                                <div className='flex flex-col gap-2 md:flex-row '>
                                                <button
                                                    onClick={() => deleteReservation(reservation.code)}
                                                    className="text-red-700 hover:text-red-300 font-bold border border-red-700 px-1 py-0.5 rounded-md hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="px-1 py-1 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform  flex" data-tooltip-id="tooltip-download"
                                                    data-tooltip-content="download ticket" onClick={() => generatePDF(reservation,selectedId)}  >
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </button>
                                                <Tooltip id="tooltip-download" place="right" animation="duration-300" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button onClick={() => handleReportEvent(selectedId)} className="flex absolute top-4 right-12 items-center text-red-700 hover:text-red-300 font-bold border border-red-600 px-2 py-0.5 rounded-md hover:bg-red-600">
              <span className="font-extrabold text-xs">!</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


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
