"use client";
import React, { useState, useRef, useEffect } from'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const add_event=() =>{
    const [eventData, setEventData] = useState({
        name: '',
        start_datetime: '',
        lient_event: '',
        prix: '',
        nm_max: '',
        nm_participer: 0,
        gender: '-'
      });
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:8000/api/add_events', eventData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Event added:', response.data);
          alert('Event added successfully');
        } catch (error) {
          console.error('Error adding event:', error);
          alert('Failed to add event');
        }
      };
    
    
    return (

<>
<div >
<form className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 overflow-y-auto rounded-r-xl [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-gray-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500" onSubmit={handleSubmit}>
  {/* Image Input Section */}
  <div className="flex-1">
    <label
      htmlFor="dropzone-file"
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
      <input id="dropzone-file" type="file" className="hidden" onChange={handleChange} />
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
      <label htmlFor="title" className="block text-sx font-medium text-gray-200">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
        placeholder="Enter event title"
        onChange={handleChange}
      />
    </div>

    <div>
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

    <div className="flex gap-4">
      <div className="flex-1">
        <label htmlFor="start-date" className="block text-sx font-medium text-gray-200">
          Start Date
        </label>
        <input
          type="datetime-local"
          id="start-date"
          name="start_datetime"
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
          name="end_datetime"
          className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
          onChange={handleChange}
        />
      </div>
    </div>

    <div>
      <label htmlFor="location" className="block text-sx font-medium text-gray-200">
        Location
      </label>
      <input
        type="text"
        id="location"
        name="location"
        className="mt-1 block w-full p-2 bg-slate-700 border border-gray-600 rounded-lg"
        placeholder="Enter event location"
        onChange={handleChange}
      />
    </div>

    <div>
      <label htmlFor="google-map-link" className="block text-sx font-medium text-gray-200">
        Google Map Link
      </label>
      <input
        type="url"
        id="google-map-link"
        name="google_map_link"
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
        name="nb_maxParticipants"
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
            </>
    );

}
export default add_event;