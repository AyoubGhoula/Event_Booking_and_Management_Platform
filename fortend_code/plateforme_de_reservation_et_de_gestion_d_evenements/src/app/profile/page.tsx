"use client";
import Image from 'next/image'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import image from './img1.png';
const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error.message);
        // Handle error, e.g., redirect to login page
      }
    };

    fetchUser();
  }, []);

  return (
    <div >
      {/* {user ? (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <div className="flex space-x-4">
            <img src={user.avatar} alt="Avatar" className="w-40 h-40 mt-6 rounded-full" />
            <div className='m-4'>
              <h1 className='m-5'>name : {user.name}</h1>
              <h1 className='m-5'>email : {user.email}</h1>
              <h1 className='m-5' >payer : {user.payer}</h1>
              <h1 className='m-5' >phone :{user.phone}</h1>
              <h1 className='m-5' >birth day :{user.date_of_birth}</h1>
              <h1 className='m-5' >address : {user.address}</h1>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}


<div className="bg-white overflow-hidden shadow rounded-lg border">
    <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
        </p>
        
    </div>
    <div className="flex">
        <Image src={"/composer/img1.png"}  width={500} height={500} alt="Picture of the author" className="w-40 h-40 mt-5 rounded-full" />
    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Full name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    John Doe
                </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    johndoe@example.com
                </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    (123) 456-7890
                </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    123 Main St<br/>
                     Anytown, USA 12345
                </dd>
            </div>
        </dl>
    </div>
</div>
    </div></div>
  );
};

export default Profile;
