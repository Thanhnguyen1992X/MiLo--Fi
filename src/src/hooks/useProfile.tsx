
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  full_name: string | null;
  tokens_remaining: number;
  daily_reset_date: string;
  subscription_status: string;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTokens = async (tokensUsed: number) => {
    if (!profile || !user) return;

    const newTokenCount = Math.max(0, profile.tokens_remaining - tokensUsed);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ tokens_remaining: newTokenCount })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating tokens:', error);
      } else {
        setProfile({ ...profile, tokens_remaining: newTokenCount });
      }
    } catch (error) {
      console.error('Error updating tokens:', error);
    }
  };

  return {
    profile,
    loading,
    updateTokens,
    refetch: fetchProfile,
  };
};
