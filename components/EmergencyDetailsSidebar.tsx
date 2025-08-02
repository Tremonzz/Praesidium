'use client';

import { X, MapPin, Clock, AlertTriangle, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

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

interface EmergencyDetailsSidebarProps {
  emergency: Emergency | null;
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyDetailsSidebar = ({ emergency, isOpen, onClose }: EmergencyDetailsSidebarProps) => {
  if (!emergency) return null;

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

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRadius = (radiusInMeters: number) => {
    const radiusInKm = radiusInMeters / 1000;
    return radiusInKm.toFixed(1);
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
        className={`fixed right-4 top-4 bottom-4 w-80 bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out rounded-xl ${
          isOpen ? 'translate-x-0' : 'translate-x-96'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 text-white rounded-t-xl">
          <div className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-full animate-pulse"
              style={{ backgroundColor: `#${emergency.priority_color}` }}
            ></div>
            <h2 className="text-lg font-semibold">Dettagli Emergenza</h2>
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
        <div 
          className="flex flex-col overflow-y-auto custom-scrollbar" 
          style={{ 
            height: 'calc(100% - 73px)',
          }}
        >
          <div className="p-4 space-y-4">
            {/* Emergency Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Informazioni Emergenza
              </h3>
              
              <Card className="p-4 bg-gray-800 border-gray-700">
                <div className="space-y-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{emergency.name}</p>
                    <p className="text-sm text-gray-400">{emergency.type}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Priorità</span>
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded"
                      style={{ 
                        backgroundColor: `#${emergency.priority_color}20`,
                        color: `#${emergency.priority_color}`
                      }}
                    >
                      {emergency.priority}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Raggio</span>
                    <span className="text-sm text-white">{formatRadius(emergency.radius)} km</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Localizzazione
              </h3>
              
              <Card className="p-4 bg-gray-800 border-gray-700">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-white">{emergency.location_name || 'Posizione non specificata'}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Lat: {emergency.location.data.lat.toFixed(6)}<br />
                    Lng: {emergency.location.data.lng.toFixed(6)}
                  </div>
                </div>
              </Card>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Timeline
              </h3>
              
              <Card className="p-4 bg-gray-800 border-gray-700">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Creata</span>
                    </div>
                    <span className="text-sm text-white">{formatTimeAgo(emergency.created_at)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Inizio</span>
                    <span className="text-sm text-white">{formatDate(emergency.start)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Fine prevista</span>
                    <span className="text-sm text-white">{formatDate(emergency.end)}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Azioni
              </h3>
              
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start space-x-2 bg-destructive hover:bg-destructive/90"
                  size="lg"
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span>Aggiorna Stato</span>
                </Button>

                <Button 
                  variant="outline"
                  className="w-full justify-start space-x-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  size="lg"
                >
                  <Users className="h-5 w-5" />
                  <span>Assegna Squadra</span>
                </Button>

                <Button 
                  variant="outline"
                  className="w-full justify-start space-x-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  size="lg"
                >
                  <Phone className="h-5 w-5" />
                  <span>Contatta Responsabile</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergencyDetailsSidebar; 