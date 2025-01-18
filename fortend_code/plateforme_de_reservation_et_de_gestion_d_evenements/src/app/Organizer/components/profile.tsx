import React, { useState, useRef, useEffect } from 'react';
const profile: React.FC = () => {
  const isconnected = true;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showProfile, setShowProfile] = useState(false);
 return(
 <div className="bg-slate-200 overflow-hidden shadow rounded-lg border">
 <div className="px-4 py-5 sm:px-6">
     <h3 className="text-lg leading-6 font-medium text-gray-900">
         User Profile
     </h3>
     <p className="mt-1 max-w-2xl text-sm text-gray-500">
         This is some information about the user.
     </p>
 </div>
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
             </dd></div>
             <div className="">
            <div className="flex space-x-2 justify-center mb-4 ml-1 mt-4 mr-1">

                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50">
                    LogOut
                </button>
                <button className="w-full px-12 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" type="submit">
                    Edit
                </button></div></div>
         
     </dl>
 </div>
</div>



);


}
export default profile;