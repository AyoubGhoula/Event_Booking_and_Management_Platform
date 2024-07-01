"use client";
import Image from 'next/image'
import Navbar from "../Home/components/Navbar";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
    id: number;
    name: string;
    start_datetime: string;
    lient_event: string;
    prix: number;
    nm_max: number;
    nm_participer: number;
    gender: string;
  }
const event =() =>{
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] =useState<Event[]>([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
              const response = await axios.get('http://localhost:8000/api/allevents');
              const sortedEvents = response.data.sort((a:Event, b:Event) => b.id - a.id);
              setEvents(sortedEvents);
            } catch (error) {   
              console.error('Error fetching events:', error);
            }
          };
  
          if (searchQuery.length > 0) {
            handleSearch();
        } else {
            fetchEvents();
        }
    }, [searchQuery]);
    const handleSearch = () => {
        axios.get('http://localhost:8000/api/search-events', { params: { query: searchQuery } })
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error searching events:', error);
            });
    };
return(


<div className='min-h-screen bg-gray-900'>
            <Navbar/>
    <div>
        <div className="p-4 m-2 mb-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
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
      <div className="relative  w-full h-full overflow-x-auto shadow-md sm:rounded-lg ">
              <div className="flex items-center justify-center  mb-4 rounded bg-gray-50 dark:bg-gray-800">

              <div className="flex flex-1 items-center justify-center p-6">
    <div className="w-full max-w-lg">
        <div className=" sm:flex sm:items-center">
            <input  value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)} onSubmit={handleSearch} className="inline w-full rounded-md border text-gray-50 border-gray-300 bg-gray-700 py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Keyword" type="search" autoFocus={true}/>
            <button type="submit" onClick={handleSearch} className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Search</button>
        </div>
    </div>
</div>
              </div>

      </div>
<div className="flex items-center justify-center  mb-4 rounded bg-gray-50 dark:bg-gray-800">
<div className="relative  w-full h-full overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Event name
                </th>
                <th scope="col" className="px-6 py-3">
                start datetime
                </th>
                <th scope="col" className="px-6 py-3">
                lient event
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                number max of participation
                </th>
                <th scope="col" className="px-6 py-3">
                number of participation
                </th>
                <th scope="col" className="px-6 py-3">
                gender
                </th>
                <th scope="col" className="px-6 py-3">
                </th>
                <th scope="col" className="px-6 py-3">
                </th>
            </tr>
        </thead>
        <tbody>
        {events.map(event=> (
            <tr  key={event.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {event.name}
                </th>
                <th className="px-6 py-4">
                {event.start_datetime}
                </th>
                <th className="px-6 py-4">  
                {event.lient_event}
                </th>
                <th className="px-<Event>6 py-4">
                {event.prix}
                </th>
                <th className="px-6 py-4">
                {event.nm_max}
                </th>
                <th className="px-6 py-4">
                {event.nm_participer}
                </th>
                <th className="px-6 py-4">
                {event.gender}
                </th>
                <th className="px-6 py-4">
                
                </th>
                <th className="px-6 py-4">
                
                </th>
            </tr>
            
        ))}
        </tbody>
    </table>

</div>
      </div>
      
   </div>
</div>

</div>



);


}
export default event ;