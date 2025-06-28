
-- Add missing columns to chat_messages table for webhook functionality
ALTER TABLE public.chat_messages 
ADD COLUMN message_type TEXT DEFAULT 'user' CHECK (message_type IN ('user', 'webhook', 'system')),
ADD COLUMN webhook_status TEXT CHECK (webhook_status IN ('pending', 'sent', 'failed')),
ADD COLUMN original_message_id TEXT,
ADD COLUMN sender TEXT;

-- Update existing records to have default message_type
UPDATE public.chat_messages 
SET message_type = 'user' 
WHERE message_type IS NULL;

-- Make message_type NOT NULL after setting defaults
ALTER TABLE public.chat_messages 
ALTER COLUMN message_type SET NOT NULL;
