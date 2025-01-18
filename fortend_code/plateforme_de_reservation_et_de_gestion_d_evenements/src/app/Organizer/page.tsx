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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  avatar: string;
  nom_organisation: string;
  prix: number;
  image: string;
  site_web_organisation : string;

}

const events=() =>{
  //  const events:Event[] = [
    //   {
    //      id:10,
    //     name: 'Tech Conference 2024',
    //     date: 'March 15, 2024',
    //     description: 'A conference showcasing the latest in tech innovation.',
    //     type: 'Conference',
    //     location: 'San Francisco, CA',
    //     image:'/image/278051.jpg'
    //   },
    //   {
    //     id:44,
    //    name: 'Tech Conference 2024',
    //    date: 'May 10, 2024',
    //    description: 'A conference showcasing the latest in tech innovation.',
    //    type: 'Conference',
    //    location: 'San Francisco, CA',
    //    image:'/image/278051.jpg'
    //  },
    //  {
    //     id:47,
    //    name: 'Tech Conference 2024',
    //    date: 'May 10, 2024',
    //    description: 'A conference showcasing the latest in tech innovation.',
    //    type: 'Conference',
    //    location: 'San Francisco, CA',
    //    image:'/image/278051.jpg'
    //  },
    //   {
    //      id:9,
    //     name: 'Music Festival 2024',
    //     date: 'April 22, 2024',
    //     description: 'Join us for an epic outdoor music festival.',
    //     type: 'Festival',
    //     location: 'Los Angeles, CA',
    //     image:'/image/25oct7.jpg',
    //   },
    //   {
    //      id:8,
    //     name: 'Art Exhibition',
    //     date: 'May 10, 2024',
    //     description: 'An exhibition of modern art and installations.',
    //     type: 'Exhibition',
    //     location: 'New York, NY',
    //     image:'/image/10e5ed3a4dc33fbd3b146437610a99b10c0.webp',
    //   },
    //   {
    //      id:7,
    //     name: 'Music Festival 2024',
    //     date: 'April 22, 2024',
    //     description: 'Join us for an epic outdoor music festival.',
    //     type: 'Festival',
    //     location: 'Los Angeles, CA',
    //   },
    //   {
    //      id:6,
    //     name: 'Music Festival 2024',
    //     date: 'April 22, 2024',
    //     description: 'Join us for an epic outdoor music festival.',
    //     type: 'Festival',
    //     location: 'Los Angeles, CA',
    //   },
    //   {
    //      id:5,
    //     name: 'Music Festival 2024',
    //     date: 'April 22, 2024',
    //     description: 'Join us for an epic outdoor music festival.',
    //     type: 'Festival',
    //     location: 'Los Angeles, CA',
    //   },
    //   {
    //      id:4,
    //     name: 'Music Festival 2024',
    //     date: 'April 22, 2024',
    //     description: 'Join us for an epic outdoor music festival.',
    //     type: 'Festival',
    //     location: 'Los Angeles, CA',
    //   },
    //   {
    //      id:3,
    //     name: 'Music Festival 2024',
    //     date: 'April 22, 2024',
    //     description: 'Join us for an epic outdoor music festival.',
    //     type: 'Festival',
    //     location: 'Los Angeles, CA',
    //   }
    // ];
    const [searchTitle, setSearchTitle] = useState<string>("");
    const [searchType, setSearchType] = useState<string>("");
    const [searchDate, setSearchDate] = useState<string>("");
    const [isHovered, setIsHovered] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    // const filteredEvents = events.filter((event) => {
    //   return (
    //     (searchTitle === "" ||
    //       event.name.toLowerCase().includes(searchTitle.toLowerCase())) &&
    //     (searchType === "" ||
    //       event.type.toLowerCase().includes(searchType.toLowerCase())) &&
    //     (searchDate === "" || event.date === searchDate)
    //   );
    // });
    // const groupedEvents: Record<string, Event[]> = filteredEvents.reduce(
    //   (acc, event) => {
    //     const date = event.date;
    //     if (!acc[date]) {
    //       acc[date] = [];
    //     }
    //     acc[date].push(event);
    //     return acc;
    //   },
    //   {} as Record<string, Event[]>
    // );
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [createeventpop, setcreateeventpop] = useState(false);
    const [editEventPopup,setEditEventPopup]=useState(false);
    const[profile_info,setProfileInfo]= useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const token = localStorage.getItem('access_token');

    if (!token) {
      return <div>Please log in to view the events.</div>;
    }
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
}, [searchTitle, searchType, searchDate]);
    const [events1, setEvents] =useState<Event[]>([]);
        // useEffect(() => {
        //     const fetchEvents = async () => {
        //         try {
        //           const response = await axios.get('http://localhost:8000/api/user/events', {
        //             headers: {
        //               Authorization: `Bearer ${localStorage.getItem('token')}`,
        //             },
        //           });
        //           const sortedEvents = response.data.sort((a:Event, b:Event) => b.id - a.id);
        //           setEvents(sortedEvents);
        //         } catch (error) {
        //           console.error('Error fetching events:', error);
        //         }
        //       };

        //   fetchEvents();
        // },[createeventpop,editEventPopup]);

        const handleEditComplete = () => {
            setEditEventPopup(!editEventPopup);
          };

const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
const [allEvents, setAllEvents] = useState<Event[]>([]); // Stores all events fetched from the backend
const [groupedEvents, setGroupedEvents] = useState<Record<string, Event[]>>({}); // Stores grouped events after filtering

          const groupAndSetEvents = (events: Event[]) => {
            const grouped = events.reduce((acc, event) => {
                const date = new Date(event.start_date).toDateString();
                if (!acc[date]) acc[date] = [];
                acc[date].push(event);
                return acc;
            }, {} as Record<string, Event[]>);

            setGroupedEvents(grouped);
          };
//get events
useEffect(() => {
  const fetchEvents = async () => {
      try {
          const token = localStorage.getItem('access_token');
          if (!token) {
              throw new Error('No token found');
          }

          const response = await axios.get('http://localhost:8000/api/organizer/my-events', {
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
}, [notification,]); // Fetch events on component mount


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









// add event
const [eventData, setEventData] = useState({
  titre: '',
  description: '',
  type: '',
  prix: 0,
  date_debut: '',
  date_fin: '',
  lieu: '',
  map_link: '',
  nb_max_participants: 0,
});
const [file, setFile] = useState<File | null>(null);

const handleChange = (e: any) => {
  const { name, value, files } = e.target;
  if (name === 'image' && files.length > 0) {
    setFile(files[0]);
  } else {
    setEventData((prevData) => ({
      ...prevData,
      [name]: name === 'prix' || name === 'nb_max_participants' ? parseInt(value) : value
    }));
  }
};

const handleSubmit = async (e: any) => {
  e.preventDefault();
  try {
    console.log('Adding event:', eventData);
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No token found');
    }

    const formData = new FormData();
    for (const key in eventData) {
      formData.append(key, eventData[key as keyof typeof eventData] as string);
    }
    if (file) {
      formData.append('image', file);
    }

    const response = await axios.post('http://localhost:8000/api/add_events', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Event added:', response.data);
    showNotification('success', 'Event added successfully');
    setcreateeventpop(!createeventpop);

  } catch (error:any) {
    console.error('Error adding event:', error);
    setcreateeventpop(!createeventpop);
    showNotification('error', error.response?.data.message || 'Failed to add event');
  }
};



const showNotification = (type: 'success' | 'error', message: string) => {
  setNotification({ type, message });
  setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
};

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [eventToDelete, setEventToDelete] = useState<number | null>(null);

const handleDeleteClick = (eventId: number) => {
  setEventToDelete(eventId);
  setShowDeleteModal(true);
};

const handleDeleteConfirm = async () => {
  if (eventToDelete !== null) {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:8000/api/deleteEvent/${eventToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSelectedId(null);
      setAllEvents(allEvents.filter(event => event.id !== eventToDelete));
      setShowDeleteModal(false);
      setEventToDelete(null);
      showNotification('success', 'Event deleted successfully');

    } catch (error: any) {
      console.error('Error deleting event:', error);
      showNotification('error', error.response?.data.message || 'Failed to delete event');
    }
  }
};

const [showEditModal, setShowEditModal] = useState(false);
const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

const handleEditClick = (eventId: number) => {
  const event = allEvents.find(e => e.id === eventId);
  if (event) {
    setEventToEdit(event);
    setEventData({
      titre: event.title,
      description: event.description,
      type: event.type,
      prix: event.prix,
      date_debut: event.start_date,
      date_fin: event.end_date,
      lieu: event.lieu,
      map_link: event.map_link,
      nb_max_participants: event.max_participants
    });
    setShowEditModal(true);
  }
};

const handleEditSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!eventToEdit) return;

  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No token found');

    const formData = new FormData();
    for (const key in eventData) {
      formData.append(key, eventData[key as keyof typeof eventData] as string);
    }
    if (file) {
      formData.append('image', file);
    }

    const response = await axios.post(`http://localhost:8000/api/editEvents/${eventToEdit.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    setAllEvents(prev => prev.map(event =>
      event.id === eventToEdit.id ? { ...event, ...response.data } : event
    ));

    setShowEditModal(false);
    setEventToEdit(null);
    setSelectedId(null);
    showNotification('success', 'Event updated successfully');
  } catch (error: any) {
    console.error('Error updating event:', error);
    showNotification('error', error.response?.data.message || 'Failed to update event');
  }
};

const [showParticipantsModal, setShowParticipantsModal] = useState(false);
const [participants, setParticipants] = useState<any[]>([]);
const [eventParticipants, setEventParticipants] = useState<{ max_participants: number, current_participants: number } | null>(null);

const handleParticipantsClick = async (eventId: number) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No token found');

    const response = await axios.get(`http://localhost:8000/api/event/${eventId}/all-reservations`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setParticipants(response.data.data.reservations);
    setEventParticipants({
      max_participants: response.data.data.max_participants,
      current_participants: response.data.data.total_reservations
    });
    setShowParticipantsModal(true);
  } catch (error: any) {
    console.error('Error fetching participants:', error);
    showNotification('error', error.response?.data.message || 'Failed to fetch participants');
  }
};

const handleCancelReservation = async (reservationId: number) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No token found');

    await axios.post(
      `http://localhost:8000/api/organizer/${reservationId}/cancelResOrg`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setParticipants(participants.filter(participant => participant.id !== reservationId));
    showNotification('success', 'Reservation cancelled successfully');
  } catch (error: any) {
    console.error('Error cancelling reservation:', error);
    showNotification('error', error.response?.data.message || 'Failed to cancel reservation');
  }
};

const [showCancelModal, setShowCancelModal] = useState(false);
const [reservationToCancel, setReservationToCancel] = useState<number | null>(null);

const handleCancelClick = (reservationId: number) => {
  setReservationToCancel(reservationId);
  setShowCancelModal(true);
};

const handleCancelConfirm = async () => {
  if (reservationToCancel !== null) {
    await handleCancelReservation(reservationToCancel);
    setShowCancelModal(false);
    setReservationToCancel(null);
  }
};

const handleDownloadParticipants = () => {
  const doc = new jsPDF();
  const selectedEvent = allEvents.find(event => event.id === selectedId);

  if (selectedEvent) {
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204); // Set text color to blue
    doc.text(`Event Title: ${selectedEvent.title}`, 14, 20);
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.text(`Event Type: ${selectedEvent.type}`, 14, 30);
    doc.text(`Event Date: ${new Date(selectedEvent.start_date).toLocaleDateString()} - ${new Date(selectedEvent.end_date).toLocaleDateString()}`, 14, 40);
    doc.text(`Location: ${selectedEvent.lieu}`, 14, 50);
    doc.text(`Price: ${selectedEvent.prix} TND`, 14, 60);
    doc.text(`Organizer: ${selectedEvent.nom_organisation}`, 14, 70);
    doc.text(`Description: ${selectedEvent.description}`, 14, 80);
  }

  const tableColumn = ["Full Name", "Email", "Phone", "Reserved At", "Unique Code", "Present"];
  const tableRows = [];

  participants.forEach(participant => {
    const participantData = [
      participant.full_name,
      participant.email,
      participant.phone,
      participant.reserved_at,
      participant.code_unique, // Assuming unique_code is available in participant data
      "" // "Is Vide" column
    ];
    tableRows.push(participantData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 90 });
  doc.save(`participants_${new Date().toISOString()}.pdf`);
};

    return (
<>




<div className=" bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(42,54,99,0.7),rgba(255,255,255,0))]">

            <Navbar/>


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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div>
        <form
          className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 overflow-y-auto rounded-r-xl [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-gray-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          onSubmit={handleSubmit}
        >
          {/* Image Input Section */}
          <div className="flex-1">
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG, GIF (Max 800x400px)
                </p>
              </div>
              <input id="image" name="image" type="file" className="hidden" onChange={handleChange} />
            </label>
            <div>
              <label htmlFor="description" className="block  mt-3 text-sx font-medium text-gray-200">
                Description
              </label>
              <textarea
                rows={7}
                id="description"
                name="description"
                className="mt-4 block w-full p-2  bg-slate-700 border border-gray-600 rounded-lg"
                placeholder="Enter event description"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-1 space-y-4">
            <div>
              <label htmlFor="titre" className="block text-sx font-medium text-gray-200">
                Title
              </label>
              <input
                type="text"
                id="titre"
                name="titre"
                className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                placeholder="Enter event titre"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="type" className="block text-sx font-medium text-gray-200">
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  className="mt-1 block w-full p-2 border bg-slate-700 border-gray-600 rounded-lg"
                  placeholder="Enter event type"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="prix" className="block text-sx font-medium text-gray-200">
                  Price
                </label>
                <input
                  type="number"
                  id="prix"
                  name="prix"
                  className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                  placeholder="Enter event prix"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="start-date" className="block text-sx font-medium text-gray-200">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  id="start-date"
                  name="date_debut"
                  className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="end-date" className="block text-sx font-medium text-gray-200">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  id="end-date"
                  name="date_fin"
                  className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="lieu" className="block text-sx font-medium text-gray-200">
                Location
              </label>
              <input
                type="text"
                id="lieu"
                name="lieu"
                className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                placeholder="Enter event location"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="map_link" className="block text-sx font-medium text-gray-200">
                Google Map Link
              </label>
              <input
                type="url"
                id="map_link"
                name="map_link"
                className="mt-1 block w-full p-2  bg-slate-700 border border-gray-600 rounded-lg"
                placeholder="Enter Google Map link"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="max-participants" className="block text-sx font-medium text-gray-200">
                Max Participants
              </label>
              <input
                type="number"
                id="max-participants"
                name="nb_max_participants"
                className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                placeholder="Enter maximum participants"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>



)}



<div className="">
   <div className="  border-gray-200 p-2 b rounded-lg dark:border-gray-700 mt-2">
      <div className="flex  justify-center h-48 mb-20 rounded flex-col">
      <div className="flex justify-center h-48 mb-4 rounded">
            <div className="mx-auto mt-6 w-full px-6 lg:mx-0 lg:max-w-none max-w-3xl">
              <div className="mb-6 items-end justify-between text-white flex">
                <div>
                  <h1 className="text-8xl p-2 ms:text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Organize Your Events</h1>
                  <p className="text-gray-400 mt-7 pl-10 text-l bg-gradient-to-r from-gray-500 to-gray-500 bg-clip-text text-transparent ">Welcome to your organizer dashboard. Here, you can manage your events, view participants, and keep your audience engaged. Create, edit, or delete events with ease, and send notifications to participants. Stay on top of your event's success with detailed insights and ensure a smooth experience for both organizers and participants.</p>
                </div>
              </div>
            </div>
      </div>
      </div>
      <div className="flex flex-col items-center">
      {/* Search Fields */}
      <div className="relative  w-full h-full overflow-x-auto shadow-md sm:rounded-lg mb-8 mt-4 ">
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
        <div className="relative w-full h-full bg-transparent overflow-x-auto sm:rounded-lg mb-8 mt-4">
          <div className="ml-4 backdrop-blur-lg rounded right-8">
            <div>
              <div className="">
              <button type="submit" className="text-white inline-flex items-center bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={targetpopup}>
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>




<div className="p-4  mb-10 rounded  backdrop-blur-lg border border-gray-800 ">

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
                    onClick={() => setSelectedId(event.id)}
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
                      <h5 className=" text-cyan-50 opacity-5">________________________________________</h5>
                      <h2 className="font-semibold tracking-tight text-cyan-50 md:text-lg scroll-m-20 md:font-medium first-letter:uppercase">
                        {event.title}
                      </h2>
                      <div className="flex flex-row gap-2 opacity-50">
                        <button type="button" className="flex items-center gap-1 group">
                          <div className="flex flex-row items-center gap-2 text-sm font-medium capitalize transition-opacity group-hover:opacity-100 opacity-60">
                          <div className="flex flex-row mt-2 items-center gap-2 text-sm font-medium capitalize transition-opacity group-hover:opacity-100 opacity-60">
                          <span className="w-5 h-5 overflow-hidden rounded-full shadow-sm">
                          <img className="aspect-square h-full w-full" alt="Organizer Logo" src={event.avatar} />
                            </span>
                            </div>
                            <a href={event.site_web_organisation}>
                            {`${event.nom_organisation}`}
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
            <img className="aspect-square h-full w-full" alt="Organizer Logo" src={allEvents.find((event) => event.id === selectedId)?.avatar || ''} />
          </span>
          {allEvents.find((event) => event.id === selectedId)?.nom_organisation || 'Not available'}
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
          {/* reservation */}
          <div className="w-full p-2 pt-1 mt-8 space-y-2 border border-gray-700 rounded-xl bg-black bg-opacity-20 ">
                <h1 className="mt-1 ml-1 font-semibold tracking-tight ">
                Event
                </h1>
                <div role="alert" className="relative w-full rounded-lg px-4 py-3 text-sm [&amp;>svg+div]:translate-y-[-3px] [&amp;>svg]:absolute [&amp;>svg]:left-4 [&amp;>svg]:top-4 [&amp;>svg~*]:pl-7 border border-spacing-0.5  bg-black bg-opacity-30  text-foreground [&amp;>svg]:text-foreground z-10 flex flex-col gap-2  bg-background/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ticket w-4 h-4">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z">
                </path>
                <path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2">
                </path>
                </svg>
                <div className="flex flex-row items-center justify-between align-middle"><h5 className="mb-1 font-medium tracking-tight text-lg">{allEvents.find((event) => event.id === selectedId)?.title} | {new Date(allEvents.find((event) => event.id === selectedId)?.start_date || '').toLocaleTimeString([], { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })} - {new Date(allEvents.find((event) => event.id === selectedId)?.end_date || '').toLocaleTimeString([], { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })} </h5><h5 className="mb-1 tracking-tight text-lg font-semibold">
                {allEvents.find((event) => event.id === selectedId)?.prix || 'Price not available'}
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
                Sessions from {new Date(allEvents.find((event) => event.id === selectedId)?.start_date || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to {new Date(allEvents.find((event) => event.id === selectedId)?.end_date || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} at {allEvents.find((event) => event.id === selectedId)?.prix || 'Price not available'} DT per person.
                </div>
                </div>

                <div className="fixed top-0 z-50 right-14  rounded-lg  backdrop-blur-lg p-3 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => handleEditClick(selectedId)}
            >
              Edit
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" onClick={() => handleDeleteClick(selectedId)}>Delete</button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700" onClick={() => handleParticipantsClick(selectedId)}>List Participate</button>
          </div>
               </div>
                </div>
          <div className="w-full p-2 pt-1 space-y-2 border-t mt-2 border-gray-700 mb-4 font-semibold text-gray-300">
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
         </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>

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

{showDeleteModal && (
  <div id="deleteModal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
      <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <button
          type="button"
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => setShowDeleteModal(false)}
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
        </svg>
        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
        <div className="flex justify-center items-center space-x-4">
          <button
            type="button"
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            onClick={() => setShowDeleteModal(false)}
          >
            No, cancel
          </button>
          <button
            type="button"
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={handleDeleteConfirm}
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{showEditModal && (
  <div
    id="crud-modal"
    aria-hidden="true"
    className="overflow-y-auto overflow-x-hidden fixed inset-0 flex justify-center z-50 items-center w-full md:inset-0 h-[calc(300%-1rem)] max-h-[100%] bg-black bg-opacity-50"
  >
    <div className="relative p-4 w-[70rem] max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Event
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setShowEditModal(false)}
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
        <div>
          <form
            className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 overflow-y-auto rounded-r-xl [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-gray-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            onSubmit={handleEditSubmit}
          >
            {/* Image Input Section */}
            <div className="flex-1">
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG, GIF (Max 800x400px)
                  </p>
                </div>
                <input id="image" name="image" type="file" className="hidden" onChange={handleChange} />
              </label>
              <div>
                <label htmlFor="description" className="block mt-3 text-sx font-medium text-gray-200">
                  Description
                </label>
                <textarea
                  rows={7}
                  id="description"
                  name="description"
                  className="mt-4 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                  placeholder="Enter event description"
                  value={eventData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 space-y-4">
              <div>
                <label htmlFor="titre" className="block text-sx font-medium text-gray-200">
                  Title
                </label>
                <input
                  type="text"
                  id="titre"
                  name="titre"
                  className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                  placeholder="Enter event title"
                  value={eventData.titre}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="type" className="block text-sx font-medium text-gray-200">
                    Type
                  </label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    className="mt-1 block w-full p-2 border bg-slate-700 border-gray-600 rounded-lg"
                    placeholder="Enter event type"
                    value={eventData.type}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="prix" className="block text-sx font-medium text-gray-200">
                    Price
                  </label>
                  <input
                    type="number"
                    id="prix"
                    name="prix"
                    className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                    placeholder="Enter event price"
                    value={eventData.prix}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="start-date" className="block text-sx font-medium text-gray-200">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    id="start-date"
                    name="date_debut"
                    className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                    value={eventData.date_debut}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="end-date" className="block text-sx font-medium text-gray-200">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    id="end-date"
                    name="date_fin"
                    className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                    value={eventData.date_fin}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lieu" className="block text-sx font-medium text-gray-200">
                  Location
                </label>
                <input
                  type="text"
                  id="lieu"
                  name="lieu"
                  className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                  placeholder="Enter event location"
                  value={eventData.lieu}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="map_link" className="block text-sx font-medium text-gray-200">
                  Google Map Link
                </label>
                <input
                  type="url"
                  id="map_link"
                  name="map_link"
                  className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                  placeholder="Enter Google Map link"
                  value={eventData.map_link}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="max-participants" className="block text-sx font-medium text-gray-200">
                  Max Participants
                </label>
                <input
                  type="number"
                  id="max-participants"
                  name="nb_max_participants"
                  className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
                  placeholder="Enter maximum participants"
                  value={eventData.nb_max_participants}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Update Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}

{showParticipantsModal && (
  <div
    id="participants-modal"
    aria-hidden="true"
    className="overflow-y-auto overflow-x-hidden fixed inset-0 flex justify-center z-50 items-center w-full md:inset-0 h-[calc(300%-1rem)] max-h-[100%] bg-black bg-opacity-50"
  >
    <div className="relative p-4 w-[70rem] max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Participants List
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setShowParticipantsModal(false)}
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
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-7xl mx-auto flex flex-col gap-8 overflow-y-auto rounded-r-xl [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-gray-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div className="flex justify-between items-center">
            <div className="text-white text-xl font-semibold">
              {eventParticipants?.current_participants}/{eventParticipants?.max_participants}
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleDownloadParticipants}>
              Download
            </button>
          </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Full Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Reserved At</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
              </thead>
              <tbody>
              {participants.map(participant => (
                <tr key={participant.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{participant.full_name}</th>
                <td className="px-6 py-4">{participant.email}</td>
                <td className="px-6 py-4">{participant.phone}</td>
                <td className="px-6 py-4">{participant.reserved_at}</td>
                <td className="px-6 py-4">
                  <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={() => handleCancelClick(participant.id)}
                  >
                  Cancel
                  </button>
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
)}

{showCancelModal && (
  <div id="deleteModal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
      <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <button
          type="button"
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => setShowCancelModal(false)}
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span className="sr-only">Close modal</span>
        </button>
        <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
        </svg>
        <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to cancel this reservation?</p>
        <div className="flex justify-center items-center space-x-4">
          <button
            type="button"
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            onClick={() => setShowCancelModal(false)}
          >
            No, cancel
          </button>
          <button
            type="button"
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={handleCancelConfirm}
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      </>

);

}
export default events ;