import { useEffect, useRef } from 'react';
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
  Shield
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const FinancialDashboard = () => {
  const mainChartRef = useRef<HTMLDivElement>(null);
  const radarChartRef = useRef<HTMLDivElement>(null);
  const sankeyChartRef = useRef<HTMLDivElement>(null);
  const doughnutChartRef = useRef<HTMLDivElement>(null);
  const heatmapChartRef = useRef<HTMLDivElement>(null);
  const technicalChartRef = useRef<HTMLDivElement>(null);
  const ownershipChartRef = useRef<HTMLDivElement>(null);
  const peComparisonChartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showWidgetMenu, setShowWidgetMenu] = useState(false);

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

  const initializeCharts = () => {
    if (!window.echarts) return;

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
              name: 'EUR/USD',
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
            { value: 35, name: 'EUR/USD', itemStyle: { color: '#3b82f6' } },
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
  };

  const handleAddWidget = () => setShowWidgetMenu(true);
  const handleSelectProWidget = () => {
    setShowWidgetMenu(false);
    navigate('/n8ndashboard');
  };

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

        {/* Market Ticker */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-8 overflow-x-auto">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">S&P 500</span>
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
              <h3 className="font-medium text-white">EUR/USD</h3>
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
            <div ref={mainChartRef} className="w-full h-96"></div>
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

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Currency Performance */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Currency Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={radarChartRef} className="w-full h-64"></div>
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
              <div ref={doughnutChartRef} className="w-full h-64"></div>
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
              <div ref={heatmapChartRef} className="w-full h-64"></div>
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
                  { symbol: 'EUR/USD', price: '1.0845', change: '+0.0035', changePercent: '+0.32%', isPositive: true },
                  { symbol: 'GBP/USD', price: '1.2732', change: '+0.0023', changePercent: '+0.18%', isPositive: true },
                  { symbol: 'USD/JPY', price: '153.42', change: '-0.69', changePercent: '-0.45%', isPositive: false },
                  { symbol: 'AUD/USD', price: '0.6614', change: '+0.0028', changePercent: '+0.42%', isPositive: true },
                  { symbol: 'USD/CAD', price: '1.3642', change: '-0.0037', changePercent: '-0.27%', isPositive: false }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0">
                    <span className="text-sm font-medium">{item.symbol}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">{item.price}</span>
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
                          <span className="text-xs font-medium">{item.time}</span>
                          <Badge variant="secondary" className={`bg-${item.color}-500/20 text-${item.color}-400`}>
                            {item.importance}
                          </Badge>
                        </div>
                        <h4 className="text-sm font-medium mt-1">{item.title}</h4>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-400">Forecast</span>
                        <span className="text-sm font-medium">{item.forecast}</span>
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
              <div ref={technicalChartRef} className="w-full h-40"></div>
            </CardContent>
          </Card>
        </div>

        {/* News Feed Widget */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Market News</CardTitle>
            <Tabs defaultValue="forex" className="mt-2">
              <TabsList>
                <TabsTrigger value="forex">Forex</TabsTrigger>
                <TabsTrigger value="global">Global</TabsTrigger>
              </TabsList>
              <TabsContent value="forex">
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {[
                    {
                      title: "ECB Expected to Hold Rates Steady Amid Inflation Concerns",
                      desc: "The European Central Bank is expected to maintain current interest rates in today's meeting as inflation remains above target despite recent economic data showing signs of cooling.",
                      source: "Bloomberg",
                      time: "2 hours ago"
                    },
                    {
                      title: "Dollar Weakens as Fed Officials Signal Potential Rate Cut",
                      desc: "The US dollar declined against major currencies after Federal Reserve officials hinted at a possible rate cut in September, citing improving inflation metrics and labor market concerns.",
                      source: "Reuters",
                      time: "4 hours ago"
                    },
                    {
                      title: "Bank of Japan Maintains Ultra-Loose Monetary Policy",
                      desc: "The Bank of Japan kept its ultra-loose monetary policy unchanged in its latest meeting, continuing to buck the global trend of monetary tightening despite the yen's recent weakness.",
                      source: "Financial Times",
                      time: "6 hours ago"
                    },
                    {
                      title: "GBP/USD Rallies on Strong UK Retail Sales Data",
                      desc: "The British pound strengthened against the US dollar following better-than-expected UK retail sales data, which showed a 0.8% increase month-over-month, exceeding analyst forecasts of 0.3%.",
                      source: "CNBC",
                      time: "8 hours ago"
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 border-b border-slate-700">
                      <h4 className="text-sm font-medium mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400 mb-2">{item.desc}</p>
                      <div className="flex items-center text-xs text-slate-500">
                        <span>{item.source}</span>
                        <span className="mx-2">•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="global">
                <div className="p-3 text-xs text-slate-400">No global news available.</div>
              </TabsContent>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="w-full text-xs text-primary hover:underline">View all news</Button>
          </CardContent>
        </Card>

        {/* Trading Signals Widget */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Trading Signals</CardTitle>
            <Button variant="ghost" size="sm" className="ml-auto"><RefreshCw className="w-4 h-4" /></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[
                {
                  pair: "EUR/USD",
                  type: "BUY",
                  entry: "1.0835",
                  tp: "1.0890",
                  sl: "1.0805",
                  timeframe: "4H",
                  strength: 75
                },
                {
                  pair: "GBP/JPY",
                  type: "SELL",
                  entry: "195.40",
                  tp: "194.60",
                  sl: "195.80",
                  timeframe: "1D",
                  strength: 85
                },
                {
                  pair: "USD/CAD",
                  type: "SELL",
                  entry: "1.3650",
                  tp: "1.3580",
                  sl: "1.3685",
                  timeframe: "4H",
                  strength: 65
                }
              ].map((item, idx) => (
                <div key={idx} className="p-3 border-b border-slate-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{item.pair}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${item.type === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{item.type}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-slate-400">
                        <span>Entry: {item.entry}</span>
                        <span>TP: {item.tp}</span>
                        <span>SL: {item.sl}</span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">{item.timeframe}</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-slate-400">Signal strength</div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                      <div className={`${item.type === "BUY" ? "bg-green-400" : "bg-red-400"} h-1.5 rounded-full`} style={{ width: `${item.strength}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-slate-400">Last updated: 12:45 PM</span>
              <Button variant="link" className="text-xs text-primary hover:underline">View all signals</Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Strength Widget */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Điểm mạnh</CardTitle>
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

        {/* Profitability Rank Widget */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Xếp hạng khả năng sinh lời</CardTitle>
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
                      <div className="bg-green-500 h-full" style={{ width: `${item.value}%` }}></div>
                    </div>
                    <span className="ml-2 text-xs font-medium">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* EPS Rank Widget */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Xếp hạng EPS</CardTitle>
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

        {/* Warning Signs Widget */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Tín hiệu cảnh báo</CardTitle>
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

        {/* Ownership & Insider Details Widget */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Sở hữu & Giao dịch nội bộ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-medium mb-2">Cơ cấu sở hữu</h3>
                <div ref={ownershipChartRef} className="h-40 w-full" />
              </div>
              <div>
                <h3 className="text-xs font-medium mb-2">So sánh P/E</h3>
                <div ref={peComparisonChartRef} className="h-24 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// Add ECharts to window type
declare global {
  interface Window {
    echarts: any;
  }
} 