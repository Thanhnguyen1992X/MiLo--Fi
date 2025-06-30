import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, X } from 'lucide-react';

interface VoiceControlsProps {
  onCommand: (command: string) => void;
  onClose: () => void;
}

export const VoiceControls = ({ onCommand, onClose }: VoiceControlsProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if Speech Recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }
  }, []);

  const startListening = () => {
    if (!isSupported) return;

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const newRecognition = new SpeechRecognition();
    
    newRecognition.continuous = true;
    newRecognition.interimResults = true;
    newRecognition.lang = 'vi-VN';

    newRecognition.onstart = () => {
      setIsListening(true);
    };

    newRecognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
      
      if (event.results[current].isFinal) {
        onCommand(transcript);
        processVoiceCommand(transcript);
      }
    };

    newRecognition.onerror = () => {
      setIsListening(false);
    };

    newRecognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(newRecognition);
    newRecognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('tìm kiếm') || lowerCommand.includes('search')) {
      // Handle search command
      console.log('Voice search command:', command);
    } else if (lowerCommand.includes('lọc') || lowerCommand.includes('filter')) {
      // Handle filter command
      console.log('Voice filter command:', command);
    } else if (lowerCommand.includes('đọc') || lowerCommand.includes('read')) {
      // Handle text-to-speech command
      speakText("Đang đọc thông tin thị trường cho bạn");
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return (
      <Card className="fixed bottom-4 right-4 bg-slate-800 border-slate-700 z-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="text-red-400">
              <MicOff className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-medium">Voice không được hỗ trợ</p>
              <p className="text-slate-400 text-sm">Trình duyệt không hỗ trợ Speech Recognition</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 bg-slate-800 border-slate-700 z-50 w-80">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`} />
            <span className="text-white font-medium">Voice Controls</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-700 rounded-lg p-3 min-h-[60px]">
            <p className="text-slate-300 text-sm mb-1">Transcript:</p>
            <p className="text-white">{transcript || 'Nói gì đó...'}</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={isListening ? stopListening : startListening}
              className={`flex-1 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isListening ? 'Dừng' : 'Bắt đầu'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => speakText('Xin chào, tôi là trợ lý voice của Market Screener')}
              className="bg-slate-700 border-slate-600"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-xs text-slate-400 space-y-1">
            <p>• "Tìm kiếm chứng khoán VIC"</p>
            <p>• "Lọc bất động sản quận 1"</p>
            <p>• "Đọc thông tin thị trường"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
