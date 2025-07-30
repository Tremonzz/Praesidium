'use client';

import { useState, useEffect } from 'react';
import EmergencyDialog from './EmergencyDialog';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface Emergency {
  id: number;
  name: string;
  location: any;
  radius: number;
  emergency_type_id: number;
  priority: string;
  start: string | null;
  end: string | null;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Carica le emergenze
  const fetchEmergencies = async () => {
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:dvORzN7E/emergency');
      const data = await response.json();
      setEmergencies(data);
    } catch (error) {
      console.error('Errore nel caricamento delle emergenze:', error);
    }
  };

  // Crea nuova emergenza
  const createEmergency = async (emergencyData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:dvORzN7E/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emergencyData),
      });
      
      if (response.ok) {
        await fetchEmergencies(); // Ricarica la lista
      } else {
        console.error('Errore nella creazione dell\'emergenza');
      }
    } catch (error) {
      console.error('Errore nella creazione dell\'emergenza:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEmergencies();
    }
  }, [isOpen]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getEmergencyTypeName = (typeId: number) => {
    switch (typeId) {
      case 1: return 'Incendio';
      case 2: return 'Terremoto';
      case 3: return 'Alluvione';
      case 4: return 'Incidente';
      default: return 'Sconosciuto';
    }
  };

  return (
    <>
      {/* Pulsante per aprire la sidebar */}
      <button
        onClick={onToggle}
        className="fixed top-6 left-6 z-[9999] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl"
        style={{ 
          backgroundColor: '#606c38',
          boxShadow: '0 10px 25px rgba(96, 108, 56, 0.3)'
        }}
      >
        <svg
          className="w-6 h-6"
          style={{ color: '#fefae0' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay scuro quando la sidebar è aperta */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] transition-opacity duration-300"
          style={{ backgroundColor: 'rgba(40, 54, 24, 0.6)' }}
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-[9999] transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          backgroundColor: '#283618',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="w-96 h-full flex flex-col">
          {/* Header della sidebar */}
          <div className="p-6 border-b" style={{ borderColor: '#606c38' }}>
            <div className="flex items-center justify-between">
              <h1
                className="text-3xl font-bold"
                style={{ color: '#fefae0' }}
              >
                Praesidium
              </h1>
              <button
                onClick={onToggle}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                <svg className="w-6 h-6" style={{ color: '#fefae0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenuto della sidebar */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Pulsante per creare nuova emergenza */}
            <button
              onClick={() => setIsDialogOpen(true)}
              className="w-full mb-6 p-4 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ 
                backgroundColor: '#606c38',
                boxShadow: '0 4px 15px rgba(96, 108, 56, 0.3)'
              }}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Nuova Emergenza</span>
              </div>
            </button>

            {/* Lista emergenze */}
            <div>
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#fefae0' }}
              >
                Emergenze Attive ({emergencies.length})
              </h2>
              
              <div className="space-y-3">
                {emergencies.map((emergency) => (
                  <div
                    key={emergency.id}
                    className="p-4 rounded-xl border transition-all duration-300 hover:scale-105"
                    style={{ 
                      backgroundColor: '#fefae0',
                      borderColor: '#606c38'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 
                          className="font-semibold text-lg mb-1"
                          style={{ color: '#283618' }}
                        >
                          {emergency.name}
                        </h3>
                        <p 
                          className="text-sm mb-2"
                          style={{ color: '#606c38' }}
                        >
                          {getEmergencyTypeName(emergency.emergency_type_id)}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: getPriorityColor(emergency.priority) }}
                          >
                            {emergency.priority.toUpperCase()}
                          </span>
                          <span 
                            className="text-xs"
                            style={{ color: '#606c38' }}
                          >
                            Raggio: {emergency.radius}m
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {emergencies.length === 0 && (
                  <div 
                    className="p-6 text-center rounded-xl"
                    style={{ backgroundColor: '#fefae0' }}
                  >
                    <p style={{ color: '#606c38' }}>
                      Nessuna emergenza attiva
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog per nuova emergenza */}
      <EmergencyDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={createEmergency}
      />
    </>
  );
} 