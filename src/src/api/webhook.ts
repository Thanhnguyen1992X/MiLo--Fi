
import { supabase } from '@/integrations/supabase/client';

interface WebhookMessage {
  message: string;
  sender: string;
  timestamp: string;
  messageId: string;
}

interface WebhookResponse {
  response: string;
  originalMessageId: string;
  timestamp: string;
  status: string;
}

export class WebhookAPI {
  private static readonly WEBHOOK_ENDPOINT = 'https://milo.tail15c919.ts.net/webhook/2ca7bf16-03cb-458f-a1fc-eeb5f8151b33';

  // Generate AI response based on the input message
  private static generateAIResponse(message: string, sender: string): string {
    const lowerMessage = message.toLowerCase().trim();
    
    // Handle common Vietnamese questions and responses
    if (lowerMessage.includes('thứ mấy') || lowerMessage.includes('thu may')) {
      const today = new Date();
      const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
      return `Hôm nay là ${days[today.getDay()]}, ngày ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}.`;
    }
    
    if (lowerMessage.includes('giờ') || lowerMessage.includes('mấy giờ')) {
      const now = new Date();
      return `Bây giờ là ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}.`;
    }
    
    if (lowerMessage.includes('chào') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Chào ${sender}! Tôi là AI Assistant, tôi có thể giúp gì cho bạn?`;
    }
    
    if (lowerMessage.includes('cảm ơn') || lowerMessage.includes('thank')) {
      return `Không có gì, ${sender}! Tôi luôn sẵn sàng giúp đỡ bạn.`;
    }
    
    if (lowerMessage.includes('tên') || lowerMessage.includes('name')) {
      return `Tôi là AI Assistant, một trợ lý thông minh được tạo để hỗ trợ bạn.`;
    }
    
    if (lowerMessage.includes('thời tiết') || lowerMessage.includes('weather')) {
      return `Xin lỗi, tôi không thể kiểm tra thời tiết hiện tại. Bạn có thể kiểm tra trên các ứng dụng thời tiết khác.`;
    }
    
    if (lowerMessage.includes('làm gì') || lowerMessage.includes('giúp')) {
      return `Tôi có thể giúp bạn trả lời các câu hỏi về thời gian, ngày tháng, và trò chuyện đơn giản. Bạn cần tôi hỗ trợ gì khác không?`;
    }
    
    // Default response for other messages
    return `Tôi đã nhận được tin nhắn của bạn: "${message}". Đây là phản hồi từ AI Assistant. Tôi có thể giúp bạn trả lời về thời gian, ngày tháng, hoặc trò chuyện đơn giản.`;
  }

  // Receive webhook from n8n
  static async receiveWebhook(data: WebhookMessage, userId: string) {
    try {
      console.log('Receiving webhook:', data);
      
      // Generate intelligent AI response
      const aiResponse = this.generateAIResponse(data.message, data.sender);
      
      // Save webhook message to database
      const { data: messageData, error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: userId,
          message: data.message,
          response: aiResponse,
          tokens_used: 0,
          message_type: 'webhook',
          webhook_status: 'pending',
          original_message_id: data.messageId,
          sender: data.sender,
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving webhook message:', error);
        throw error;
      }

      // Send AI response back to webhook
      await this.sendWebhookResponse({
        response: aiResponse,
        originalMessageId: data.messageId,
        timestamp: new Date().toISOString(),
        status: 'processed'
      }, messageData.id);

      return { success: true, messageId: messageData.id };
    } catch (error) {
      console.error('Error processing webhook:', error);
      return { success: false, error: error.message };
    }
  }

  // Send response back to webhook endpoint
  static async sendWebhookResponse(responseData: WebhookResponse, messageId?: string) {
    try {
      console.log('Sending webhook response:', responseData);
      
      const response = await fetch(this.WEBHOOK_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Chat-App-Webhook/1.0',
        },
        body: JSON.stringify(responseData),
      });

      const responseText = await response.text();
      console.log('Webhook response:', response.status, responseText);

      // Update message status if messageId provided
      if (messageId) {
        const status = response.ok ? 'sent' : 'failed';
        await supabase
          .from('chat_messages')
          .update({ 
            webhook_status: status,
          })
          .eq('id', messageId);
      }

      return {
        success: response.ok,
        status: response.status,
        data: responseText
      };
    } catch (error) {
      console.error('Error sending webhook response:', error);
      
      // Update message status to failed if messageId provided
      if (messageId) {
        await supabase
          .from('chat_messages')
          .update({ 
            webhook_status: 'failed',
          })
          .eq('id', messageId);
      }

      return {
        success: false,
        error: error.message
      };
    }
  }

  // Test webhook endpoint
  static async testWebhook(userId: string) {
    const testMessage: WebhookMessage = {
      message: "Hôm nay là thứ mấy?",
      sender: "Test System",
      timestamp: new Date().toISOString(),
      messageId: `test-${Date.now()}`
    };

    return await this.receiveWebhook(testMessage, userId);
  }

  // Validate webhook data
  static validateWebhookData(data: any): data is WebhookMessage {
    return (
      typeof data === 'object' &&
      typeof data.message === 'string' &&
      typeof data.sender === 'string' &&
      typeof data.timestamp === 'string' &&
      typeof data.messageId === 'string'
    );
  }
}
