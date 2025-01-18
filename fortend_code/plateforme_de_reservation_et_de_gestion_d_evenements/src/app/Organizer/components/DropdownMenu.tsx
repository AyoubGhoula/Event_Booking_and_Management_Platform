"use client";
import React, { useState, useRef, useEffect } from 'react';
import Profile from './profile';
import axios from 'axios';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        console.log("in fetchUserData");
        const response = await axios.get('http://localhost:8000/api/organizer/info', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setAvatar(response.data.avatar);
          console.log('User data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        console.log('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setShowProfile(false);
  };

  const handleAccountSettingsClick = () => {
    setShowProfile(true);
    setIsOpen(false); // Close the dropdown when showing the profile
  };
  const signOut = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }
      const response = await axios.post(
        'http://localhost:8000/api/logout',
        {}, // No data needs to be sent in the body for this request
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        localStorage.removeItem('token');
        alert('Logged out successfully');
        window.location.href = '/Home'; // Redirect to Sign_in page
      } else {
        alert('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out');
    }
  };
  return (
    <>
    <div className="relative inline-block text-left  lg:block" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
        >
          <div className="w-9 h-9 border-gray-300 border rounded-full">
            <img
              src={avatar || ""}
              alt={"profile"}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-4 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-divide-gray-100 ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <a
              className="block px-4 py-2 text-sm hover:bg-blue-700 cursor-pointer"
              onClick={handleAccountSettingsClick}
            >
              Account settings
            </a>
            <form method="POST" action="#" role="none">
              <button
                onClick={signOut}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-700"
                role="menuitem"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}

      {showProfile && (
        <div className="absolute right-1 mt-4  w-96  ">
          <Profile />
        </div>
      )}
      </div>
    </>
  );
};

export default DropdownMenu;
