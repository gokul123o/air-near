import { NextResponse, NextRequest } from 'next/server';
import * as fs from 'fs';
import path from 'path';

interface Airport {
  iata: string;
  name: string;
  lat: number;
  lon: number;
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const toRad = (angle: number) => (angle * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: 'latitude and longitude are required' },
      { status: 400 }
    );
  }

  // Read airport data
  const airportsFilePath = path.join(process.cwd(), 'airports.json');
  const airportsJson = fs.readFileSync(airportsFilePath, 'utf8');
  const airportsData = JSON.parse(airportsJson);
  const airports: Airport[] = Object.values(airportsData);

  // Filter out invalid entries
  const validAirports = airports.filter(
    (airport) =>
      typeof airport.lat === 'number' &&
      typeof airport.lon === 'number' &&
      !isNaN(airport.lat) &&
      !isNaN(airport.lon)
  );

  let nearestAirport: Airport | null = null;
  let minDistance = Infinity;

  validAirports.forEach((airport) => {
    const distance = haversine(
      parseFloat(latitude),
      parseFloat(longitude),
      airport.lat,
      airport.lon
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestAirport = airport;
    }
  });

  if (!nearestAirport) {
    return NextResponse.json(
      { error: 'No valid airport found near the location' },
      { status: 404 }
    );
  }
const response= NextResponse.json({
    nearestAirport,
    distance_km: parseFloat(minDistance.toFixed(2)),
  });

// Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}

// Handle OPTIONS method for preflight requests
export function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}
