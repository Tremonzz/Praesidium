'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MapToggleButton from '@/components/MapToggleButton';
import Sidebar from '@/components/Sidebar';
import EmergencyDetailsSidebar from '@/components/EmergencyDetailsSidebar';
import NewEmergencyDialog from '@/components/NewEmergencyDialog';

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Caricamento mappa...</p>
      </div>
    </div>
  ),
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

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [detailsSidebarOpen, setDetailsSidebarOpen] = useState(false);
  const [newEmergencyDialogOpen, setNewEmergencyDialogOpen] = useState(false);
  const [lastSync, setLastSync] = useState<string>('');

  // Fetch emergencies on component mount
  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:dvORzN7E/active_emergency');
        const data = await response.json();
        setEmergencies(data);
        setLastSync(new Date().toLocaleTimeString('it-IT'));
      } catch (error) {
        console.error('Errore nel caricamento delle emergenze:', error);
      }
    };

    fetchEmergencies();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleEmergencySelect = (emergency: Emergency) => {
    setSelectedEmergency(emergency);
    setDetailsSidebarOpen(true);
  };

  const closeDetailsSidebar = () => {
    setDetailsSidebarOpen(false);
    setSelectedEmergency(null);
  };

  const handleNewEmergency = () => {
    setNewEmergencyDialogOpen(true);
  };

  const closeNewEmergencyDialog = () => {
    setNewEmergencyDialogOpen(false);
  };

  const handleSubmitNewEmergency = (emergencyData: any) => {
    // Qui implementeremo la logica per inviare i dati all'API
    console.log('Nuova emergenza:', emergencyData);
    // Per ora solo chiudiamo il dialog
    setNewEmergencyDialogOpen(false);
  };

  return (
    <main className="relative h-screen overflow-hidden">
      {/* Map Background */}
      <Map emergencies={emergencies} />
      
      {/* Toggle Button */}
      <MapToggleButton onClick={toggleSidebar} isVisible={!sidebarOpen} />
      
      {/* Main Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
        onEmergencySelect={handleEmergencySelect}
        onNewEmergency={handleNewEmergency}
      />
      
      {/* Emergency Details Sidebar */}
      <EmergencyDetailsSidebar
        emergency={selectedEmergency}
        isOpen={detailsSidebarOpen}
        onClose={closeDetailsSidebar}
      />

      {/* New Emergency Dialog */}
      <NewEmergencyDialog
        isOpen={newEmergencyDialogOpen}
        onClose={closeNewEmergencyDialog}
        onSubmit={handleSubmitNewEmergency}
      />
      
      {/* Status Bar */}
      <div className="fixed bottom-4 right-4 z-30 bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-gray-700">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Sistema Operativo</span>
          </div>
          <div className="text-gray-500">|</div>
          <div className="text-gray-300">
            Emergenze: {emergencies.length}
          </div>
          <div className="text-gray-500">|</div>
          <div className="text-gray-300">
            Ultima sincronizzazione: {lastSync}
          </div>
        </div>
      </div>
    </main>
  );
}