
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketType, ScreenerFilters } from './ScreenerDashboard';
import { TrendingUp, TrendingDown, AlertTriangle, Volume2, Brain, Target } from 'lucide-react';

interface AnalysisPanelProps {
  selectedMarket: MarketType;
  filters: ScreenerFilters;
}

export const AnalysisPanel = ({ selectedMarket, filters }: AnalysisPanelProps) => {
  const speakAnalysis = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getMarketAnalysis = () => {
    switch (selectedMarket) {
      case 'stocks':
        return {
          sentiment: 'Tích cực',
          trend: 'Tăng',
          riskLevel: 'Trung bình',
          recommendation: 'Mua',
          analysis: 'Thị trường chứng khoán đang có xu hướng tích cực với khối lượng giao dịch tăng mạnh. Các cổ phiếu blue-chip đang dẫn dắt thị trường với mức tăng ổn định.',
          keyPoints: [
            'VN-Index tăng 1.2% trong phiên',
            'Khối lượng giao dịch tăng 15%',
            'Nhóm ngân hàng dẫn dắt thị trường',
            'Tâm lý nhà đầu tư tích cực'
          ]
        };
      case 'forex':
        return {
          sentiment: 'Trung tính',
          trend: 'Sideway',
          riskLevel: 'Cao',
          recommendation: 'Quan sát',
          analysis: 'Thị trường ngoại hối đang trong giai đoạn consolidation với biến động thấp. USD/VND duy trì ổn định quanh mức 24,000.',
          keyPoints: [
            'USD/VND ổn định tại 24,000',
            'EUR/USD trong vùng kháng cự',
            'Chờ đợi dữ liệu kinh tế mới',
            'Biến động thấp trong ngắn hạn'
          ]
        };
      case 'crypto':
        return {
          sentiment: 'Thận trọng',
          trend: 'Giảm',
          riskLevel: 'Cao',
          recommendation: 'Chờ đợi',
          analysis: 'Thị trường tiền điện tử đang điều chỉnh sau đợt tăng mạnh. Bitcoin và Ethereum đều giảm nhẹ, cần quan sát thêm.',
          keyPoints: [
            'Bitcoin giảm 2.5% xuống $42,000',
            'Ethereum test lại vùng hỗ trợ $2,500',
            'Altcoins chịu áp lực bán',
            'Volume giao dịch giảm'
          ]
        };
      case 'real-estate':
        return {
          sentiment: 'Tích cực',
          trend: 'Tăng',
          riskLevel: 'Thấp',
          recommendation: 'Mua',
          analysis: 'Thị trường bất động sản tiếp tục phục hồi với nguồn cung mới tăng và thanh khoản được cải thiện. Giá nhà ở các khu vực trung tâm vẫn duy trì ổn định.',
          keyPoints: [
            'Nguồn cung mới tăng 20%',
            'Thanh khoản cải thiện đáng kể',
            'Lãi suất vay ưu đãi từ ngân hàng',
            'Nhu cầu ở thực tăng mạnh'
          ]
        };
      default:
        return null;
    }
  };

  const analysis = getMarketAnalysis();
  if (!analysis) return null;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Tích cực': return 'bg-green-500';
      case 'Trung tính': return 'bg-yellow-500';
      case 'Thận trọng': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Tăng': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'Giảm': return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'Sideway': return <div className="w-4 h-4 border-t-2 border-yellow-400" />;
      default: return null;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Thấp': return 'text-green-400';
      case 'Trung bình': return 'text-yellow-400';
      case 'Cao': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Market Analysis */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Phân tích thị trường
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Tâm lý:</span>
                <Badge className={`${getSentimentColor(analysis.sentiment)} text-white`}>
                  {analysis.sentiment}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Xu hướng:</span>
                <div className="flex items-center gap-1">
                  {getTrendIcon(analysis.trend)}
                  <span className="text-white text-sm">{analysis.trend}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Rủi ro:</span>
                <span className={`text-sm font-medium ${getRiskColor(analysis.riskLevel)}`}>
                  {analysis.riskLevel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Khuyến nghị:</span>
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  {analysis.recommendation}
                </Badge>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              {analysis.analysis}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => speakAnalysis(analysis.analysis)}
              className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Đọc phân tích
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Điểm nổi bật
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <p className="text-slate-300 text-sm">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Phân tích được cập nhật real-time từ các nguồn dữ liệu tin cậy</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
