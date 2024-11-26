"use client";
import React, { useState, useRef, useEffect } from'react';
import Navbar from "./components/Navbar";
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
    <div className="space-y-6">
      {Object.keys(groupedEvents).map((date) => (
        <div key={date} className=" space-y-4">
          {/* Date header */}
          <div className=" sticky top-0 text-xl font-semibold text-gray-800">{date}</div>

          {/* Event List for the specific date */}
          <div className="flex flex-wrap gap-4">
            {groupedEvents[date].map((event:any) => (
              <div key={event.id} className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3">
                <h2 className="text-lg font-medium text-gray-700">{event.title}</h2>
                <p className="text-sm text-gray-500">Date: {event.date}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;
