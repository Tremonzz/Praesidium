'use client';

import { X, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onEmergencySelect?: (emergency: Emergency) => void;
  onNewEmergency?: () => void;
}

const Sidebar = ({ isOpen, onClose, onEmergencySelect, onNewEmergency }: SidebarProps) => {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:dvORzN7E/active_emergency');
        const data = await response.json();
        setEmergencies(data);
      } catch (error) {
        console.error('Errore nel caricamento delle emergenze:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchEmergencies();
    }
  }, [isOpen]);

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m fa`;
    }
    return `${minutes}m fa`;
  };

  const handleEmergencyClick = (emergency: Emergency) => {
    if (onEmergencySelect) {
      onEmergencySelect(emergency);
    }
  };

  const handleNewEmergency = () => {
    if (onNewEmergency) {
      onNewEmergency();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed left-4 top-4 bottom-4 w-80 bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out rounded-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-96'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 text-white rounded-t-xl">
          <div className="flex items-center space-x-2">
            <Image
              src="/protezione-civile-logo.png"
              alt="Protezione Civile"
              width={24}
              height={24}
              className="object-contain"
            />
            <h2 className="text-lg font-semibold">Praesidium</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col sidebar-scroll overflow-y-auto" style={{ height: 'calc(100% - 73px)' }}>
          {/* Quick Actions */}
          <div className="p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
              Azioni Rapide
            </h3>
            
            <Button 
              className="w-full justify-start space-x-2 bg-destructive hover:bg-destructive/90"
              size="lg"
              onClick={handleNewEmergency}
            >
              <Plus className="h-5 w-5" />
              <span>Nuova Emergenza</span>
            </Button>
          </div>

          {/* Active Emergencies */}
          <div className="p-4 space-y-3 border-t border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
              Emergenze Attive
            </h3>
            
            {loading ? (
              <div className="text-center py-4">
                <p className="text-gray-400">Caricamento emergenze...</p>
              </div>
            ) : emergencies.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-400">Nessuna emergenza attiva</p>
              </div>
            ) : (
              emergencies.map((emergency) => (
                <Card 
                  key={emergency.id} 
                  className={`p-3 bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors border-l-4`}
                  style={{ borderLeftColor: `#${emergency.priority_color}` }}
                  onClick={() => handleEmergencyClick(emergency)}
                >
                  <div className="flex items-start space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full mt-1 flex-shrink-0 animate-pulse"
                      style={{ backgroundColor: `#${emergency.priority_color}` }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{emergency.name}</p>
                      <p className="text-xs text-gray-400">{emergency.location_name || 'Posizione non specificata'}</p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(emergency.created_at)}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">{emergency.priority}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;