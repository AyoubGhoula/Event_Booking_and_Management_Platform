import React, { useState, useRef, useEffect } from 'react';
import Profile from './profile';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showProfile, setShowProfile] = useState(false);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setShowProfile(false);
  };

  const handleAccountSettingsClick = () => {
    setShowProfile(true);
    setIsOpen(false); // Close the dropdown when showing the profile
  };

  return (
    <>
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
        >
          <div className="w-9 h-9 border-gray-300 border rounded-full">
            <img
              src={""}
              alt={"profile"}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-4 w-56 rounded-md shadow-lg bg-black ring-1 ring-blue ring-opacity-5"
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
            <a
              href="#"
              className="block px-4 py-2 text-sm hover:bg-blue-700"
              role="menuitem"
            >
              Support
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm hover:bg-blue-700"
              role="menuitem"
            >
              License
            </a>
            <form method="POST" action="#" role="none">
              <button
                type="submit"
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
