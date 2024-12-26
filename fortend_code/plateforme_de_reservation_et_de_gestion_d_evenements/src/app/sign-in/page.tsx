"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignIn() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
    const [registeredEmail, setRegisteredEmail] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
            
            if (response.data.verified === false) {
                setRegisteredEmail(formData.email);
                setShowVerification(true);
                // Send new verification code
                await axios.post('http://127.0.0.1:8000/api/resend-verification', {
                    email: formData.email
                });
                return;
            }

            if (response.data.access_token) {
    
                localStorage.setItem('access_token', response.data.access_token);
                // Redirect based on user role
                switch (response.data.role) {
                    case 'participant':
                        window.location.href = '/participant';
                        break;
                    case 'organizer':
                        window.location.href = '/Organizer';
                        break;
                    case 'admin':
                        window.location.href = '/admin';
                        break;
                    default:
                        window.location.href = '/';
                }
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
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
                setShowVerification(false);
                // Try logging in again automatically
                const loginResponse = await axios.post('http://127.0.0.1:8000/api/login', formData);
                if (loginResponse.data.access_token) {
                    localStorage.setItem('access_token', loginResponse.data.access_token);
                    // Redirect based on user role after verification
                    switch (loginResponse.data.role) {
                        case 'participant':
                            window.location.href = '/participant';
                            break;
                        case 'organizer':
                            window.location.href = '/Organizer';
                            break;
                        case 'admin':
                            window.location.href = '/admin';
                            break;
                        default:
                            window.location.href = '/';
                    }
                }
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

    return (
        <section className="bg-white dark:bg-gray-900">
            {showVerification && (
                <div className="overflow-y-auto bg-black bg-opacity-50 overflow-x-hidden fixed inset-0 flex justify-center z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative rounded-lg shadow bg-gray-900">
                            <button
                                type="button"
                                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => setShowVerification(false)}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="max-w-md mx-auto border mt-20 rounded">
                                <form className="shadow-md px-4 py-6" onSubmit={(e) => { e.preventDefault(); handleVerifyCode(); }}>
                                    <h3 className='mb-2 justify-center ml-4 text-white'>
                                        Your email is not verified. Please enter the verification code sent to your email.
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
                                            Resend Code
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
                    <div className="flex justify-center mx-auto">
                        <div className='flex items-center font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-2xl'>
                            EventMaster
                        </div>
                    </div>

                    <div className="flex items-center justify-center mt-6">
                        <Link href="/sign-in" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                            sign in
                        </Link>
                        <Link href="/sign-up" className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
                            sign up
                        </Link>
                    </div>

                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <input
                            type="email"
                            name="email"
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input
                            type="password"
                            name="password"
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Sign in
                        </button>

                        <div className="mt-6 text-center">
                            <Link href="/sign-up" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                Don't have an account yet? Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
