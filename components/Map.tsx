'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Emergency {
  id: number;
  created_at: number;
  name: string;
  radius: number;
  emergency_type_id: number;
  emergency_priority_id: number;
  start: number;
  end: number;
  type: string;
  priority: string;
  priority_color: string;
  location: {
    type: string;
    data: {
      lng: number;
      lat: number;
    };
  };
  location_name?: string;
}

interface MapProps {
  emergencies: Emergency[];
}

const Map = ({ emergencies }: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize map centered on Italy
      mapRef.current = L.map(mapContainerRef.current, {
        center: [41.9028, 12.4964], // Rome coordinates
        zoom: 6,
        zoomControl: false,
        attributionControl: true,
      });

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapContainerRef} 
      className="absolute inset-0 z-0"
      style={{ height: '100vh', width: '100%' }}
    />
  );
};

export default Map;