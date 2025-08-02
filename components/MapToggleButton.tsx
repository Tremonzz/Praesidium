'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface MapToggleButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

const MapToggleButton = ({ onClick, isVisible }: MapToggleButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`fixed top-4 left-4 z-30 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-900 hover:bg-gray-800 rounded-full w-16 h-16 p-0 flex items-center justify-center transform ${
        isVisible ? 'translate-x-0' : '-translate-x-20'
      }`}
    >
      <Image
        src="/protezione-civile-logo.png"
        alt="Protezione Civile"
        width={40}
        height={40}
        className="object-contain"
      />
    </Button>
  );
};

export default MapToggleButton;