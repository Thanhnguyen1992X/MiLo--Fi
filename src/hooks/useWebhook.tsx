
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { WebhookAPI } from '@/api/webhook';
import { useToast } from '@/hooks/use-toast';

interface WebhookStats {
  totalReceived: number;
  totalSent: number;
  successRate: number;
  lastActivity: string | null;
}

export const useWebhook = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<WebhookStats>({
    totalReceived: 0,
    totalSent: 0,
    successRate: 0,
    lastActivity: null
  });
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (user) {
      loadWebhookStats();
      startWebhookListener();
    }
  }, [user]);

  const loadWebhookStats = async () => {
    // This would typically load from your database
    // For now, we'll simulate with localStorage
    const savedStats = localStorage.getItem(`webhook_stats_${user?.id}`);
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  };

  const updateStats = (type: 'received' | 'sent', success: boolean = true) => {
    setStats(prev => {
      const newStats = {
        ...prev,
        [type === 'received' ? 'totalReceived' : 'totalSent']: prev[type === 'received' ? 'totalReceived' : 'totalSent'] + 1,
        lastActivity: new Date().toISOString()
      };
      
      // Calculate success rate
      const total = newStats.totalReceived + newStats.totalSent;
      newStats.successRate = total > 0 ? ((newStats.totalReceived + newStats.totalSent) / total) * 100 : 0;
      
      // Save to localStorage
      localStorage.setItem(`webhook_stats_${user?.id}`, JSON.stringify(newStats));
      
      return newStats;
    });
  };

  const startWebhookListener = () => {
    setIsListening(true);
    // In a real implementation, this would set up a proper webhook listener
    console.log('Webhook listener started for user:', user?.id);
  };

  const stopWebhookListener = () => {
    setIsListening(false);
    console.log('Webhook listener stopped');
  };

  const processIncomingWebhook = async (data: any) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      // Validate webhook data
      if (!WebhookAPI.validateWebhookData(data)) {
        throw new Error('Invalid webhook data format');
      }

      // Process the webhook
      const result = await WebhookAPI.receiveWebhook(data, user.id);
      
      if (result.success) {
        updateStats('received', true);
        toast({
          title: "Webhook Received",
          description: `New message from ${data.sender}`,
        });
      } else {
        updateStats('received', false);
        toast({
          title: "Webhook Error",
          description: result.error || "Failed to process webhook",
          variant: "destructive",
        });
      }

      return result;
    } catch (error) {
      console.error('Error processing webhook:', error);
      updateStats('received', false);
      return { success: false, error: error.message };
    }
  };

  const sendWebhookResponse = async (responseData: any, messageId?: string) => {
    try {
      const result = await WebhookAPI.sendWebhookResponse(responseData, messageId);
      
      if (result.success) {
        updateStats('sent', true);
        toast({
          title: "Response Sent",
          description: "Webhook response sent successfully",
        });
      } else {
        updateStats('sent', false);
        toast({
          title: "Send Failed",
          description: `Failed to send response: ${result.status}`,
          variant: "destructive",
        });
      }

      return result;
    } catch (error) {
      console.error('Error sending webhook response:', error);
      updateStats('sent', false);
      return { success: false, error: error.message };
    }
  };

  return {
    stats,
    isListening,
    startWebhookListener,
    stopWebhookListener,
    processIncomingWebhook,
    sendWebhookResponse,
  };
};
