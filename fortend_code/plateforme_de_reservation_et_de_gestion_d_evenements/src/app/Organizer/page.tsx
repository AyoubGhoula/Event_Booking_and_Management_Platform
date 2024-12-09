"use client";
import React, { useState, useRef, useEffect } from'react';
import Navbar from "./components/Navbar";
import 'react-datepicker/dist/react-datepicker.css';
import Add_event_form from './components/add_event'; 
import Edit_event from './components/edit_event';
import Delete_event from './components/delet_event';
import Profile from './components/profile_popUp';
import axios from 'axios';
import { motion,AnimatePresence,useAnimate } from "framer-motion";

// interface Event {
//     id: number;
//     name: string;
//     start_datetime: string;
//     lient_event: string;
//     prix: number;
//     nm_max: number;
//     nm_participer: number;
//     gender: string;
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
const events=() =>{
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
    const [isHovered, setIsHovered] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
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
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [createeventpop, setcreateeventpop] = useState(false);
    const [editEventPopup,setEditEventPopup]=useState(false);
    const[profile_info,setProfileInfo]= useState(false);
   
    const dropdownRef = useRef<HTMLDivElement>(null);
    const token = localStorage.getItem('token');

    if (!token) {
      return <div>Please log in to view the events.</div>;
    }

    const [events1, setEvents] =useState<Event[]>([]);
        useEffect(() => {
            const fetchEvents = async () => {
                try {
                  const response = await axios.get('http://localhost:8000/api/user/events', {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                  });
                  const sortedEvents = response.data.sort((a:Event, b:Event) => b.id - a.id);
                  setEvents(sortedEvents);
                } catch (error) {
                  console.error('Error fetching events:', error);
                }
              };
      
          fetchEvents();
        },[createeventpop,editEventPopup]);
        
        const handleEditComplete = () => {
            setEditEventPopup(!editEventPopup);
          };



          

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setMobileDrawerOpen(false);
            setcreateeventpop(false);
          }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
    }
    const targetpopup= () => {
        setcreateeventpop(!createeventpop);
        console.log(createeventpop);
    
    }
    const targetprofilepopup=()=>{
      setProfileInfo(!profile_info);
  };
    return (
<>

            


<div className=' bg-gray-50 dark:bg-gray-900'>
            <Navbar/>



{createeventpop && (
    <div
    id="crud-modal"
    aria-hidden="true"
    className="overflow-y-auto overflow-x-hidden fixed inset-0 flex justify-center z-50 items-center w-full md:inset-0 h-[calc(300%-1rem)] max-h-[100%] bg-black bg-opacity-50"
    ref={dropdownRef}
  >
    <div className="relative p-4 w-[70rem] max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Event
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={targetpopup}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <Add_event_form />
      </div>
    </div>
  </div>
  


)}



<div className="">
   <div className=" border-2 border-gray-200 p-2 border-dashed rounded-lg dark:border-gray-700">
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
      <div className="relative  w-full h-full overflow-x-auto shadow-md sm:rounded-lg mb-4">
         <div className="flex items-center justify-center rounded bg-gray-50 p-8 dark:bg-gray-800">
         <div>
              <div className="sm:block hidden">

               {/* Search Fields */}

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
              



<div className="p-4  mb-10 rounded bg-gray-50 dark:bg-gray-800">
<div className="">
         <div className="flex items-center justify-center absolute mb-7 right-8 rounded bg-gray-50 p-8 dark:bg-gray-800">
         <div>
              <div className="">
              <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={targetpopup}>
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add Event
                </button>
               </div>
               </div>
              </div>
              </div>
{/* Events List */}
<div className="space-y-8 mt-30">
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
<motion.div className="items-center px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent font-medium border border-opacity-20 shadow-none rounded-full overflow-hidden text-nowrap text-ellipsis block max-w-[25vw] bg-teal-500/20 hover:bg-teal-500/20 text-teal-500">
{event.type}
</motion.div>
<div className="items-center px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent font-medium border border-opacity-20 shadow-none rounded-full overflow-hidden text-nowrap text-ellipsis max-w-[25vw] bg-green-500/20 hover:bg-green-500/20 text-green-500 flex-row flex">
200 TND
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
{profile_info && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-700 w-72 px-4 pb-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Event</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={targetprofilepopup}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            <div className="flex items-center space-x-4 my-4">
              <img
                className="w-150 h-150 rounded-full object-cover  left-0 top-0 "
                src="/avatar.jpg"  
                alt="User Avatar"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Name : </h3> 
                <h3 className="text-lg font-medium text-gray-900">Email : </h3>
                <h3 className="text-lg font-medium text-gray-900">Phone : </h3>
                <h3 className="text-lg font-medium text-gray-900">Payer : </h3>
                <h3 className="text-lg font-medium text-gray-900">date of birth : </h3>
                <h3 className="text-lg font-medium text-gray-900">Adress : </h3>
                <p className="text-sm text-gray-500">date of birth :</p> 
              </div>
            </div>
            <button
              onClick={targetprofilepopup}
              className="w-full py-2 text-sm font-medium text-white bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>

)
}

      </div>
      
   </div>
</div>

</div>         
      </>

);

}
export default events ;