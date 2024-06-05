import React, { useState, useRef, useEffect } from 'react';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
        >
          <div className="w-9 h-9 border-gray-300 border rounded-full ">
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
              href="#"
              className=" block px-4 py-2 text-sm hover:bg-blue-700"
              role="menuitem"
            >
              Account settings
            </a>
            <a
              href="#"
              className=" block px-4 py-2 text-sm hover:bg-blue-700"
              role="menuitem"
            >
              Support
            </a>
            <a
              href="#"
              className=" block px-4 py-2 text-sm hover:bg-blue-700"
              role="menuitem"
            >
              License
            </a>
            <form method="POST" action="#" role="none">
              <button
                type="submit"
                className=" block w-full text-left px-4 py-2 text-sm hover:bg-blue-700"
                role="menuitem"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
