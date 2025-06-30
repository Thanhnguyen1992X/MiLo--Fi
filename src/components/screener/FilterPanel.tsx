import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter, RotateCcw } from 'lucide-react';
import { MarketType, ScreenerFilters } from './ScreenerDashboard';

interface FilterPanelProps {
  selectedMarket: MarketType;
  filters: ScreenerFilters;
  onFilterChange: (filters: Partial<ScreenerFilters>) => void;
}

export const FilterPanel = ({ selectedMarket, filters, onFilterChange }: FilterPanelProps) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  const handleReset = () => {
    const resetFilters: ScreenerFilters = {
      priceRange: [0, 1000000],
    };
    onFilterChange(resetFilters);
    setPriceRange([0, 1000000]);
  };

  const handlePriceRangeChange = (value: number[]) => {
    const newRange: [number, number] = [value[0] || 0, value[1] || 0];
    setPriceRange(newRange);
    onFilterChange({ priceRange: newRange });
  };

  const renderStockFilters = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-white mb-2 block">Khoảng giá (VND)</Label>
        <Slider
          value={priceRange}
          onValueChange={handlePriceRangeChange}
          max={1000000}
          min={0}
          step={10000}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>{priceRange[0].toLocaleString()}</span>
          <span>{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div>
        <Label className="text-white mb-2 block">Vốn hóa thị trường</Label>
        <Select onValueChange={(value) => onFilterChange({ marketCap: value })}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Chọn vốn hóa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Vốn hóa nhỏ (&lt; 1 tỷ USD)</SelectItem>
            <SelectItem value="mid">Vốn hóa trung bình (1-10 tỷ USD)</SelectItem>
            <SelectItem value="large">Vốn hóa lớn (&gt; 10 tỷ USD)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-white mb-2 block">Ngành</Label>
        <Select onValueChange={(value) => onFilterChange({ sector: value })}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Chọn ngành" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Công nghệ</SelectItem>
            <SelectItem value="finance">Tài chính</SelectItem>
            <SelectItem value="healthcare">Y tế</SelectItem>
            <SelectItem value="energy">Năng lượng</SelectItem>
            <SelectItem value="consumer">Tiêu dùng</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-white mb-2 block">Khối lượng giao dịch tối thiểu</Label>
        <Input
          type="number"
          placeholder="Nhập khối lượng"
          className="bg-slate-700 border-slate-600 text-white"
          onChange={(e) => onFilterChange({ volume: parseInt(e.target.value) })}
        />
      </div>
    </div>
  );

  const renderForexFilters = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-white mb-2 block">Cặp tiền tệ</Label>
        <Select>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Chọn cặp tiền" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EURUSD">EUR/USD</SelectItem>
            <SelectItem value="GBPUSD">GBP/USD</SelectItem>
            <SelectItem value="USDJPY">USD/JPY</SelectItem>
            <SelectItem value="USDVND">USD/VND</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-white mb-2 block">Độ biến động</Label>
        <Select>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Chọn độ biến động" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Thấp (&lt; 1%)</SelectItem>
            <SelectItem value="medium">Trung bình (1-3%)</SelectItem>
            <SelectItem value="high">Cao (&gt; 3%)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderCryptoFilters = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-white mb-2 block">Khoảng giá (USD)</Label>
        <Slider
          value={priceRange}
          onValueChange={handlePriceRangeChange}
          max={100000}
          min={0}
          step={100}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <Label className="text-white mb-2 block">Blockchain</Label>
        <Select>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Chọn blockchain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bitcoin">Bitcoin</SelectItem>
            <SelectItem value="ethereum">Ethereum</SelectItem>
            <SelectItem value="binance">Binance Smart Chain</SelectItem>
            <SelectItem value="polygon">Polygon</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderRealEstateFilters = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-white mb-2 block">Khoảng giá (tỷ VND)</Label>
        <Slider
          value={priceRange}
          onValueChange={handlePriceRangeChange}
          max={100}
          min={0}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>{priceRange[0]} tỷ</span>
          <span>{priceRange[1]} tỷ</span>
        </div>
      </div>

      <div>
        <Label className="text-white mb-2 block">Loại bất động sản</Label>
        <Select onValueChange={(value) => onFilterChange({ propertyType: value })}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Chọn loại BDS" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="house">Nhà riêng</SelectItem>
            <SelectItem value="apartment">Chung cư</SelectItem>
            <SelectItem value="land">Đất nền</SelectItem>
            <SelectItem value="office">Văn phòng</SelectItem>
            <SelectItem value="villa">Biệt thự</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-white mb-2 block">Khu vực</Label>
        <Select onValueChange={(value) => onFilterChange({ location: value })}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Chọn khu vực" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hanoi">Hà Nội</SelectItem>
            <SelectItem value="hcmc">TP. Hồ Chí Minh</SelectItem>
            <SelectItem value="danang">Đà Nẵng</SelectItem>
            <SelectItem value="haiphong">Hải Phòng</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-white mb-2 block">Phòng ngủ</Label>
          <Select onValueChange={(value) => onFilterChange({ bedrooms: parseInt(value) })}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="PN" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 PN</SelectItem>
              <SelectItem value="2">2 PN</SelectItem>
              <SelectItem value="3">3 PN</SelectItem>
              <SelectItem value="4">4+ PN</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white mb-2 block">Phòng tắm</Label>
          <Select onValueChange={(value) => onFilterChange({ bathrooms: parseInt(value) })}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="PT" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 PT</SelectItem>
              <SelectItem value="2">2 PT</SelectItem>
              <SelectItem value="3">3 PT</SelectItem>
              <SelectItem value="4">4+ PT</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-white mb-2 block">Diện tích (m²)</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Từ"
            className="bg-slate-700 border-slate-600 text-white"
          />
          <Input
            type="number"
            placeholder="Đến"
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>
      </div>
    </div>
  );

  const renderFilters = () => {
    switch (selectedMarket) {
      case 'stocks':
        return renderStockFilters();
      case 'forex':
        return renderForexFilters();
      case 'crypto':
        return renderCryptoFilters();
      case 'real-estate':
        return renderRealEstateFilters();
      default:
        return null;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 sticky top-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Bộ lọc
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderFilters()}
      </CardContent>
    </Card>
  );
};
