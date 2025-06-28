import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  CreditCard, 
  Coins, 
  TrendingUp, 
  Clock,
  Sparkles,
  ArrowRight,
  UserPlus
} from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Your personal AI assistant with token-based conversations. Start chatting, manage your account, and explore premium features.
          </p>
        </div>

        {user ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Available Tokens</CardTitle>
                  <Coins className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {profile?.tokens_remaining || 0}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Resets daily for free users
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Account Status</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white capitalize">
                    {profile?.subscription_status || 'Free'}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {profile?.subscription_status === 'free' ? 'Upgrade for more tokens' : 'Premium benefits active'}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Next Reset</CardTitle>
                  <Clock className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    24h
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Daily token refresh
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-800/50 hover:border-blue-700/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">Start Chatting</CardTitle>
                      <CardDescription className="text-slate-400">
                        Begin a conversation with your AI assistant
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">
                      Each message costs 5 tokens. You have {profile?.tokens_remaining || 0} tokens remaining.
                    </p>
                    <Link to="/chat">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Open Chat
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-800/50 hover:border-purple-700/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">Get More Tokens</CardTitle>
                      <CardDescription className="text-slate-400">
                        Purchase token packages for extended conversations
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">
                      Get 10,000 tokens for $20. Never worry about running out again.
                    </p>
                    <Link to="/purchase">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        View Packages
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Token Status Alert */}
            {profile && profile.tokens_remaining <= 10 && (
              <Card className="bg-gradient-to-r from-amber-900/20 to-red-900/20 border-amber-800/50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <Coins className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-400">Low Token Warning</h3>
                      <p className="text-sm text-slate-300">
                        You're running low on tokens. Consider purchasing more or wait for your daily reset.
                      </p>
                    </div>
                    <Link to="/purchase">
                      <Button variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white">
                        Purchase Tokens
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          /* Guest Welcome */
          <div className="text-center space-y-8">
            <Card className="bg-slate-900/50 border-slate-800 max-w-2xl mx-auto">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-3">Get Started Today</h2>
                    <p className="text-slate-400 mb-6">
                      Create your account to access AI chat features, manage your tokens, and explore premium options.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create Account
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 w-full sm:w-auto">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-slate-900/30 border-slate-800">
                <CardContent className="pt-6 text-center">
                  <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">AI Chat</h3>
                  <p className="text-sm text-slate-400">
                    Engage in intelligent conversations with our AI assistant
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/30 border-slate-800">
                <CardContent className="pt-6 text-center">
                  <Coins className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Token System</h3>
                  <p className="text-sm text-slate-400">
                    Fair usage with daily token refresh and purchase options
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/30 border-slate-800">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Premium Features</h3>
                  <p className="text-sm text-slate-400">
                    Upgrade for unlimited access and advanced capabilities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
