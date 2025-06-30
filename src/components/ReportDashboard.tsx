import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Pause, 
  Search, 
  User, 
  Home,
  BookOpen,
  List,
  FileText,
  Mic,
  TrendingUp,
  BarChart3,
  Users
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PlaylistItem {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  isActive?: boolean;
}

export const ReportDashboard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeReport, setActiveReport] = useState('financial-analysis');
  const [searchQuery, setSearchQuery] = useState('');
  const [reportAnalysis, setReportAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const playlistItems: PlaylistItem[] = [
    {
      id: '1',
      title: 'Q4 Market Analysis',
      creator: '@analyst',
      thumbnail: '/placeholder.svg',
      isActive: false
    },
    {
      id: '2',
      title: 'Portfolio Performance',
      creator: '@trader',
      thumbnail: '/placeholder.svg',
      isActive: false
    },
    {
      id: '3',
      title: 'Economic Outlook',
      creator: '@economist',
      thumbnail: '/placeholder.svg',
      isActive: true
    },
    {
      id: '4',
      title: 'Risk Assessment',
      creator: '@analyst',
      thumbnail: '/placeholder.svg',
      isActive: false
    }
  ];

  const navigationItems = [
    { name: 'home', icon: Home, active: false },
    { name: 'reports', icon: FileText, active: false },
    { name: 'analytics', icon: BarChart3, active: false },
    { name: 'resources', icon: BookOpen, active: false },
    { name: 'playlist', icon: List, active: true }
  ];

  useEffect(() => {
    const fetchLatestAnalysis = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('stock_analysis')
        .select('analysis_result')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (data && data.analysis_result) {
        setReportAnalysis(data.analysis_result);
      }
      setLoading(false);
    };
    fetchLatestAnalysis();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-8">
        <nav className="flex space-x-8">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              className={`text-sm font-medium transition-all duration-300 ${
                item.active
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-slate-500">23k followers • 5 following</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Main Content Area - Vinyl Player Interface */}
        <div className="space-y-6">
          <Card className="p-8 bg-white/70 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
            <div className="relative">
              {/* Vinyl Record */}
              <div className="relative w-80 h-80 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black rounded-full shadow-2xl">
                  <div className="absolute inset-4 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full">
                    <div className="absolute inset-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-400 rounded-full"></div>
                    </div>
                  </div>
                  {/* Record grooves effect */}
                  <div className="absolute inset-2 rounded-full border border-slate-600/20"></div>
                  <div className="absolute inset-4 rounded-full border border-slate-600/20"></div>
                  <div className="absolute inset-6 rounded-full border border-slate-600/20"></div>
                </div>
              </div>

              {/* Content Info */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800 mb-2">Financial Report</h1>
                <p className="text-slate-600 font-medium">Market Analysis</p>
                
                <div className="mt-6 p-6 bg-slate-50/80 rounded-2xl backdrop-blur-sm">
                  <p className="text-slate-700 leading-relaxed">
                    {loading ? 'Loading analysis...' : (reportAnalysis || 'No analysis available.')}
                  </p>
                  <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                    Read more...
                  </button>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center space-x-6">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-16 h-16 rounded-full bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-sm border-0"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-blue-600" />
                  ) : (
                    <Play className="w-8 h-8 text-blue-600" />
                  )}
                </Button>
              </div>

              {/* Save Question */}
              <div className="mt-8 text-center">
                <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
                  <p className="text-sm text-slate-600">Would you like to save this report?</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Financial Metrics Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-white/70 backdrop-blur-xl border-0 shadow-xl rounded-2xl">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-slate-800">+12.5%</div>
                  <div className="text-sm text-slate-600">Portfolio Growth</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/70 backdrop-blur-xl border-0 shadow-xl rounded-2xl">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold text-slate-800">87.3</div>
                  <div className="text-sm text-slate-600">Risk Score</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Playlist Section */}
        <div className="space-y-6">
          <Card className="p-6 bg-white/70 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Reports</h2>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Mic className="w-4 h-4 mr-2" />
                Voice Mode
              </Button>
            </div>

            <div className="space-y-4">
              {playlistItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                    item.isActive
                      ? 'bg-blue-500/20 backdrop-blur-sm border border-blue-200/50 shadow-lg transform scale-[1.02]'
                      : 'bg-white/50 hover:bg-white/70 hover:shadow-md'
                  }`}
                  onClick={() => setActiveReport(item.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{item.title}</h3>
                      <p className="text-sm text-slate-600">created by {item.creator}</p>
                    </div>
                    {item.isActive && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* User Engagement */}
            <div className="mt-8 p-4 bg-slate-50/80 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Users className="w-4 h-4" />
                <span>View reports from @analyst team.</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                If you want to save reports, don't forget to like them
              </p>
            </div>
          </Card>

          {/* Additional Analysis Cards */}
          <div className="grid grid-cols-1 gap-4">
            <Card className="p-6 bg-white/70 backdrop-blur-xl border-0 shadow-xl rounded-2xl">
              <h3 className="font-semibold text-slate-800 mb-3">Market Sentiment</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Bullish</span>
                <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-green-600">75%</span>
              </div>
            </Card>

            <Card className="p-6 bg-white/70 backdrop-blur-xl border-0 shadow-xl rounded-2xl">
              <h3 className="font-semibold text-slate-800 mb-3">AI Confidence</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">High</span>
                <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-5/6 h-full bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-blue-600">92%</span>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-6">
        <Card className="p-4 bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-2xl">
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-slate-500" />
            <Input
              placeholder="Search for a specific report..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent focus:ring-0 focus:border-0 text-slate-700 placeholder-slate-500"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
