"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        first_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
        role: 'participant',
        nom_organisation: '',
        site_web_organisation: '',
        avatar: null as File | null
    });

    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                avatar: e.target.files![0]
            }));
        }
    };

    const handleVerificationInput = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);

            if (value && index < 3) {
                const nextInput = document.querySelector(`input[name="code-${index + 1}"]`) as HTMLInputElement;
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match');
            return;
        }

        try {
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'avatar' && formData.avatar) {
                    submitData.append('avatar', formData.avatar);
                } else if (key !== 'confirm_password') {
                    submitData.append(key, formData[key as keyof typeof formData]?.toString() || '');
                }
            });

            const response = await axios.post('http://127.0.0.1:8000/api/register', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                setRegisteredEmail(response.data.email);
                setShowVerification(true);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const handleVerifyCode = async () => {
        const code = verificationCode.join('');
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/verify-email', {
                email: registeredEmail,
                code: code
            });
            
            if (response.status === 200) {
                window.location.replace('/sign-in');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Verification failed');
        }
    };

    const handleResendCode = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/resend-verification', {
                email: registeredEmail
            });
            setError('New verification code sent');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to resend code');
        }
        
    };
    
    const closeModel = () => {
        setShowVerification(false);
        window.location.replace('/sign-in');
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            {showVerification && (
                <div className="overflow-y-auto bg-black bg-opacity-50 overflow-x-hidden fixed inset-0 flex justify-center z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative rounded-lg shadow bg-gray-900">
                            <button
                                type="button"
                                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => closeModel()}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="max-w-md mx-auto border mt-20 rounded">
                                <form className="shadow-md px-4 py-6" onSubmit={(e) => { e.preventDefault(); handleVerifyCode(); }}>
                                    <h3 className='mb-2 justify-center ml-4 text-white'>
                                        Your verification code has been sent to your email. Please check your inbox to proceed.
                                    </h3>
                                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                                    <div className="flex justify-center gap-2 mb-6">
                                        {verificationCode.map((digit, index) => (
                                            <input
                                                key={index}
                                                name={`code-${index}`}
                                                className="w-12 h-12 text-center bg-slate-700 border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 text-white"
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleVerificationInput(index, e.target.value)}
                                                required
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Verify
                                        </button>
                                        <button
                                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-4"
                                            type="button"
                                            onClick={handleResendCode}
                                        >
                                            Resend
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="flex justify-center mx-auto mt-5">
                        <div className='flex items-center font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-2xl'>
                            EventMaster
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center mt-6">
                        <Link href="/sign-in" className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
                            sign in
                        </Link>
                        <Link href="/sign-up" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                            sign up
                        </Link>
                    </div>

                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className='m-2 mt-10'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className='m-2 mt-10'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='m-2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='m-2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className='m-2'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    minLength={8}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className='m-2'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirm_password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    minLength={8}
                                    value={formData.confirm_password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='m-2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sign up as</label>
                        <select
                            name="role"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={formData.role}
                            onChange={handleInputChange}
                        >
                            <option value="participant">Participant</option>
                            <option value="organizer">Organizer</option>
                        </select>
                    </div>

                    {formData.role === 'organizer' && (
                        <div className="organizer-fields">
                            <div className='m-2'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization Name</label>
                                <input
                                    type="text"
                                    name="nom_organisation"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    value={formData.nom_organisation}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='m-2'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization Logo</label>
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                />
                            </div>

                            <div className='m-2'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website (Optional)</label>
                                <input
                                    type="url"
                                    name="site_web_organisation"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={formData.site_web_organisation}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full px-12 py-3 m-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                        Create an account
                    </button>

                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 m-2">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="font-medium text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
