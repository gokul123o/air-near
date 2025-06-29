"use client";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
        <p className="text-base text-gray-700">
            Welcome to Nearest Airport API — your lightweight, reliable service to quickly find the closest airport to any location on Earth.
            Whether you're building a travel planning app, logistics solution, or just want to integrate real-time geographic insights, our API is designed to be fast, developer-friendly, and easy to integrate.
        </p>
        <h3 className="text-3xl font-bold text-center mb-8">How to Use it</h3>
        <p className="text-base text-gray-700">
            Welcome to Nearest Airport API — your lightweight, reliable service to quickly find the closest airport to any location on Earth.
            Whether you're building a travel planning app, logistics solution, or just want to integrate real-time geographic insights, our API is designed to be fast, developer-friendly, and easy to integrate.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
