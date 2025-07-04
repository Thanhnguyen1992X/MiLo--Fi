import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  Coins, 
  Shield, 
  Zap,
  Users,
  Code,
  Heart,
  Star,
  BarChart3,
  TrendingUp,
  MoreHorizontal
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              About Our Platform
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Experience the future of AI conversation with our iOS-inspired dark theme dashboard. 
              Built for modern users who demand both elegance and functionality.
            </p>
          </div>
        </div>

        {/* Mission */}
        <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 border-slate-700">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                We're dedicated to making AI conversation accessible, intuitive, and beautifully designed. 
                Our platform combines cutting-edge AI technology with a user experience that feels natural and engaging.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Intelligent Chat</h3>
                  <p className="text-sm text-slate-400">
                    Engage in natural conversations with our advanced AI assistant that understands context and provides helpful responses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Fair Token System</h3>
                  <p className="text-sm text-slate-400">
                    Transparent usage-based pricing with daily free tokens and affordable purchase options for extended conversations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Privacy First</h3>
                  <p className="text-sm text-slate-400">
                    Your conversations are secure and private. We use industry-standard encryption and never share your data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Lightning Fast</h3>
                  <p className="text-sm text-slate-400">
                    Optimized for speed with instant responses and seamless real-time interactions across all devices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">User Centered</h3>
                  <p className="text-sm text-slate-400">
                    Built with feedback from thousands of users to create an experience that truly meets your needs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Modern Tech</h3>
                  <p className="text-sm text-slate-400">
                    Built with the latest web technologies including React, TypeScript, and Supabase for reliability and performance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Built With Modern Technology</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'React', desc: 'Frontend Framework' },
              { name: 'TypeScript', desc: 'Type Safety' },
              { name: 'Supabase', desc: 'Backend & Auth' },
              { name: 'Tailwind CSS', desc: 'Styling' },
            ].map((tech, index) => (
              <Card key={index} className="bg-slate-900/30 border-slate-800">
                <CardContent className="pt-4 pb-4 text-center">
                  <div className="font-semibold text-white text-sm">{tech.name}</div>
                  <div className="text-xs text-slate-400 mt-1">{tech.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/50">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <div className="text-center">
                    <h3 className="font-semibold text-blue-400 mb-2">Transparency</h3>
                    <p className="text-sm text-slate-300">
                      Clear pricing, honest communication, and open about our capabilities and limitations.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-purple-400 mb-2">Innovation</h3>
                    <p className="text-sm text-slate-300">
                      Continuously improving our platform with the latest AI advancements and user feedback.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-pink-400 mb-2">Accessibility</h3>
                    <p className="text-sm text-slate-300">
                      Making AI conversation tools available to everyone with fair pricing and inclusive design.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="pt-6 pb-6">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-bold text-white">Get in Touch</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Have questions, suggestions, or just want to say hello? We love hearing from our users 
                and are always looking for ways to improve the platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a 
                  href="mailto:support@example.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  support@example.com
                </a>
                <span className="hidden sm:block text-slate-600">•</span>
                <a 
                  href="#" 
                  className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  Follow us on Twitter
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Analysis */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="pt-8 pb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Phân tích dòng tiền tệ</h2>
                  <span className="text-xs text-gray-400">Q2/2024</span>
                </div>
              </div>
              <button className="text-gray-500 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5"/><circle cx="19.5" cy="12" r="1.5"/><circle cx="4.5" cy="12" r="1.5"/></svg>
              </button>
            </div>
            <div className="w-full h-56 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Tiền vào', value: 2850 },
                  { name: 'Tiền ra', value: -1250 },
                  { name: 'Dòng ròng', value: 1600 },
                ]}>
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', color: '#fff' }} />
                  <Bar dataKey="value">
                    <Cell key="in" fill="#22c55e" />
                    <Cell key="out" fill="#ef4444" />
                    <Cell key="net" fill="hsl(var(--primary))" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Tổng dòng tiền vào:</span>
                <span className="font-medium text-green-500">+2,850 tỷ VND</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Tổng dòng tiền ra:</span>
                <span className="font-medium text-red-500">-1,250 tỷ VND</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Dòng tiền ròng:</span>
                <span className="font-medium text-primary">+1,600 tỷ VND</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DuPont Analysis */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <CardTitle className="text-xl text-white">Phân tích DuPont</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              {/* ROE Section */}
              <div className="text-center mb-6">
                <div className="text-sm font-medium text-slate-300">ROE</div>
                <div className="text-2xl font-bold text-blue-400">22.5%</div>
              </div>
              {/* Separator */}
              <div className="flex items-center justify-center w-full mb-6">
                <div className="w-1/3 h-px bg-slate-700"></div>
                <div className="mx-3 text-slate-500 font-medium">×</div>
                <div className="w-1/3 h-px bg-slate-700"></div>
              </div>
              {/* Main Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full">
                <div className="text-center bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm font-medium text-slate-300 mb-2">Net Profit Margin</div>
                  <div className="text-xl font-bold text-green-400 mb-3">35.2%</div>
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-500">Net Income</div>
                    <div className="w-12 h-px bg-slate-600 my-1"></div>
                    <div className="text-xs text-slate-500 mb-2">Revenue</div>
                    <div className="text-sm font-medium text-slate-300">7,500 / 21,300</div>
                  </div>
                </div>
                <div className="text-center bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm font-medium text-slate-300 mb-2">Asset Turnover</div>
                  <div className="text-xl font-bold text-yellow-400 mb-3">0.64x</div>
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-500">Revenue</div>
                    <div className="w-12 h-px bg-slate-600 my-1"></div>
                    <div className="text-xs text-slate-500 mb-2">Total Assets</div>
                    <div className="text-sm font-medium text-slate-300">21,300 / 33,280</div>
                  </div>
                </div>
              </div>
              {/* Separator */}
              <div className="flex items-center justify-center w-full mb-6">
                <div className="w-1/3 h-px bg-slate-700"></div>
                <div className="mx-3 text-slate-500 font-medium">×</div>
                <div className="w-1/3 h-px bg-slate-700"></div>
              </div>
              {/* Detail Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="text-center bg-slate-800/30 rounded-lg p-3">
                  <div className="text-sm font-medium text-slate-300 mb-1">Operating Margin</div>
                  <div className="text-lg font-bold text-purple-400 mb-2">42.5%</div>
                  <div className="text-xs text-slate-500">9,052 / 21,300</div>
                </div>
                <div className="text-center bg-slate-800/30 rounded-lg p-3">
                  <div className="text-sm font-medium text-slate-300 mb-1">Tax Burden</div>
                  <div className="text-lg font-bold text-orange-400 mb-2">82.8%</div>
                  <div className="text-xs text-slate-500">7,500 / 9,052</div>
                </div>
                <div className="text-center bg-slate-800/30 rounded-lg p-3">
                  <div className="text-sm font-medium text-slate-300 mb-1">Financial Leverage</div>
                  <div className="text-lg font-bold text-pink-400 mb-2">1.56x</div>
                  <div className="text-xs text-slate-500">33,280 / 21,330</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        
      </div>
    </Layout>
  );
};
