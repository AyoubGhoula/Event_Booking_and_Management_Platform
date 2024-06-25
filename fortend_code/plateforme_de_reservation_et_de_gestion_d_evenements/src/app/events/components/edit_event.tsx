import React, { useState, useRef ,useEffect} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
interface EditEventProps {
  eve: any;
  onComplete: () => void;
}

const EditEvent: React.FC<EditEventProps> = ({ eve, onComplete }) => {
  const [editEvent, setEditEvent] = useState(false);
  const [idEvent, setIdEvent] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem('token');

  const [eventData, setEventData] = useState({
    name: eve.name,
    start_datetime: eve.start_datetime,
    lient_event: eve.lient_event,
    prix: eve.prix,
    nm_max: eve.nm_max,
    nm_participer: eve.nm_participer,
    gender: eve.gender,
  });

  useEffect(() => {
  setEventData({
    name: eve.name,
    start_datetime: eve.start_datetime,
    lient_event: eve.lient_event,
    prix: eve.prix,
    nm_max: eve.nm_max,
    nm_participer: eve.nm_participer,
    gender: eve.gender,
  });
},[editEvent]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEditEvent = (id: number) => {
    setEditEvent(!editEvent);
    setIdEvent(id);
    console.log('id:', id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/editEvents/${idEvent}`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Event updated successfully');
      setEditEvent(!editEvent);
      onComplete();
    } catch (error: any) {
      if (error.response) {
        console.error('Error updating event:', error.response.data);
        alert('Failed to update event: ' + error.response.data.message);
      } else {
        console.error('Error updating event:', error);
        alert('Failed to update event');
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => toggleEditEvent(eve.id)}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </button>
      {editEvent && (
        <div
          id="crud-modal"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          ref={dropdownRef}
        >
          <div className="relative p-4 w-200 max-h-full ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Event</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setEditEvent(false);
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
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
              </div>
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={eventData.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type event name"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input
                      type="number"
                      name="prix"
                      id="prix"
                      value={eventData.prix}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$0"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                    <select
                      id="category"
                      name="gender"
                      value={eventData.gender}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="-">-</option>
                      <option value="H">Homme</option>
                      <option value="F">Femme</option>
                    </select>
                  </div>
                  <div className="relative max-w-sm col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                    <input
                      type="datetime-local"
                      name="start_datetime"
                      value={eventData.start_datetime}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Select date"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Participation</label>
                    <input
                      type="number"
                      name="nm_max"
                      id="nm_max"
                      value={eventData.nm_max}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="1"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lien</label>
                    <input
                      type="text"
                      name="lient_event"
                      id="lient_event"
                      value={eventData.lient_event}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type event lien"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Description</label>
                    <textarea
                      id="description"
                      name="description"
                    //   value={eventData.description}
                    //   onChange={handleChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write event description here"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="#ffffff"
                    viewBox="0 0 1920 1920"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M960 1807.059c-467.125 0-847.059-379.934-847.059-847.059 0-467.125 379.934-847.059 847.059-847.059 467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059M960 0C430.645 0 0 430.645 0 960s430.645 960 960 960 960-430.645 960-960S1489.355 0 960 0M854.344 1157.975 583.059 886.69l-79.85 79.85 351.135 351.133L1454.4 717.617l-79.85-79.85-520.206 520.208Z"
                        fillRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                  Complete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEvent;
































































// "use client";
// import React, { useState, useRef, useEffect } from'react';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';

// const edit_event=({eve ,onComplete}:any) =>{
// const [edit_event, setEdit_event] = useState(false);
// const [id_event , setId_event] = useState(0);
// const dropdownRef = useRef<HTMLDivElement>(null);
// const token = localStorage.getItem('token');


// const [eventData, setEventData] = useState({
//     name: eve.name,
//     start_datetime: eve.start_datetime ,
//     lient_event: eve.lient_event ,
//     prix: eve.prix ,
//     nm_max: eve.nm_max ,
//     nm_participer: eve.nm_participer ,
//     gender: eve.gender ,
    
//   });

// const handleChange = (e:any) => {
//     const { name, value } = e.target;
//     setEventData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };





// const TargetpopupEvent=(id: React.SetStateAction<number>)=>{
//     setEdit_event(!edit_event);
//     setId_event(id);
//     console.log("id:",id)

// }



// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post(`http://localhost:8000/api/editEvents/${id_event}`, eventData, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//           }); 
//       alert('Event updated successfully');
//       setEdit_event(!edit_event);
//       onComplete();
//     } catch (error) {
//       console.error('Error updating event:', error);
//       alert('Failed to update event');
//     }
//   };



// return(
// <div>
//     <button  onClick={()=>TargetpopupEvent(eve.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
// <div>

// {edit_event &&(
//     <div id="crud-modal"  aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center z-50  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" ref={dropdownRef}>
//     <div className="relative p-4 w-200 max-h-full ">
//         <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

//             <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     Edit Event
//                 </h3>
//                 <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>{setEdit_event(false);}}>
//                     <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
//                     </svg>
//                     <span className="sr-only">Close modal</span>
//                 </button>
//             </div>
//             <form className="p-4 md:p-5" onSubmit={handleSubmit} >
//                 <div className="grid gap-4 mb-4 grid-cols-2">
//                     <div className="col-span-2">
//                         <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
//                         <input type="text" name="name" id="name" value={eventData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type event name" />
//                     </div>
//                     <div className="col-span-2 sm:col-span-1">
//                         <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
//                         <input type="number" name="prix" id="prix" value={eventData.prix}  onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$0" />
//                     </div>
//                     <div className="col-span-2 sm:col-span-1">
//                         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">gender</label>
//                         <select id="category" name="gender" value={eventData.gender} onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
//                             <option value="-">-</option>
//                             <option value="H">homme</option>
//                             <option value="F">famme</option>
//                         </select>
//                     </div>
//                     <div className="relative max-w-sm col-span-2 sm:col-span-1">
//                     <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">date</label>
//                     <input  type="datetime-local" name="start_datetime" value={eventData.start_datetime} onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Select date"/>
//                     </div>
//                     <div className="col-span-2 sm:col-span-1">
//                         <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">number of participation</label>
//                         <input type="number" name="nm_max" id="nm_max" value={eventData.nm_max} onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1" />
//                     </div>
//                     <div className=" col-span-2">
//                         <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">lien</label>
//                         <input type="text" name="lient_event" id="lient_event" value={eventData.lient_event} onChange={handleChange}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type event lien" />
//                     </div>
//                     <div className="col-span-2">
//                         <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Description</label>
//                         <textarea id="description"  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write event description here"></textarea>                    
//                     </div>
//                 </div>
//                 <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                      <svg className="me-1 -ms-1 w-5 h-5" fill="#ffffff" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M960 1807.059c-467.125 0-847.059-379.934-847.059-847.059 0-467.125 379.934-847.059 847.059-847.059 467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059M960 0C430.645 0 0 430.645 0 960s430.645 960 960 960 960-430.645 960-960S1489.355 0 960 0M854.344 1157.975 583.059 886.69l-79.85 79.85 351.135 351.133L1454.4 717.617l-79.85-79.85-520.206 520.208Z" fill-rule="evenodd"></path> </g></svg>
//                      Complete
//                 </button>
//             </form>


//         </div>
//     </div>
// </div>


// )}

// </div>
    


// </div>

// );




// }
//  export default edit_event ;

