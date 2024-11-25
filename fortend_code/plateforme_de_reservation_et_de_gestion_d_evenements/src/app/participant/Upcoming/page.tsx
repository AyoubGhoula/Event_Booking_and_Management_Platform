"use client";
import React from 'react';

const events = [
  { id: 1, title: 'Event 1', date: '2024-11-22' },
  { id: 2, title: 'Event 2', date: '2024-11-22' },
  { id: 3, title: 'Event 3', date: '2024-11-22' },
  { id: 4, title: 'Event 4', date: '2024-11-22' },
  { id: 5, title: 'Event 5', date: '2024-11-22' },
  { id: 1, title: 'Event 77', date: '2024-11-22' },
  { id: 2, title: 'Event 44', date: '2024-11-22' },
  { id: 3, title: 'Event 10', date: '2024-11-22' },
  { id: 4, title: 'Event 17', date: '2024-11-22' },
  { id: 5, title: 'Event 14', date: '2024-11-22' },
  { id: 1, title: 'Event 12', date: '2024-11-22' },
  { id: 2, title: 'Event 88', date: '2024-11-22' },
  { id: 3, title: 'Event 74', date: '2024-11-23' },
  { id: 4, title: 'Event 16', date: '2024-11-23' },
  { id: 5, title: 'Event 12', date: '2024-11-24' },
  { id: 1, title: 'Event 1', date: '2024-11-22' },
  { id: 2, title: 'Event 2', date: '2024-11-22' },
  { id: 3, title: 'Event 3', date: '2024-11-24' },
  { id: 4, title: 'Event 4', date: '2024-11-24' },
  { id: 5, title: 'Event 5', date: '2024-11-24' },
  { id: 1, title: 'Event 77', date: '2024-11-24' },
  { id: 2, title: 'Event 44', date: '2024-11-24' },
  { id: 3, title: 'Event 10', date: '2024-11-24' },
  { id: 4, title: 'Event 17', date: '2024-11-24' },
  { id: 5, title: 'Event 14', date: '2024-11-24' },
  { id: 1, title: 'Event 12', date: '2024-11-24' },
  { id: 2, title: 'Event 88', date: '2024-11-24' },
  { id: 3, title: 'Event 74', date: '2024-11-24' },
  { id: 4, title: 'Event 16', date: '2024-11-24' },
  { id: 5, title: 'Event 12', date: '2024-11-24' },
];

const groupEventsByDate = (events:any) => {
  return events.reduce((acc:any, event:any) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});
};

const EventList = () => {
  const groupedEvents = groupEventsByDate(events);

  return (
    <div className="space-y-6">
      {Object.keys(groupedEvents).map((date) => (
        <div key={date} className=" space-y-4">
          {/* Date header */}
          <div className=" sticky top-0 text-xl font-semibold text-gray-800">{date}</div>

          {/* Event List for the specific date */}
          <div className="flex flex-wrap gap-4">
            {groupedEvents[date].map((event:any) => (
              <div key={event.id} className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3">
                <h2 className="text-lg font-medium text-gray-700">{event.title}</h2>
                <p className="text-sm text-gray-500">Date: {event.date}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
