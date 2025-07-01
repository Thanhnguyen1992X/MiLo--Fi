import { useState, useEffect, useRef } from 'react';
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
  const [selectedReport, setSelectedReport] = useState<PlaylistItem | null>(null);
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const [latestTieude, setLatestTieude] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [tieudeList, setTieudeList] = useState<string[]>([]);
  const [latestAnalysisResult, setLatestAnalysisResult] = useState<string>('');

  const playlistItems: PlaylistItem[] = [
    {
      id: '1',
      title: tieudeList[0] || 'Không có tiêu đề',
      creator: '@analyst',
      thumbnail: '/placeholder.svg',
      isActive: false
    },
    {
      id: '2',
      title: tieudeList[1] || 'Không có tiêu đề',
      creator: '@trader',
      thumbnail: '/placeholder.svg',
      isActive: false
    },
    {
      id: '3',
      title: tieudeList[2] || 'Không có tiêu đề',
      creator: '@economist',
      thumbnail: '/placeholder.svg',
      isActive: true
    },
    {
      id: '4',
      title: tieudeList[3] || 'Không có tiêu đề',
      creator: '@analyst',
      thumbnail: '/placeholder.svg',
      isActive: false
    }
  ];

  useEffect(() => {
    const fetchLatestAnalysis = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('report')
        .select('analysis_result')
        .order('analysis_date', { ascending: false })
        .limit(1)
        .single();
      if (error || !data?.analysis_result) {
        setReportAnalysis('Không có dữ liệu phân tích.');
      } else {
        setReportAnalysis(data.analysis_result);
      }
      setLoading(false);
    };
    fetchLatestAnalysis();
  }, []);

  useEffect(() => {
    const fetchTieudeByIndex = async () => {
      if (!selectedReport) return;
      const idx = playlistItems.findIndex(item => item.id === selectedReport.id);
      const { data, error } = await supabase
        .from('report')
        .select('tieude')
        .order('analysis_date', { ascending: false })
        .range(idx, idx)
        .limit(1);
      if (error || !data || !data[0]?.tieude) {
        setLatestTieude('Không có tiêu đề phù hợp');
      } else {
        setLatestTieude(data[0].tieude);
      }
    };
    fetchTieudeByIndex();
  }, [selectedReport]);

  useEffect(() => {
    const fetchAllTieude = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('report')
        .select('tieude')
        .order('analysis_date', { ascending: false });
      console.log('DATA TIEUDE:', data, error);
      if (error || !data) {
        setTieudeList(['Không có tiêu đề', 'Không có tiêu đề', 'Không có tiêu đề', 'Không có tiêu đề']);
      } else {
        const titles = data.map(r => r.tieude).slice(0, 4);
        while (titles.length < 4) titles.push('Không có tiêu đề');
        setTieudeList(titles);
      }
      setLoading(false);
    };
    fetchAllTieude();
  }, []);

  useEffect(() => {
    if (!selectedReport) return;
    const idx = playlistItems.findIndex(item => item.id === selectedReport.id);
    if (idx < 0 || !tieudeList[idx] || tieudeList[idx] === 'Không có tiêu đề') {
      setLatestAnalysisResult('Không có nội dung phân tích');
      return;
    }
    const fetchAnalysisResultByTieude = async () => {
      const tieude = tieudeList[idx];
      const { data, error } = await supabase
        .from('report')
        .select('analysis_result')
        .ilike('tieude', tieude)
        .limit(1)
        .single();
      if (error || !data?.analysis_result) {
        setLatestAnalysisResult('Không có nội dung phân tích');
      } else {
        setLatestAnalysisResult(data.analysis_result);
      }
    };
    fetchAnalysisResultByTieude();
  }, [selectedReport, tieudeList]);

  if (loading || tieudeList.length < 4) {
    return <div className="flex justify-center items-center h-96 text-xl font-bold">Đang tải dữ liệu báo cáo...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
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
                  onClick={() => {
                    setSelectedReport(item);
                    setShowModal(true);
                    setActiveReport(item.id);
                  }}
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
              {showModal && selectedReport && (
                <div style={{
                  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{ background: '#fff', padding: 32, borderRadius: 8, minWidth: 300, maxWidth: 500, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                    <div className="text-2xl font-bold text-center mb-4">{latestAnalysisResult}</div>
                    <div className="flex justify-end mt-4 gap-2">
                      <Button
                        onClick={() => window.location.href = 'https://www.npmjs.com/package/n8n-nodes-pdfco'}
                      >
                        Download PDF
                      </Button>
                      <Button onClick={() => setShowModal(false)} variant="secondary">
                        Đóng
                      </Button>
                    </div>
                  </div>
                </div>
              )}
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
