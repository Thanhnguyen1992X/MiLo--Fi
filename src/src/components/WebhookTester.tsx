
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WebhookAPI } from '@/api/webhook';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Send, TestTube, CheckCircle, XCircle } from 'lucide-react';

export const WebhookTester = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [testMessage, setTestMessage] = useState('');
  const [senderName, setSenderName] = useState('n8n Test');
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const handleTestWebhook = async () => {
    if (!user || !testMessage.trim()) return;

    setLoading(true);
    try {
      const webhookData = {
        message: testMessage,
        sender: senderName,
        timestamp: new Date().toISOString(),
        messageId: `test-${Date.now()}`
      };

      const result = await WebhookAPI.receiveWebhook(webhookData, user.id);
      setLastResult(result);

      if (result.success) {
        toast({
          title: "Webhook Test Successful",
          description: "Test message has been processed successfully",
        });
        setTestMessage('');
      } else {
        toast({
          title: "Webhook Test Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Test webhook error:', error);
      toast({
        title: "Test Error",
        description: "Failed to test webhook",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendDirectWebhook = async () => {
    if (!testMessage.trim()) return;

    setLoading(true);
    try {
      const responseData = {
        response: testMessage,
        originalMessageId: `direct-${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'test'
      };

      const result = await WebhookAPI.sendWebhookResponse(responseData);
      setLastResult(result);

      if (result.success) {
        toast({
          title: "Direct Webhook Sent",
          description: "Message sent directly to webhook endpoint",
        });
        setTestMessage('');
      } else {
        toast({
          title: "Webhook Send Failed",
          description: `Failed to send: ${result.status}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Direct webhook error:', error);
      toast({
        title: "Send Error",
        description: "Failed to send direct webhook",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <TestTube className="w-5 h-5" />
          <span>Webhook Tester</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Sender Name
          </label>
          <Input
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="n8n Test"
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Test Message
          </label>
          <Textarea
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Enter test message..."
            className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
          />
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={handleTestWebhook}
            disabled={loading || !testMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
            ) : (
              <TestTube className="w-4 h-4 mr-2" />
            )}
            Test Receive
          </Button>
          
          <Button
            onClick={handleSendDirectWebhook}
            disabled={loading || !testMessage.trim()}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 flex-1"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-300/30 border-t-slate-300 rounded-full animate-spin mr-2"></div>
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Send Direct
          </Button>
        </div>

        {lastResult && (
          <div className="mt-4 p-3 rounded-lg bg-slate-800">
            <div className="flex items-center space-x-2 mb-2">
              {lastResult.success ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span className="text-sm font-medium text-white">
                Last Result: {lastResult.success ? 'Success' : 'Failed'}
              </span>
            </div>
            <pre className="text-xs text-slate-300 overflow-x-auto">
              {JSON.stringify(lastResult, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
