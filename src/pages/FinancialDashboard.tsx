import { useEffect, useRef, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Plus, 
  Grid3X3,
  Search,
  Bell,
  Settings,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  DollarSign,
  Target,
  Users,
  Shield,
  MoreHorizontal
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';


export const FinancialDashboard = () => {
  // Error boundary state
  const [hasError, setHasError] = useState(false);
  const mainChartRef = useRef<HTMLDivElement>(null);
  const radarChartRef = useRef<HTMLDivElement>(null);
  const sankeyChartRef = useRef<HTMLDivElement>(null);
  const doughnutChartRef = useRef<HTMLDivElement>(null);
  const heatmapChartRef = useRef<HTMLDivElement>(null);
  const technicalChartRef = useRef<HTMLDivElement>(null);
  const ownershipChartRef = useRef<HTMLDivElement>(null);
  const peComparisonChartRef = useRef<HTMLDivElement>(null);
  const tradingViewRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showWidgetMenu, setShowWidgetMenu] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [stockCode, setStockCode] = useState('EUR/USD');
  const [showNotFoundPopup, setShowNotFoundPopup] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const { toast } = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  // Thêm state lưu danh sách mã cổ phiếu
  const [stockList, setStockList] = useState<string[]>([]);

  useEffect(() => {
    // Load ECharts dynamically
    const loadECharts = async () => {
      if (typeof window !== 'undefined' && !window.echarts) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.5.0/echarts.min.js';
        script.onload = initializeCharts;
        document.head.appendChild(script);
      } else if (window.echarts) {
        initializeCharts();
      }
    };

    loadECharts();
  }, []);

  useEffect(() => {
    // Reinitialize charts when stockCode changes
    if (window.echarts) {
      setIsChartLoading(true);
      setTimeout(() => {
        initializeCharts();
        setIsChartLoading(false);
      }, 100);
    }
  }, [stockCode]);

  // Cleanup timeout when component unmounts
  useEffect(() => {
    return () => {
      if ((window as any).searchTimeout) {
        clearTimeout((window as any).searchTimeout);
      }
    };
  }, []);

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!tradingViewRef.current) return;
    // Xóa widget cũ nếu có
    tradingViewRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.innerHTML = `{
      "autosize": true,
      "symbol": "${stockCode}",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "range": "YTD",
      "allow_symbol_change": true,
      "details": true,
      "hotlist": true,
      "show_popup_button": true,
      "popup_width": "1198",
      "popup_height": "1200",
      "support_host": "https://www.tradingview.com"
    }`;
    tradingViewRef.current.appendChild(script);
  }, [stockCode]);

  // Fetch danh sách mã cổ phiếu từ Supabase khi mount
  useEffect(() => {
    const fetchStockList = async () => {
      const { data, error } = await supabase
        .from('finance')
        .select('stock_code');
      if (data) {
        // Lọc trùng và loại bỏ null/undefined
        const codes = Array.from(new Set(data.map((item: any) => item.stock_code).filter(Boolean)));
        setStockList(codes);
      }
    };
    fetchStockList();
  }, []);

  const initializeCharts = () => {
    if (!window.echarts) return;
    
    try {

    // Initialize all charts
    if (mainChartRef.current) {
      const mainChart = window.echarts.init(mainChartRef.current);
      const mainOption = {
        animation: false,
        grid: {
          top: 20,
          right: 20,
          bottom: 30,
          left: 50
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#ccc',
          textStyle: {
            color: '#1e293b'
          }
        },
        xAxis: {
          type: 'category',
          data: Array.from({length: 24}, (_, i) => `${i}:00`),
          axisLine: {
            lineStyle: {
              color: '#475569'
            }
          },
          axisLabel: {
            color: '#94a3b8'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#475569'
            }
          },
          axisLabel: {
            color: '#94a3b8'
          },
          splitLine: {
            lineStyle: {
              color: '#334155'
            }
          }
        },
        series: [
          {
            data: [1.0832, 1.0828, 1.0825, 1.0820, 1.0818, 1.0823, 1.0825, 1.0830, 1.0835, 1.0832, 1.0828, 1.0825, 1.0828, 1.0832, 1.0835, 1.0838, 1.0842, 1.0845, 1.0843, 1.0840, 1.0838, 1.0842, 1.0845, 1.0845],
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#3b82f6',
              width: 3
            },
            symbol: 'none',
            areaStyle: {
              color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(59, 130, 246, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(59, 130, 246, 0.05)'
                }
              ])
            }
          }
        ]
      };
      mainChart.setOption(mainOption);
    }

    // Radar Chart
    if (radarChartRef.current) {
      const radarChart = window.echarts.init(radarChartRef.current);
      const radarOption = {
        animation: false,
        radar: {
          indicator: [
            { name: 'Volatility', max: 100 },
            { name: 'Volume', max: 100 },
            { name: 'Momentum', max: 100 },
            { name: 'Trend', max: 100 },
            { name: 'Liquidity', max: 100 }
          ],
          splitArea: {
            areaStyle: {
              color: ['rgba(59, 130, 246, 0.05)', 'rgba(59, 130, 246, 0.1)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#475569'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#475569'
            }
          }
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: [85, 65, 55, 80, 70],
              name: stockCode,
              lineStyle: {
                color: '#3b82f6'
              },
              areaStyle: {
                color: 'rgba(59, 130, 246, 0.2)'
              }
            }
          ]
        }],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          textStyle: {
            color: '#1e293b'
          }
        }
      };
      radarChart.setOption(radarOption);
    }

    // Doughnut Chart
    if (doughnutChartRef.current) {
      const doughnutChart = window.echarts.init(doughnutChartRef.current);
      const doughnutOption = {
        animation: false,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          textStyle: {
            color: '#1e293b'
          }
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          textStyle: {
            color: '#e2e8f0'
          }
        },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: '#1e293b',
            borderWidth: 2
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '14',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 35, name: stockCode, itemStyle: { color: '#3b82f6' } },
            { value: 25, name: 'GBP/USD', itemStyle: { color: '#10b981' } },
            { value: 20, name: 'USD/JPY', itemStyle: { color: '#f59e0b' } },
            { value: 15, name: 'AUD/USD', itemStyle: { color: '#ef4444' } },
            { value: 5, name: 'Others', itemStyle: { color: '#8b5cf6' } }
          ]
        }]
      };
      doughnutChart.setOption(doughnutOption);
    }

    // Heatmap Chart
    if (heatmapChartRef.current) {
      const heatmapChart = window.echarts.init(heatmapChartRef.current);
      const heatmapOption = {
        animation: false,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          textStyle: {
            color: '#1e293b'
          }
        },
        series: [
          {
            type: 'treemap',
            data: [
              {
                name: 'USD',
                value: 80,
                itemStyle: {
                  color: '#3b82f6'
                }
              },
              {
                name: 'EUR',
                value: 65,
                itemStyle: {
                  color: '#10b981'
                }
              },
              {
                name: 'JPY',
                value: 55,
                itemStyle: {
                  color: '#f59e0b'
                }
              },
              {
                name: 'GBP',
                value: 50,
                itemStyle: {
                  color: '#ef4444'
                }
              }
            ],
            label: {
              show: true,
              formatter: '{b}',
              color: '#fff'
            },
            breadcrumb: {
              show: false
            },
            roam: false,
            itemStyle: {
              borderColor: '#1e293b',
              borderWidth: 1,
              gapWidth: 2
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      heatmapChart.setOption(heatmapOption);
    }

    // Technical Chart
    if (technicalChartRef.current) {
      const technicalChart = window.echarts.init(technicalChartRef.current);
      const technicalOption = {
        animation: false,
        grid: {
          top: 10,
          right: 10,
          bottom: 20,
          left: 50
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          textStyle: {
            color: '#1e293b'
          }
        },
        xAxis: {
          type: 'category',
          data: ['MA5', 'MA10', 'MA20', 'MA50', 'MA100', 'MA200', 'RSI', 'MACD', 'Stoch', 'BB', 'ATR'],
          axisLine: {
            lineStyle: {
              color: '#475569'
            }
          },
          axisLabel: {
            color: '#94a3b8',
            rotate: 45
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          min: -100,
          max: 100,
          axisLine: {
            lineStyle: {
              color: '#475569'
            }
          },
          axisLabel: {
            color: '#94a3b8'
          },
          splitLine: {
            lineStyle: {
              color: '#334155'
            }
          }
        },
        series: [
          {
            data: [80, 60, 40, 20, -20, -40, 30, -10, -30, 50, 10],
            type: 'bar',
            itemStyle: {
              color: function(params: any) {
                return params.data >= 0 ? '#10b981' : '#ef4444';
              },
              borderRadius: 4
            }
          }
        ]
      };
      technicalChart.setOption(technicalOption);
    }

    // Ownership Pie Chart
    if (ownershipChartRef.current) {
      const ownershipChart = window.echarts.init(ownershipChartRef.current);
      ownershipChart.setOption({
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 10, textStyle: { color: '#e2e8f0' } },
        series: [
          {
            name: 'Ownership',
            type: 'pie',
            radius: '70%',
            center: ['60%', '50%'],
            data: [
              { value: 40, name: 'Nhà nước' },
              { value: 25, name: 'Cổ đông lớn' },
              { value: 20, name: 'Nước ngoài' },
              { value: 10, name: 'Ban lãnh đạo' },
              { value: 5, name: 'Khác' }
            ],
            label: { color: '#e2e8f0' },
            itemStyle: {
              borderColor: '#1e293b',
              borderWidth: 2
            }
          }
        ]
      });
    }

    // PE Comparison Bar Chart
    if (peComparisonChartRef.current) {
      const peChart = window.echarts.init(peComparisonChartRef.current);
      peChart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: 40, right: 20, top: 20, bottom: 30 },
        xAxis: {
          type: 'category',
          data: ['MIL', 'VCB', 'TCB', 'ACB', 'VPB', 'Ngành'],
          axisLabel: { color: '#e2e8f0' },
          axisLine: { lineStyle: { color: '#475569' } }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: '#e2e8f0' },
          axisLine: { lineStyle: { color: '#475569' } },
          splitLine: { lineStyle: { color: '#334155' } }
        },
        series: [
          {
            data: [8.2, 10.5, 9.8, 9.3, 8.7, 9.5],
            type: 'bar',
            itemStyle: {
              color: function(params: any) {
                return params.dataIndex === 0 ? '#3b82f6' : '#10b981';
              },
              borderRadius: 4
            }
          }
        ]
      });
    }

    // Resize charts when window size changes
    const handleResize = () => {
      const charts = [
        mainChartRef.current && window.echarts.getInstanceByDom(mainChartRef.current),
        radarChartRef.current && window.echarts.getInstanceByDom(radarChartRef.current),
        doughnutChartRef.current && window.echarts.getInstanceByDom(doughnutChartRef.current),
        heatmapChartRef.current && window.echarts.getInstanceByDom(heatmapChartRef.current),
        technicalChartRef.current && window.echarts.getInstanceByDom(technicalChartRef.current)
      ].filter(Boolean);

      charts.forEach(chart => chart?.resize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    } catch (error) {
      console.error('Error initializing charts:', error);
      setHasError(true);
      toast({
        title: "Lỗi biểu đồ",
        description: "Không thể tải biểu đồ. Vui lòng thử lại.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleAddWidget = () => setShowWidgetMenu(true);
  const handleSelectProWidget = () => {
    setShowWidgetMenu(false);
    navigate('/n8ndashboard');
  };

  // Hàm kiểm tra stock_code khi nhập
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    
    // Chỉ cho phép nhập chữ cái, số và dấu /
    const sanitizedValue = value.replace(/[^A-Z0-9/]/g, '');
    setSearchText(sanitizedValue);
    
    // Clear timeout nếu có
    if ((window as any).searchTimeout) {
      clearTimeout((window as any).searchTimeout);
    }
    
    if (sanitizedValue.length === 0) {
      setStockCode('EUR/USD');
      setShowNotFoundPopup(false);
      return;
    }
    
    // Chỉ search khi có ít nhất 2 ký tự
    if (sanitizedValue.length < 2) {
      return;
    }
    
    // Debounce search để tránh gọi API quá nhiều
    (window as any).searchTimeout = setTimeout(async () => {
      setIsSearching(true);
      const loadingToast = toast({
        title: "Đang tìm kiếm",
        description: `Đang tìm kiếm mã cổ phiếu: ${sanitizedValue}`,
        variant: "default",
        duration: Infinity,
      });
      try {
        const { data, error } = await supabase
          .from('finance')
          .select('stock_code')
          .eq('stock_code', sanitizedValue)
          .single();
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        if (data && data.stock_code) {
          setStockCode(data.stock_code);
          setShowNotFoundPopup(false);
          setHasError(false); // Reset error state on successful search
          toast({
            title: "Thành công",
            description: `Đã tìm thấy mã cổ phiếu: ${data.stock_code}`,
            variant: "default",
            duration: 3000,
          });
        } else {
          setStockCode('EUR/USD');
          setShowNotFoundPopup(true);
          toast({
            title: "Không tìm thấy",
            description: `Không tìm thấy mã cổ phiếu: ${sanitizedValue}`,
            variant: "destructive",
            duration: 3000,
          });
          // Tự động ẩn popup sau 3 giây
          setTimeout(() => {
            setShowNotFoundPopup(false);
          }, 3000);
        }
              } catch (error) {
          console.error('Search error:', error);
          setStockCode('EUR/USD');
          setShowNotFoundPopup(true);
          toast({
            title: "Lỗi",
            description: "Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.",
            variant: "destructive",
            duration: 5000,
          });
          setTimeout(() => {
            setShowNotFoundPopup(false);
          }, 3000);
                } finally {
          setIsSearching(false);
          // Dismiss loading toast
          try {
            if (loadingToast && typeof loadingToast.dismiss === 'function') {
              loadingToast.dismiss();
            }
          } catch (error) {
            console.error('Error dismissing toast:', error);
          }
        }
    }, 500); // Delay 500ms
  };

  if (hasError) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Đã xảy ra lỗi</h2>
              <p className="text-slate-400 mb-4">Không thể tải biểu đồ. Vui lòng thử lại.</p>
              <Button onClick={() => window.location.reload()}>
                Tải lại trang
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Financial Dashboard</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400">June 20, 2025</span>
              <Badge variant="secondary" className="bg-green-500/10 text-green-400">
                Market Open
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Nhập mã cổ phiếu..."
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if ((window as any).searchTimeout) {
                      clearTimeout((window as any).searchTimeout);
                    }
                    handleSearchChange(e as any);
                  }
                }}
                maxLength={10}
                disabled={isSearching}
                aria-label="Tìm kiếm mã cổ phiếu"
                className="pl-10 pr-12 py-1.5 rounded-full bg-slate-800 border border-slate-600 text-slate-200 focus:border-blue-500 focus:outline-none transition w-40 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Nhập mã cổ phiếu để tìm kiếm (VD: HPG, VNM, VIC...) - Ctrl+K để focus"
              />
              {isSearching ? (
                <RefreshCw className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 animate-spin" />
              ) : (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              )}
              {searchText && !isSearching && (
                <button
                  onClick={() => {
                    setSearchText('');
                    setStockCode('EUR/USD');
                    setShowNotFoundPopup(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 hover:text-slate-200 transition"
                  aria-label="Xóa tìm kiếm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {!searchText && !isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 bg-slate-700 px-1 py-0.5 rounded hidden sm:block">
                  {isMac ? '⌘K' : 'Ctrl+K'}
                </div>
              )}
              {/* Button Select mới thêm */}
              <button
                className="ml-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700 focus:border-blue-500 focus:outline-none transition text-sm"
                type="button"
              >
                Select
              </button>
              {/* Dropdown scroll các mã cổ phiếu */}
              <select
                className="ml-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-600 text-slate-200 focus:border-blue-500 focus:outline-none transition text-sm max-w-[120px] overflow-x-auto"
                value=""
                onChange={async (e) => {
                  const code = e.target.value;
                  setSearchText(code);
                  // Gọi lại handleSearchChange với event giả lập
                  await handleSearchChange({ target: { value: code } } as any);
                }}
              >
                <option value="">Chọn mã</option>
                {stockList.map((code) => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>
            <button
              className="flex items-center space-x-1 bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-button text-sm whitespace-nowrap"
              onClick={handleAddWidget}
            >
              <i className="ri-add-line"></i>
              <span>Add Widget</span>
            </button>
            <Button variant="outline" size="sm">
              <Grid3X3 className="w-4 h-4 mr-2" />
              Layout
            </Button>
            <Button size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Gợi ý Pro Widget */}
        {showWidgetMenu && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
              <h3 className="text-lg font-semibold mb-4 text-slate-900">Chọn Widget</h3>
              <button
                className="w-full text-left px-4 py-2 rounded hover:bg-slate-100 text-primary font-medium mb-2 border border-primary"
                onClick={handleSelectProWidget}
              >
                Pro Widget
              </button>
              <button
                className="w-full text-left px-4 py-2 rounded hover:bg-slate-100 text-slate-700"
                onClick={() => setShowWidgetMenu(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* Popup thông báo không tìm thấy */}
        <Dialog open={showNotFoundPopup} onOpenChange={setShowNotFoundPopup}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                Thông báo
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-slate-700">Không có trong list</p>
            </div>
          </DialogContent>
        </Dialog>



        {/* Market Ticker */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-8 overflow-x-auto">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{stockCode}</span>
                <span className="text-sm text-green-400">5,236.42 +0.85%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">NASDAQ</span>
                <span className="text-sm text-green-400">16,742.39 +1.12%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">DOW</span>
                <span className="text-sm text-red-400">38,671.23 -0.23%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">EUR/USD</span>
                <span className="text-sm text-green-400">1.0845 +0.32%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">BTC/USD</span>
                <span className="text-sm text-green-400">68,423.15 +2.74%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Chart */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="font-medium text-white">{stockCode}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-semibold text-white">1.0845</span>
                <span className="text-sm text-green-400">+0.0035 (+0.32%)</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex rounded-full bg-slate-700 p-1">
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">1H</Button>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">4H</Button>
                <Button size="sm" className="h-6 px-2 text-xs">1D</Button>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">1W</Button>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">1M</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isChartLoading && (
              <div className="w-full h-96 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-5 h-5 text-slate-400 animate-spin" />
                  <span className="text-slate-400">Đang cập nhật biểu đồ...</span>
                </div>
              </div>
            )}
            <div ref={mainChartRef} className={`w-full h-96 ${isChartLoading ? 'hidden' : ''}`}></div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/20">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Buy
                </Button>
                <Button variant="outline" size="sm" className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20">
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Sell
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span>Spread: 0.9 pips</span>
                <span>Volume: 127.4K</span>
                <span>Range: 1.0821 - 1.0859</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TradingView Widget */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Biểu đồ nâng cao TradingView</CardTitle>
          </CardHeader>
          <CardContent>
            {isChartLoading && (
              <div className="w-full h-96 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-5 h-5 text-slate-400 animate-spin" />
                  <span className="text-slate-400">Đang cập nhật biểu đồ TradingView...</span>
                </div>
              </div>
            )}
            <div ref={tradingViewRef} className={`w-full h-96 ${isChartLoading ? 'hidden' : ''}`} />
            <div className="flex items-center justify-between pt-4 border-t border-slate-700 mt-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/20">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Buy
                </Button>
                <Button variant="outline" size="sm" className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20">
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Sell
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span>Spread: 0.9 pips</span>
                <span>Volume: 127.4K</span>
                <span>Range: 1.0821 - 1.0859</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Financial Analysis */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <CardTitle className="text-xl text-white">Phân tích dòng tiền tệ</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <div className="w-full h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Tiền vào', value: 2850 },
                    { name: 'Tiền ra', value: -1250 },
                    { name: 'Dòng ròng', value: 1600 },
                  ]}>
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', color: '#fff' }} />
                    <Bar dataKey="value">
                      <Cell key="in" fill="#22c55e" />
                      <Cell key="out" fill="#ef4444" />
                      <Cell key="net" fill="hsl(var(--primary))" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Tổng dòng tiền vào:</span>
                  <span className="font-medium text-green-500">+2,850 tỷ VND</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Tổng dòng tiền ra:</span>
                  <span className="font-medium text-red-500">-1,250 tỷ VND</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Dòng tiền ròng:</span>
                  <span className="font-medium text-primary">+1,600 tỷ VND</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DuPont Analysis */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <CardTitle className="text-xl text-white">Phân tích DuPont</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                {/* ROE Section */}
                <div className="text-center mb-6">
                  <div className="text-sm font-medium text-slate-300">ROE</div>
                  <div className="text-2xl font-bold text-blue-400">22.5%</div>
                </div>
                {/* Separator */}
                <div className="flex items-center justify-center w-full mb-6">
                  <div className="w-1/3 h-px bg-slate-700"></div>
                  <div className="mx-3 text-slate-500 font-medium">×</div>
                  <div className="w-1/3 h-px bg-slate-700"></div>
                </div>
                {/* Main Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full">
                  <div className="text-center bg-slate-800/50 rounded-lg p-4">
                    <div className="text-sm font-medium text-slate-300 mb-2">Net Profit Margin</div>
                    <div className="text-xl font-bold text-green-400 mb-3">35.2%</div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-slate-500">Net Income</div>
                      <div className="w-12 h-px bg-slate-600 my-1"></div>
                      <div className="text-xs text-slate-500 mb-2">Revenue</div>
                      <div className="text-sm font-medium text-slate-300">7,500 / 21,300</div>
                    </div>
                  </div>
                  
                  <div className="text-center bg-slate-800/50 rounded-lg p-4">
                    <div className="text-sm font-medium text-slate-300 mb-2">Asset Turnover</div>
                    <div className="text-xl font-bold text-yellow-400 mb-3">0.64x</div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-slate-500">Revenue</div>
                      <div className="w-12 h-px bg-slate-600 my-1"></div>
                      <div className="text-xs text-slate-500 mb-2">Total Assets</div>
                      <div className="text-sm font-medium text-slate-300">21,300 / 33,280</div>
                    </div>
                  </div>
                </div>
                {/* Separator */}
                <div className="flex items-center justify-center w-full mb-6">
                  <div className="w-1/3 h-px bg-slate-700"></div>
                  <div className="mx-3 text-slate-500 font-medium">×</div>
                  <div className="w-1/3 h-px bg-slate-700"></div>
                </div>
                {/* Detail Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div className="text-center bg-slate-800/30 rounded-lg p-3">
                    <div className="text-sm font-medium text-slate-300 mb-1">Operating Margin</div>
                    <div className="text-lg font-bold text-purple-400 mb-2">42.5%</div>
                    <div className="text-xs text-slate-500">9,052 / 21,300</div>
                  </div>
                  <div className="text-center bg-slate-800/30 rounded-lg p-3">
                    <div className="text-sm font-medium text-slate-300 mb-1">Tax Burden</div>
                    <div className="text-lg font-bold text-orange-400 mb-2">82.8%</div>
                    <div className="text-xs text-slate-500">7,500 / 9,052</div>
                  </div>
                  <div className="text-center bg-slate-800/30 rounded-lg p-3">
                    <div className="text-sm font-medium text-slate-300 mb-1">Financial Leverage</div>
                    <div className="text-lg font-bold text-pink-400 mb-2">1.56x</div>
                    <div className="text-xs text-slate-500">33,280 / 21,330</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Currency Performance */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Currency Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {isChartLoading && (
                <div className="w-full h-64 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />
                    <span className="text-slate-400 text-sm">Đang cập nhật...</span>
                  </div>
                </div>
              )}
              <div ref={radarChartRef} className={`w-full h-64 ${isChartLoading ? 'hidden' : ''}`}></div>
              <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-slate-700">
                <span className="text-slate-400">Last updated: 12:45 PM</span>
                <Button variant="link" size="sm" className="text-blue-400 p-0 h-auto">View details</Button>
              </div>
            </CardContent>
          </Card>

          {/* Market Distribution */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Market Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {isChartLoading && (
                <div className="w-full h-64 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />
                    <span className="text-slate-400 text-sm">Đang cập nhật...</span>
                  </div>
                </div>
              )}
              <div ref={doughnutChartRef} className={`w-full h-64 ${isChartLoading ? 'hidden' : ''}`}></div>
              <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-slate-700">
                <span className="text-slate-400">Total Volume: $5.8T</span>
                <Button variant="link" size="sm" className="text-blue-400 p-0 h-auto">View details</Button>
              </div>
            </CardContent>
          </Card>

          {/* Currency Strength */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Currency Strength</CardTitle>
            </CardHeader>
            <CardContent>
              {isChartLoading && (
                <div className="w-full h-64 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />
                    <span className="text-slate-400 text-sm">Đang cập nhật...</span>
                  </div>
                </div>
              )}
              <div ref={heatmapChartRef} className={`w-full h-64 ${isChartLoading ? 'hidden' : ''}`}></div>
              <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-slate-700">
                <span className="text-slate-400">Last updated: 12:45 PM</span>
                <Button variant="link" size="sm" className="text-blue-400 p-0 h-auto">View detailed analysis</Button>
              </div>
            </CardContent>
          </Card>

          {/* Market Overview */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { symbol: stockCode, price: '1.0845', change: '+0.0035', changePercent: '+0.32%', isPositive: true },
                  { symbol: 'GBP/USD', price: '1.2732', change: '+0.0023', changePercent: '+0.18%', isPositive: true },
                  { symbol: 'USD/JPY', price: '153.42', change: '-0.69', changePercent: '-0.45%', isPositive: false },
                  { symbol: 'AUD/USD', price: '0.6614', change: '+0.0028', changePercent: '+0.42%', isPositive: true },
                  { symbol: 'USD/CAD', price: '1.3642', change: '-0.0037', changePercent: '-0.27%', isPositive: false }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0">
                    <span className="text-sm font-medium text-white">{item.symbol}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-white">{item.price}</span>
                      <span className={`text-sm ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {item.change} ({item.changePercent})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Economic Calendar */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Economic Calendar</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">June 20, 2025</span>
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {[
                  { time: '14:30', importance: 'Medium', title: 'US Initial Jobless Claims', forecast: '235K', color: 'yellow' },
                  { time: '15:00', importance: 'High', title: 'ECB Interest Rate Decision', forecast: '3.75%', color: 'red' },
                  { time: '15:30', importance: 'Low', title: 'US Philly Fed Manufacturing Index', forecast: '10.2', color: 'green' }
                ].map((item, index) => (
                  <div key={index} className={`p-3 border-l-4 bg-${item.color}-500/5 rounded`} style={{ borderLeftColor: item.color === 'yellow' ? '#eab308' : item.color === 'red' ? '#ef4444' : '#10b981' }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-white">{item.time}</span>
                          <Badge variant="secondary" className={`bg-${item.color}-500/20 text-${item.color}-400`}>
                            {item.importance}
                          </Badge>
                        </div>
                        <h4 className="text-sm font-medium mt-1 text-white">{item.title}</h4>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-400">Forecast</span>
                        <span className="text-sm font-medium text-white">{item.forecast}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Analysis */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Technical Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { period: '1 Hour', signal: 'SELL', color: 'red' },
                  { period: '4 Hour', signal: 'SELL', color: 'red' },
                  { period: 'Daily', signal: 'BUY', color: 'green' },
                  { period: 'Weekly', signal: 'BUY', color: 'green' }
                ].map((item, index) => (
                  <div key={index} className="text-center p-3 bg-slate-800 rounded-lg">
                    <h4 className="text-xs text-slate-400 mb-1">{item.period}</h4>
                    <div className={`text-sm font-medium ${item.color === 'green' ? 'text-green-400' : 'text-red-400'}`}>
                      {item.signal}
                    </div>
                  </div>
                ))}
              </div>
              {isChartLoading && (
                <div className="w-full h-40 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />
                    <span className="text-slate-400 text-sm">Đang cập nhật...</span>
                  </div>
                </div>
              )}
              <div ref={technicalChartRef} className={`w-full h-40 ${isChartLoading ? 'hidden' : ''}`}></div>
            </CardContent>
          </Card>

          {/* Momentum Rank */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <CardTitle className="text-xl text-white">Xếp hạng động lượng</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500">Cập nhật: 20/06/2025</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Chỉ báo kỹ thuật */}
                <div>
                  <h3 className="text-xs font-medium mb-2">Chỉ báo kỹ thuật</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">RSI (14)</span>
                        <span className="text-xs text-slate-300">72.5</span>
                      </div>
                      <Progress value={72} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">MACD</span>
                        <span className="text-xs text-slate-300">+0.35</span>
                      </div>
                      <Progress value={65} className="bg-gray-200 [&_.bg-primary]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">Stochastic</span>
                        <span className="text-xs text-slate-300">85.2</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">ADX</span>
                        <span className="text-xs text-slate-300">32.4</span>
                      </div>
                      <Progress value={32} className="bg-gray-200 [&_.bg-primary]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">CCI</span>
                        <span className="text-xs text-slate-300">+156.8</span>
                      </div>
                      <Progress value={78} />
                    </div>
                  </div>
                </div>
                {/* Biến động giá */}
                <div>
                  <h3 className="text-xs font-medium mb-2">Biến động giá</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">1 tuần</span>
                        <span className="text-xs text-green-500">+6.5%</span>
                      </div>
                      <Progress value={65} className="bg-gray-200 [&_.bg-primary]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">1 tháng</span>
                        <span className="text-xs text-green-500">+12.8%</span>
                      </div>
                      <Progress value={85} className="bg-gray-200 [&_.bg-primary]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">3 tháng</span>
                        <span className="text-xs text-green-500">+18.5%</span>
                      </div>
                      <Progress value={92} className="bg-gray-200 [&_.bg-primary]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">6 tháng</span>
                        <span className="text-xs text-green-500">+24.2%</span>
                      </div>
                      <Progress value={78} className="bg-gray-200 [&_.bg-primary]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">1 năm</span>
                        <span className="text-xs text-green-500">+42.8%</span>
                      </div>
                      <Progress value={95} className="bg-gray-200 [&_.bg-primary]:bg-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dividend & Yield Rank */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-white">Xếp hạng cổ tức & Lợi suất</CardTitle>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500">Cập nhật: 20/06/2025</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cổ tức tiền mặt */}
                <div>
                  <h3 className="text-xs font-medium mb-2">Cổ tức tiền mặt (theo năm)</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">2024</span>
                        <span className="text-xs text-slate-300">12.8</span>
                      </div>
                      <Progress value={72} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">2023</span>
                        <span className="text-xs text-slate-300">11.2</span>
                      </div>
                      <Progress value={65} className="bg-gray-200 [&_.bg-primary]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">2022</span>
                        <span className="text-xs text-slate-300">10.5</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">2021</span>
                        <span className="text-xs text-slate-300">9.8</span>
                      </div>
                      <Progress value={32} className="bg-gray-200 [&_.bg-primary]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">2020</span>
                        <span className="text-xs text-slate-300">8.2</span>
                      </div>
                      <Progress value={78} />
                    </div>
                  </div>
                </div>
                {/* Lợi suất cổ tức */}
                <div>
                  <h3 className="text-xs font-medium mb-2">Lợi suất cổ tức (theo mã cổ phiếu/ngành)</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">Mã cổ phiếu</span>
                        <span className="text-xs text-slate-300">7.8%</span>
                      </div>
                      <Progress value={72} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">Ngành</span>
                        <span className="text-xs text-slate-300">6.5%</span>
                      </div>
                      <Progress value={65} className="bg-gray-200 [&_.bg-primary]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">VN Index</span>
                        <span className="text-xs text-slate-300">5.2%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">VN30</span>
                        <span className="text-xs text-slate-300">4.8%</span>
                      </div>
                      <Progress value={32} className="bg-gray-200 [&_.bg-primary]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs w-24 text-slate-400">HNX</span>
                        <span className="text-xs text-slate-300">3.5%</span>
                      </div>
                      <Progress value={78} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Strength */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-white">Điểm mạnh</CardTitle>
              <span className="text-xs text-gray-500">Cập nhật: 18/06/2025</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "Tăng trưởng doanh thu", value: 85 },
                  { label: "Biên lợi nhuận", value: 72 },
                  { label: "ROE", value: 68 },
                  { label: "Chất lượng tài sản", value: 76 },
                  { label: "Thanh khoản", value: 82 },
                  { label: "Quản trị rủi ro", value: 79 },
                  { label: "Chuyển đổi số", value: 90 }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium">{item.label}</span>
                      <span className="text-xs font-medium">{item.value}%</span>
                    </div>
                    <Progress value={item.value} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profitability Rank */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-white">Xếp hạng khả năng sinh lời</CardTitle>
              <span className="text-xs text-gray-500">So với ngành</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "ROE", value: 85, text: "22.5%" },
                  { label: "ROA", value: 75, text: "1.8%" },
                  { label: "NIM", value: 80, text: "4.2%" },
                  { label: "CIR", value: 70, text: "35.8%" },
                  { label: "CASA", value: 60, text: "22.4%" },
                  { label: "Tỷ lệ nợ xấu", value: 82, text: "1.2%" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-xs w-28">{item.label}</span>
                    <div className="flex-1 flex items-center">
                      <div className="w-full bg-gray-200 h-4 rounded-sm overflow-hidden">
                        <div className={`${item.value}%`} style={{ width: `${item.value}%` }}></div>
                      </div>
                      <span className="ml-2 text-xs font-medium">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* EPS Rank */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-white">Xếp hạng EPS</CardTitle>
              <span className="text-xs text-gray-500">So với Top 10 ngân hàng</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "VCB", value: 95, text: "7,250" },
                  { label: "TCB", value: 92, text: "6,820" },
                  { label: "MBB", value: 88, text: "6,450" },
                  { label: "MIL", value: 85, text: "6,120", highlight: true },
                  { label: "ACB", value: 82, text: "5,980" },
                  { label: "VPB", value: 78, text: "5,640" },
                  { label: "HDB", value: 65, text: "4,850" }
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center${item.highlight ? " font-medium text-primary" : ""}`}>
                    <span className={`text-xs w-28${item.highlight ? " text-primary" : ""}`}>{item.label}</span>
                    <div className="flex-1 flex items-center">
                      <div className="w-full bg-gray-200 h-4 rounded-sm overflow-hidden">
                        <div className={`${item.highlight ? "bg-primary" : "bg-green-500"} h-full`} style={{ width: `${item.value}%` }}></div>
                      </div>
                      <span className={`ml-2 text-xs font-medium${item.highlight ? " text-primary" : ""}`}>{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Warning Signs */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-white">Tín hiệu cảnh báo</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Giá cổ phiếu đã tăng 15% trong 5 phiên gần nhất</AlertTitle>
                <AlertDescription>
                  Có thể xuất hiện áp lực chốt lời trong ngắn hạn.
                </AlertDescription>
              </Alert>
              <div className="space-y-3">
                {[
                  { color: "green", text: "RSI (14) đang ở vùng quá mua", value: "72.5" },
                  { color: "green", text: "Khối ngoại bán ròng 5 phiên liên tiếp", value: "-125 tỷ" },
                  { color: "yellow", text: "P/E cao hơn trung bình ngành", value: "+12%" },
                  { color: "yellow", text: "Tỷ lệ dự phòng/nợ xấu giảm nhẹ", value: "-2.5%" },
                  { color: "red", text: "Biến động giá cao hơn trung bình 20 phiên", value: "+35%" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className={`w-2 h-2 bg-${item.color}-500 rounded-full mr-2`}></div>
                    <span className="text-xs flex-1">{item.text}</span>
                    <span className="text-xs font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ownership & Insider Details */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-white">Sở hữu & Giao dịch nội bộ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-medium mb-2">Cơ cấu sở hữu</h3>
                  {isChartLoading && (
                    <div className="h-40 w-full flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />
                        <span className="text-slate-400 text-sm">Đang cập nhật...</span>
                      </div>
                    </div>
                  )}
                  <div ref={ownershipChartRef} className={`h-40 w-full ${isChartLoading ? 'hidden' : ''}`} />
                </div>
                <div>
                  <h3 className="text-xs font-medium mb-2">So sánh P/E</h3>
                  {isChartLoading && (
                    <div className="h-24 w-full flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />
                        <span className="text-slate-400 text-sm">Đang cập nhật...</span>
                      </div>
                    </div>
                  )}
                  <div ref={peComparisonChartRef} className={`h-24 w-full ${isChartLoading ? 'hidden' : ''}`} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Ratios */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-white">Các tỷ số chính</CardTitle>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Hiệu quả hoạt động */}
              <div>
                <h3 className="text-xs font-medium mb-2">Hiệu quả hoạt động</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">ROE</span>
                    <span className="text-xs text-gray-500 font-medium">22.5%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">ROA</span>
                    <span className="text-xs text-gray-500 font-medium">1.8%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">NIM</span>
                    <span className="text-xs text-gray-500 font-medium">4.2%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">CIR</span>
                    <span className="text-xs text-gray-500 font-medium">35.8%</span>
                  </div>
                </div>
              </div>
              {/* Chất lượng tài sản */}
              <div>
                <h3 className="text-xs font-medium mb-2">Chất lượng tài sản</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">NPL</span>
                    <span className="text-xs text-gray-500 font-medium">1.2%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">LLR/NPL</span>
                    <span className="text-xs text-gray-500 font-medium">165%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">Credit cost</span>
                    <span className="text-xs text-gray-500 font-medium">1.1%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">Nợ xấu nhóm 2</span>
                    <span className="text-xs text-gray-500 font-medium">1.8%</span>
                  </div>
                </div>
              </div>
              {/* Thanh khoản & Vốn */}
              <div>
                <h3 className="text-xs font-medium mb-2">Thanh khoản & Vốn</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">LDR</span>
                    <span className="text-xs text-gray-500 font-medium">78.5%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">CAR</span>
                    <span className="text-xs text-gray-500 font-medium">12.8%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">CASA</span>
                    <span className="text-xs text-gray-500 font-medium">22.4%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                    <span className="text-xs text-gray-500">Tier 1 ratio</span>
                    <span className="text-xs text-gray-500 font-medium">10.5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

// Add ECharts to window type
declare global {
  interface Window {
    echarts: any;
  }
}