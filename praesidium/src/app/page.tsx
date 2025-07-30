'use client';

import { useState } from 'react';
import Map from '@/components/Map';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full h-screen relative">
      <Map />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
    </div>
  );
}
