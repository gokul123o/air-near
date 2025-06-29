'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, country }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful! Redirecting to sign in...');
        setTimeout(() => {
          router.push('/signin'); // ✅ redirect
        }, 2000);
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      setMessage('An error occurred during registration.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2">
            Name
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="country" className="block text-sm font-bold text-gray-700 mb-2">
            Country
          </label>
          <input
            id="country"
            type="text"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none"
        >
          Register
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
