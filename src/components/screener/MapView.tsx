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
      {/* Google Maps Embed mới */}
      <iframe
        src="https://www.google.com/maps?q=số+14+ngách+66+lê+trọng+tấn,+thanh+xuân,+hà+nội&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '100%', minWidth: '100%' }}
        allowFullScreen
        loading="lazy"
        title="Google Map Bất động sản"
      />
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
