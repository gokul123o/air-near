"use client";

import { useState, useEffect, FormEvent } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

interface Airport {
  iata: string;
  name: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [nearestAirport, setNearestAirport] = useState<Airport | null>(null);
  const [locationFetched, setLocationFetched] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [apiKey, setApiKey] = useState<string>("");

  // Fetch user session + API key
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;
      setUser(currentUser);

      if (currentUser) {
        const { data, error } = await supabase
          .from("users")
          .select("api_key")
          .eq("id", currentUser.id)
          .single();

        if (data?.api_key) setApiKey(data.api_key);
      }
    };

    getSession();
  }, []);

  // Fetch geolocation
  useEffect(() => {
    if (!locationFetched && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          setLocationFetched(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Error getting location. Please allow permission.");
          setLocationFetched(true);
        }
      );
    }
  }, [locationFetched]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `/api/nearest-airport?latitude=${latitude}&longitude=${longitude}`
      );
      const data = await response.json();

      if (response.ok) {
        setNearestAirport(data.nearestAirport);
      } else {
        setNearestAirport(null);
        console.error("Error fetching nearest airport:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setNearestAirport(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Find Your Nearest Airport</h1>

        {/* API Key Section */}
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-2">Your API Key</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={user ? apiKey : "********************"}
              className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-700 font-mono"
            />
            {user && (
              <button
                onClick={() => navigator.clipboard.writeText(apiKey)}
                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
              >
                Copy
              </button>
            )}
          </div>
          {!user && (
            <p className="text-sm text-gray-500 mt-2">Sign in to view your API key.</p>
          )}
        </div>

        {/* Location Form (only for logged in users) */}
        {user ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
                <input
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-white shadow-sm"
                  placeholder="Enter latitude"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-white shadow-sm"
                  placeholder="Enter longitude"
                />
              </div>

              <button
                type="submit"
                disabled={!latitude || !longitude}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700"
              >
                Find Nearest Airport
              </button>
            </form>

            {nearestAirport && (
              <div className="mt-8 p-4 bg-gray-50 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Nearest Airport</h2>
                <p className="text-gray-700"><span className="font-medium">Name:</span> {nearestAirport.name}</p>
                <p className="text-gray-700"><span className="font-medium">IATA:</span> {nearestAirport.iata}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            Please sign in to use the location search.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
