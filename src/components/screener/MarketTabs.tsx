
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, DollarSign, Bitcoin, Home } from 'lucide-react';
import { MarketType } from './ScreenerDashboard';

interface MarketTabsProps {
  selectedMarket: MarketType;
  onMarketChange: (market: MarketType) => void;
}

const markets = [
  { 
    id: 'stocks' as MarketType, 
    label: 'Chứng khoán', 
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'forex' as MarketType, 
    label: 'Forex', 
    icon: DollarSign,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'crypto' as MarketType, 
    label: 'Cryptocurrency', 
    icon: Bitcoin,
    color: 'from-orange-500 to-yellow-500'
  },
  { 
    id: 'real-estate' as MarketType, 
    label: 'Bất động sản', 
    icon: Home,
    color: 'from-purple-500 to-pink-500'
  },
];

export const MarketTabs = ({ selectedMarket, onMarketChange }: MarketTabsProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700 p-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {markets.map((market) => {
          const Icon = market.icon;
          const isSelected = selectedMarket === market.id;
          
          return (
            <Button
              key={market.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onMarketChange(market.id)}
              className={`
                relative h-16 flex-col space-y-2 text-sm font-medium transition-all
                ${isSelected 
                  ? `bg-gradient-to-r ${market.color} text-white shadow-lg` 
                  : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{market.label}</span>
              {isSelected && (
                <div className="absolute inset-0 bg-white/10 rounded-md" />
              )}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};
