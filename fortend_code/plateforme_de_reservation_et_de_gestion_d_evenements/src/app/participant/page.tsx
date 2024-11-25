"use client";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Participant = () => {

  useEffect(() => {
    // Redirect to Discover_Events when /participant is visited
    window.location.href='/participant/Discover_Events';
  }, []);

  return null; // Optional: Render a loading spinner or message if necessary
};

export default Participant;
