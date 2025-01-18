"use client";
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const add_event = () => {
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
      alert('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event');
    }
  };

  return (
    <>
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
    </>
  );
};
export default add_event;