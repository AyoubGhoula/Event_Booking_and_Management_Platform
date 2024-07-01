"use client";
import React, { useState } from 'react';
import axios from 'axios';

interface DeleteEventProps {
  eve: { id: number };
  onComplete: () => void;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ User, onComplete }) => {
  const [deleteUserPopup, setDeleteEventPopup] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const token = localStorage.getItem('token');

  const togglePopup = (id: number) => {
    setDeleteEventPopup(!deleteUserPopup);
    setIdUser(id);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/deleteUser/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('User deleted successfully');
      setDeleteEventPopup(!deleteUserPopup);
      onComplete();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  return (
    <div>
      <button onClick={() => togglePopup(User.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
        Delete
      </button>

      {deleteUserPopup && (
        <div className="overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow bg-gray-900">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setDeleteEventPopup(!deleteUserPopup)}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this User?
                </h3>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteEventPopup(!deleteUserPopup)}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteEvent;
