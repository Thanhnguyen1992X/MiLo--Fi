
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MarketTabs } from './MarketTabs';
import { FilterPanel } from './FilterPanel';
import { ResultsTable } from './ResultsTable';
import { MapView } from './MapView';
import { VoiceControls } from './VoiceControls';
import { AnalysisPanel } from './AnalysisPanel';
import { Search, Filter, Map, Mic, BarChart3 } from 'lucide-react';

export type MarketType = 'stocks' | 'forex' | 'crypto' | 'real-estate';

export interface ScreenerFilters {
  priceRange: [number, number];
  volume?: number;
  marketCap?: string;
  sector?: string;
  location?: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: [number, number];
  yearBuilt?: [number, number];
}

export const ScreenerDashboard = () => {
  const [selectedMarket, setSelectedMarket] = useState<MarketType>('stocks');
  const [filters, setFilters] = useState<ScreenerFilters>({
    priceRange: [0, 1000000],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock results would be set here
    }, 1000);
  };

  const handleFilterChange = (newFilters: Partial<ScreenerFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Market Screener</h1>
            <p className="text-slate-300">Sàng lọc và phân tích thị trường tài chính</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                className="pl-10 w-64 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceToggle}
              className={`${isVoiceActive ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-800'} border-slate-700`}
            >
              <Mic className="w-4 h-4 mr-2" />
              Voice
            </Button>
            
            {selectedMarket === 'real-estate' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMap(!showMap)}
                className="bg-slate-800 border-slate-700"
              >
                <Map className="w-4 h-4 mr-2" />
                {showMap ? 'Hide Map' : 'Show Map'}
              </Button>
            )}
          </div>
        </div>

        {/* Market Selection Tabs */}
        <MarketTabs 
          selectedMarket={selectedMarket} 
          onMarketChange={setSelectedMarket} 
        />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              selectedMarket={selectedMarket}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Map View for Real Estate */}
            {selectedMarket === 'real-estate' && showMap && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Map className="w-5 h-5" />
                    Bản đồ Bất động sản
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MapView filters={filters} />
                </CardContent>
              </Card>
            )}

            {/* Analysis Panel */}
            <AnalysisPanel 
              selectedMarket={selectedMarket}
              filters={filters}
            />

            {/* Results Table */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Kết quả sàng lọc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResultsTable
                  selectedMarket={selectedMarket}
                  filters={filters}
                  results={results}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Voice Controls */}
        {isVoiceActive && (
          <VoiceControls
            onCommand={(command) => console.log('Voice command:', command)}
            onClose={() => setIsVoiceActive(false)}
          />
        )}
      </div>
    </div>
  );
};
