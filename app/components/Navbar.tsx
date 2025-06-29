'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [showDocs, setShowDocs] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="text-blue-400 text-2xl">{''}</div>
        <span className="font-bold text-blue-600 text-xl">Air-Near</span>
      </div>

      {/* Nav Items */}
      <div className="flex items-center space-x-6 text-sm text-blue-800">
        {/* Auth Buttons */}
        <a href="/signin" className="border border-blue-500 text-blue-600 px-3 py-1 rounded hover:bg-blue-50">Sign In</a>
        <a href="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Register</a>
      </div>
    </nav>
  );
}
