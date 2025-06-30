
import { useEffect, useRef } from 'react';
import { ScreenerFilters } from './ScreenerDashboard';

interface MapViewProps {
  filters: ScreenerFilters;
}

export const MapView = ({ filters }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This would integrate with Google Maps API
    // For now, we'll show a placeholder
    console.log('Map view initialized with filters:', filters);
  }, [filters]);

  return (
    <div className="relative w-full h-96 bg-slate-700 rounded-lg overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-full flex items-center justify-center text-slate-400"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-600 flex items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-lg font-medium mb-2">Bản đồ Bất động sản</p>
          <p className="text-sm">Google Maps integration sẽ được hiển thị ở đây</p>
        </div>
      </div>
      
      {/* Mock markers */}
      <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
        15 properties
      </div>
      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
        AR View
      </div>
    </div>
  );
};
