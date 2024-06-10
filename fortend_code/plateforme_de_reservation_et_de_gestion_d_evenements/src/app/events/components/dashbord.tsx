
import Link from 'next/link';
        import React from 'react';



const dashboard = () => {



    return (
        <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
            <div className="fixed left-0 h-full w-64 shadow-md text-gray-200 bg-gray-900 border-b border-gray-800 mr-10 ">
              <div className="p-4 text-lg font-bold">My App</div>
              <nav className="mt-4">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link href="/" className=''>
                    Home
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link href="/about">
                      About
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link href="/services">
                      Services
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link href="/contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            </div>
          );
        };


export default dashboard;