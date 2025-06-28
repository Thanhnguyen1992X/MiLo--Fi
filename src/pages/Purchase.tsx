
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  Coins, 
  Check, 
  Star,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Purchase = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { toast } = useToast();

  const handlePurchase = (packageName: string, price: string) => {
    // In a real app, this would integrate with Stripe
    toast({
      title: "Feature Coming Soon",
      description: `${packageName} purchase for ${price} will be available soon!`,
    });
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-8 pb-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Sign In Required</h2>
                <p className="text-slate-400">
                  Please sign in to view and purchase token packages.
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
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Token Packages
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choose the perfect token package for your AI conversations. Never run out of tokens again!
          </p>
        </div>

        {/* Current Status */}
        {profile && (
          <Card className="bg-slate-900/50 border-slate-800 max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span className="text-2xl font-bold text-white">{profile.tokens_remaining}</span>
                </div>
                <p className="text-slate-400">Current Token Balance</p>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    profile.subscription_status === 'free' 
                      ? 'bg-slate-700 text-slate-300' 
                      : 'bg-green-900 text-green-300'
                  }`}>
                    {profile.subscription_status.toUpperCase()}
                  </span>
                  {profile.subscription_status === 'free' && (
                    <span className="text-slate-500">• Daily reset: 100 tokens</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Pack */}
          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Coins className="w-6 h-6 text-amber-400" />
                <CardTitle className="text-white">Starter Pack</CardTitle>
              </div>
              <CardDescription className="text-slate-400">
                Perfect for casual conversations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$5</div>
                <div className="text-slate-400">1,000 tokens</div>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>1,000 chat tokens</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>~200 messages</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Never expires</span>
                </li>
              </ul>

              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => handlePurchase('Starter Pack', '$5')}
              >
                Purchase Now
              </Button>
            </CardContent>
          </Card>

          {/* Popular Pack */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-800/50 hover:border-purple-700/50 transition-colors relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>POPULAR</span>
              </div>
            </div>
            <CardHeader className="pt-8">
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-purple-400" />
                <CardTitle className="text-white">Power Pack</CardTitle>
              </div>
              <CardDescription className="text-slate-400">
                Best value for regular users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$20</div>
                <div className="text-slate-400">10,000 tokens</div>
                <div className="text-sm text-green-400 font-medium">Save 60%</div>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>10,000 chat tokens</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>~2,000 messages</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Never expires</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Priority support</span>
                </li>
              </ul>

              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => handlePurchase('Power Pack', '$20')}
              >
                Purchase Now
              </Button>
            </CardContent>
          </Card>

          {/* Pro Pack */}
          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-400" />
                <CardTitle className="text-white">Pro Pack</CardTitle>
              </div>
              <CardDescription className="text-slate-400">
                For power users and businesses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$50</div>
                <div className="text-slate-400">30,000 tokens</div>
                <div className="text-sm text-green-400 font-medium">Save 70%</div>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>30,000 chat tokens</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>~6,000 messages</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Never expires</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Premium support</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Early access features</span>
                </li>
              </ul>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handlePurchase('Pro Pack', '$50')}
              >
                Purchase Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-white mb-2">How do tokens work?</h3>
                <p className="text-sm text-slate-400">
                  Each message you send costs 5 tokens. Purchased tokens never expire and carry over between sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-white mb-2">What happens to free tokens?</h3>
                <p className="text-sm text-slate-400">
                  Free users get 100 tokens daily that reset every 24 hours. Purchased tokens are separate and permanent.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-white mb-2">Can I get a refund?</h3>
                <p className="text-sm text-slate-400">
                  Yes! We offer full refunds within 30 days of purchase if you're not satisfied with the service.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-white mb-2">Is my payment secure?</h3>
                <p className="text-sm text-slate-400">
                  Absolutely! All payments are processed securely through Stripe with industry-standard encryption.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support */}
        <Card className="bg-slate-900/50 border-slate-800 max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="space-y-3">
              <Clock className="w-8 h-8 text-blue-400 mx-auto" />
              <h3 className="font-semibold text-white">Need Help?</h3>
              <p className="text-sm text-slate-400">
                Our support team is here to help with any questions about tokens or purchases.
              </p>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
