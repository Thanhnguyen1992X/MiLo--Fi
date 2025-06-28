
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageCircle, 
  Coins, 
  Shield, 
  Zap,
  Users,
  Code,
  Heart,
  Star
} from 'lucide-react';

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
      </div>
    </Layout>
  );
};
