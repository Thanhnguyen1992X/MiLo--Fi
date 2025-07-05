import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketType, ScreenerFilters } from './ScreenerDashboard';
import { TrendingUp, TrendingDown, Star, Eye, Download, Bookmark } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ResultsTableProps {
  selectedMarket: MarketType;
  filters: ScreenerFilters;
  results: any[];
  isLoading: boolean;
}

// Mock data for demonstration
const mockStockData = [
  { symbol: 'VIC', name: 'Vingroup', price: 45500, change: 2.3, volume: 1250000, marketCap: 'Large', sector: 'Real Estate' },
  { symbol: 'VCB', name: 'Vietcombank', price: 89000, change: -1.2, volume: 980000, marketCap: 'Large', sector: 'Finance' },
  { symbol: 'HPG', name: 'Hòa Phát', price: 28500, change: 3.1, volume: 2100000, marketCap: 'Large', sector: 'Steel' },
  { symbol: 'FPT', name: 'FPT Corp', price: 78000, change: 1.8, volume: 750000, marketCap: 'Large', sector: 'Technology' },
];

const mockRealEstateData = [
  { 
    id: 1, 
    title: 'Chung cư cao cấp Q1', 
    price: 5.2, 
    location: 'Quận 1, TP.HCM', 
    area: 85, 
    bedrooms: 2, 
    bathrooms: 2,
    type: 'Chung cư'
  },
  { 
    id: 2, 
    title: 'Nhà phố Thảo Điền', 
    price: 12.5, 
    location: 'Quận 2, TP.HCM', 
    area: 120, 
    bedrooms: 3, 
    bathrooms: 3,
    type: 'Nhà phố'
  },
];

export const ResultsTable = ({ selectedMarket, filters, results, isLoading }: ResultsTableProps) => {
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  
  const toggleWatchlist = (id: string) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(id)) {
      newWatchlist.delete(id);
    } else {
      newWatchlist.add(id);
    }
    setWatchlist(newWatchlist);
  };

  const handleExportExcel = () => {
    // Chỉ xuất cho bảng cổ phiếu
    if (selectedMarket !== 'stocks') return;
    const wsData = [
      ['Mã CK', 'Tên công ty', 'Giá', 'Thay đổi', 'Khối lượng', 'Ngành'],
      ...mockStockData.map(stock => [
        stock.symbol,
        stock.name,
        stock.price,
        stock.change,
        stock.volume,
        stock.sector
      ])
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'KQ Sàng lọc');
    XLSX.writeFile(wb, 'ket-qua-sang-loc.xlsx');
  };

  const renderStockTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left py-3 px-4 text-slate-300 font-medium">Mã CK</th>
            <th className="text-left py-3 px-4 text-slate-300 font-medium">Tên công ty</th>
            <th className="text-right py-3 px-4 text-slate-300 font-medium">Giá</th>
            <th className="text-right py-3 px-4 text-slate-300 font-medium">Thay đổi</th>
            <th className="text-right py-3 px-4 text-slate-300 font-medium">Khối lượng</th>
            <th className="text-center py-3 px-4 text-slate-300 font-medium">Ngành</th>
            <th className="text-center py-3 px-4 text-slate-300 font-medium">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {mockStockData.map((stock) => (
            <tr key={stock.symbol} className="border-b border-slate-800 hover:bg-slate-700/30">
              <td className="py-3 px-4">
                <div className="font-bold text-white">{stock.symbol}</div>
              </td>
              <td className="py-3 px-4 text-slate-300">{stock.name}</td>
              <td className="py-3 px-4 text-right text-white font-mono">
                {stock.price.toLocaleString()}
              </td>
              <td className="py-3 px-4 text-right">
                <div className={`flex items-center justify-end gap-1 ${
                  stock.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stock.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stock.change > 0 ? '+' : ''}{stock.change}%
                </div>
              </td>
              <td className="py-3 px-4 text-right text-slate-300 font-mono">
                {stock.volume.toLocaleString()}
              </td>
              <td className="py-3 px-4 text-center">
                <Badge variant="outline" className="text-xs text-white">
                  {stock.sector}
                </Badge>
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWatchlist(stock.symbol)}
                    className={watchlist.has(stock.symbol) ? 'text-yellow-400' : 'text-slate-400'}
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderRealEstateTable = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {mockRealEstateData.map((property) => (
        <Card key={property.id} className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 transition-colors">
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-white font-semibold text-lg">{property.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleWatchlist(property.id.toString())}
                className={watchlist.has(property.id.toString()) ? 'text-yellow-400' : 'text-slate-400'}
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-300">Giá:</span>
                <span className="text-white font-bold">{property.price} tỷ VND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Khu vực:</span>
                <span className="text-slate-300">{property.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Diện tích:</span>
                <span className="text-slate-300">{property.area} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Loại:</span>
                <Badge variant="outline" className="text-xs">
                  {property.type}
                </Badge>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-slate-400">
              <span>{property.bedrooms} PN • {property.bathrooms} PT</span>
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                Xem chi tiết
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderCryptoTable = () => (
    <div className="text-center py-8 text-slate-400">
      <p>Crypto market data sẽ được hiển thị ở đây</p>
    </div>
  );

  const renderForexTable = () => (
    <div className="text-center py-8 text-slate-400">
      <p>Forex market data sẽ được hiển thị ở đây</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const renderTable = () => {
    switch (selectedMarket) {
      case 'stocks':
        return renderStockTable();
      case 'real-estate':
        return renderRealEstateTable();
      case 'crypto':
        return renderCryptoTable();
      case 'forex':
        return renderForexTable();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-slate-300">
          Tìm thấy {selectedMarket === 'stocks' ? mockStockData.length : 
                   selectedMarket === 'real-estate' ? mockRealEstateData.length : 0} kết quả
        </div>
        <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600" onClick={handleExportExcel}>
          <Download className="w-4 h-4 mr-2" />
          Xuất Excel
        </Button>
      </div>
      
      {renderTable()}
    </div>
  );
};
