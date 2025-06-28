import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Send, MessageCircle, Coins, AlertCircle, Webhook, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { WebhookTester } from '@/components/WebhookTester';

interface Message {
  id: string;
  message: string;
  response: string | null;
  tokens_used: number;
  timestamp: string;
  user_id: string;
  sender?: string | null;
  message_type: 'user' | 'webhook' | 'system';
  webhook_status?: 'pending' | 'sent' | 'failed' | null;
  original_message_id?: string | null;
}

interface WebhookMessage {
  message: string;
  sender: string;
  timestamp: string;
  messageId: string;
}

export const Chat = () => {
  const { user } = useAuth();
  const { profile, updateTokens } = useProfile();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [webhookEndpoint] = useState('https://milo.tail15c919.ts.net/webhook/2ca7bf16-03cb-458f-a1fc-eeb5f8151b33');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (user) {
      fetchMessages();
      // Set up webhook listener
      setupWebhookListener();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const setupWebhookListener = () => {
    // Listen for new webhook messages in real-time
    const channel = supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchMessages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        // Cast the data to Message[] since we know the schema now matches
        setMessages((data as Message[]) || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendWebhookResponse = async (originalMessage: Message) => {
    try {
      const responseData = {
        response: `Đã nhận tin nhắn: "${originalMessage.message}"`,
        originalMessageId: originalMessage.original_message_id || originalMessage.id,
        timestamp: new Date().toISOString(),
        status: 'received'
      };

      const response = await fetch(webhookEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseData),
      });

      // Update message status
      const status = response.ok ? 'sent' : 'failed';
      await supabase
        .from('chat_messages')
        .update({ webhook_status: status })
        .eq('id', originalMessage.id);

      if (response.ok) {
        toast({
          title: "Webhook Response Sent",
          description: "Phản hồi đã được gửi thành công",
        });
      } else {
        toast({
          title: "Webhook Failed",
          description: "Không thể gửi phản hồi webhook",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error sending webhook response:', error);
      await supabase
        .from('chat_messages')
        .update({ webhook_status: 'failed' })
        .eq('id', originalMessage.id);
      
      toast({
        title: "Webhook Error",
        description: "Lỗi khi gửi phản hồi webhook",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentMessage.trim() || !user || !profile) return;

    if (profile.tokens_remaining < 5) {
      toast({
        title: "Insufficient Tokens",
        description: "You need at least 5 tokens to send a message.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const messageText = currentMessage.trim();
    setCurrentMessage('');

    try {
      // Gửi message tới webhook n8n
      const webhookRes = await fetch(webhookEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });
      let aiResponse = '';
      if (webhookRes.ok) {
        const webhookData: any = await webhookRes.json();

        // Hàm lấy output từ bất kỳ cấu trúc nào
        function extractOutput(data: any): string | undefined {
          if (!data) return undefined;
          if (Array.isArray(data)) {
            for (const item of data) {
              const found = extractOutput(item);
              if (found) return found;
            }
          } else if (typeof data === 'object') {
            if (data.output) return data.output;
            if (data.body?.output) return data.body.output;
            if (data.response?.body?.output) return data.response.body.output;
            // Duyệt sâu hơn nếu cần
            for (const key of Object.keys(data)) {
              const found = extractOutput(data[key]);
              if (found) return found;
            }
          }
          return undefined;
        }

        const output = extractOutput(webhookData);
        aiResponse = output || 'Không nhận được phản hồi từ webhook.';
      } else {
        aiResponse = 'Không thể kết nối tới webhook n8n.';
      }

      // Lưu message và response vào Supabase
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          message: messageText,
          response: aiResponse,
          tokens_used: 5,
          message_type: 'user',
        })
        .select()
        .single();

      if (error) {
        toast({
          title: "Failed to Send",
          description: "There was an error sending your message.",
          variant: "destructive",
        });
        setCurrentMessage(messageText);
      } else {
        await updateTokens(5);
        setMessages(prev => [...prev, data as Message]);
        
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully.",
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
      setCurrentMessage(messageText);
    } finally {
      setLoading(false);
    }
  };

  const getWebhookStatusIcon = (status?: string | null) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-3 h-3 text-green-400" />;
      case 'failed':
        return <XCircle className="w-3 h-3 text-red-400" />;
      case 'pending':
        return <div className="w-3 h-3 border border-amber-400 border-t-transparent rounded-full animate-spin" />;
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-8 pb-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Sign In Required</h2>
                <p className="text-slate-400">
                  Please sign in to access the chat feature and webhook integration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link to="/login">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Chat với Webhook</h1>
              <p className="text-slate-400">Chat với AI và nhận webhook từ n8n</p>
            </div>
          </div>
          {profile && (
            <div className="flex items-center space-x-2 bg-slate-800 rounded-full px-4 py-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-white">{profile.tokens_remaining}</span>
              <span className="text-xs text-slate-400">tokens</span>
            </div>
          )}
        </div>

        {/* Webhook Status */}
        <Card className="bg-slate-900/50 border-slate-800 mb-6">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Webhook className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium">Webhook Endpoint</p>
                  <p className="text-xs text-slate-400">Sẵn sàng nhận tin nhắn từ n8n</p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-xs text-green-400 mt-1">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Low Token Warning */}
        {profile && profile.tokens_remaining <= 10 && (
          <Card className="bg-gradient-to-r from-amber-900/20 to-red-900/20 border-amber-800/50 mb-6">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <div className="flex-1">
                  <p className="text-amber-400 font-medium">Low on tokens!</p>
                  <p className="text-sm text-slate-300">
                    You have {profile.tokens_remaining} tokens remaining. Each message costs 5 tokens.
                  </p>
                </div>
                <Link to="/purchase">
                  <Button variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white">
                    Get More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat History Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-900/50 border-slate-800 h-[300px]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Conversations</h3>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    New Chat
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors">
                    <p className="text-white text-sm">Current Chat</p>
                    <p className="text-slate-400 text-xs">
                      {messages.length} messages
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Webhook Tester */}
            <WebhookTester />
          </div>

          {/* Main Chat */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-900/50 border-slate-800 h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                        <MessageCircle className="w-8 h-8 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Bắt đầu cuộc trò chuyện</h3>
                        <p className="text-slate-400">
                          Gửi tin nhắn đầu tiên hoặc nhận webhook từ n8n
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="space-y-4">
                      {/* User/Webhook Message */}
                      <div className={`flex ${msg.message_type === 'webhook' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                          msg.message_type === 'webhook' 
                            ? 'bg-purple-600 text-white rounded-bl-md' 
                            : 'bg-blue-600 text-white rounded-br-md'
                        }`}>
                          <div className="flex items-center space-x-2 mb-1">
                            {msg.message_type === 'webhook' && (
                              <Webhook className="w-3 h-3" />
                            )}
                            <span className="text-xs opacity-75">
                              {msg.message_type === 'webhook' ? (msg.sender || 'n8n') : 'You'}
                            </span>
                            {msg.webhook_status && getWebhookStatusIcon(msg.webhook_status)}
                          </div>
                          <p className="text-sm">{msg.message}</p>
                          <div className="flex items-center justify-between mt-2 text-opacity-75">
                            <span className="text-xs">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                            <div className="flex items-center space-x-1 text-xs">
                              <Coins className="w-3 h-3" />
                              <span>{msg.tokens_used}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* AI Response */}
                      {msg.response && (
                        <div className="flex justify-start">
                          <div className="bg-slate-800 text-white rounded-2xl rounded-bl-md px-4 py-3 max-w-[80%]">
                            <p className="text-sm">{msg.response}</p>
                            <span className="text-xs text-slate-400 mt-2 block">
                              AI Assistant
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-slate-800">
                <form onSubmit={handleSendMessage} className="flex space-x-3">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder={
                      profile && profile.tokens_remaining < 5 
                        ? "Not enough tokens to send a message" 
                        : "Nhập tin nhắn của bạn..."
                    }
                    className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-blue-500"
                    disabled={loading || !profile || profile.tokens_remaining < 5}
                  />
                  <Button
                    type="submit"
                    disabled={loading || !currentMessage.trim() || !profile || profile.tokens_remaining < 5}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </form>
                {profile && (
                  <p className="text-xs text-slate-500 mt-2">
                    Each message costs 5 tokens • You have {profile.tokens_remaining} tokens remaining
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      
    </Layout>
  );
};
