'use client';

import { X, MapPin, AlertTriangle, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface NewEmergencyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (emergencyData: any) => void;
}

const NewEmergencyDialog = ({ isOpen, onClose, onSubmit }: NewEmergencyDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    priority: '',
    location_name: '',
    latitude: '',
    longitude: '',
    radius: '',
    description: '',
    start_date: '',
    end_date: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-gray-900 shadow-2xl rounded-xl border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 text-white rounded-t-xl">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <h2 className="text-lg font-semibold">Nuova Emergenza</h2>
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
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome Emergenza */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Nome Emergenza *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Es. Incendio Monte Catria"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Tipo Emergenza */}
              <div className="space-y-2">
                <Label htmlFor="type" className="text-white">Tipo Emergenza *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Seleziona tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="incendio">Incendio</SelectItem>
                    <SelectItem value="alluvione">Alluvione</SelectItem>
                    <SelectItem value="terremoto">Terremoto</SelectItem>
                    <SelectItem value="emergenza_medica">Emergenza Medica</SelectItem>
                    <SelectItem value="altro">Altro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priorità */}
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-white">Priorità *</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Seleziona priorità" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="bassa">Bassa</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Raggio */}
              <div className="space-y-2">
                <Label htmlFor="radius" className="text-white">Raggio (metri) *</Label>
                <Input
                  id="radius"
                  type="number"
                  value={formData.radius}
                  onChange={(e) => handleInputChange('radius', e.target.value)}
                  placeholder="Es. 1000"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Nome Località */}
              <div className="space-y-2">
                <Label htmlFor="location_name" className="text-white">Nome Località *</Label>
                <Input
                  id="location_name"
                  value={formData.location_name}
                  onChange={(e) => handleInputChange('location_name', e.target.value)}
                  placeholder="Es. Monte Catria, Pesaro"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Coordinate */}
              <div className="space-y-2">
                <Label className="text-white">Coordinate *</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange('latitude', e.target.value)}
                    placeholder="Latitudine"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                  <Input
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange('longitude', e.target.value)}
                    placeholder="Longitudine"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label className="text-white">Periodo Emergenza *</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="datetime-local"
                    value={formData.start_date}
                    onChange={(e) => handleInputChange('start_date', e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                  <Input
                    type="datetime-local"
                    value={formData.end_date}
                    onChange={(e) => handleInputChange('end_date', e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Descrizione */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Descrizione</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descrizione dettagliata dell'emergenza..."
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
                rows={4}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Annulla
              </Button>
              <Button
                type="submit"
                className="bg-destructive hover:bg-destructive/90"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Crea Emergenza
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewEmergencyDialog; 