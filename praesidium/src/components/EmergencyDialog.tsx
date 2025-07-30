'use client';

import { useState } from 'react';

interface EmergencyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (emergency: any) => void;
}

export default function EmergencyDialog({ isOpen, onClose, onSubmit }: EmergencyDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    location: null,
    radius: 0,
    emergency_type_id: 0,
    priority: 'medium',
    start: null,
    end: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      location: null,
      radius: 0,
      emergency_type_id: 0,
      priority: 'medium',
      start: null,
      end: null
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
        style={{ backgroundColor: '#fefae0' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-2xl font-bold"
            style={{ color: '#283618' }}
          >
            Nuova Emergenza
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#283618' }}>
              Nome Emergenza
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ backgroundColor: '#fefae0', borderColor: '#606c38' }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#283618' }}>
              Tipo Emergenza
            </label>
            <select
              value={formData.emergency_type_id}
              onChange={(e) => setFormData({...formData, emergency_type_id: parseInt(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ backgroundColor: '#fefae0', borderColor: '#606c38' }}
              required
            >
              <option value={0}>Seleziona tipo</option>
              <option value={1}>Incendio</option>
              <option value={2}>Terremoto</option>
              <option value={3}>Alluvione</option>
              <option value={4}>Incidente</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#283618' }}>
              Priorità
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ backgroundColor: '#fefae0', borderColor: '#606c38' }}
              required
            >
              <option value="low">Bassa</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="critical">Critica</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#283618' }}>
              Raggio (metri)
            </label>
            <input
              type="number"
              value={formData.radius}
              onChange={(e) => setFormData({...formData, radius: parseInt(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ backgroundColor: '#fefae0', borderColor: '#606c38' }}
              min="0"
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium transition-colors hover:bg-gray-100"
              style={{ borderColor: '#606c38', color: '#606c38' }}
            >
              Annulla
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg font-medium text-white transition-colors"
              style={{ backgroundColor: '#606c38' }}
            >
              Crea Emergenza
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 