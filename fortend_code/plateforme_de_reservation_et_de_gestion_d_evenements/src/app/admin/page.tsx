"use client";
import React, { useState, useRef, useEffect } from'react';
import Navbar from "./components/Navbar";
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';
import axios from 'axios';


const admin=()=>{
    useEffect(() => {
        window.location.href = '/admin/Dashboard';
        });



}
 export default admin ;
