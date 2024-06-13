"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';

export default function Example() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      console.log(response.data);
      alert('You have been logged in successfully');
      localStorage.setItem('token', response.data.access_token);
    } catch (error) {
      console.error(error);
    }
  }; 
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
            </div>
            
            <div className="flex items-center justify-center mt-6">
              <Link href="/Sign_in" className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-blue-400 dark:text-blue-300">
                  sign in
              </Link>

              <Link href="/Sign_up" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-gray-500 dark:border-gray-400 dark:text-white">
                  sign up
              </Link>
            </div>
            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mt-6">
              <div className="flex space-x-4 justify-center">
                <Link href="/">
                    <button className="w-full px-8 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50">
                      Cancel
                    </button>
                </Link>
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" type="submit">
                  Sign In
                </button>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                  Already have an account?
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
