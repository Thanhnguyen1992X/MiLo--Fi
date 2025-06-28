import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  CreditCard, 
  Info, 
  LogIn, 
  UserPlus, 
  User, 
  LogOut,
  Menu,
  X,
  Coins,
  BarChart3
} from 'lucide-react';

export const Header = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navItems = [
    { to: '/chat', icon: MessageCircle, label: 'Chat', requireAuth: true },
    { to: '/financial', icon: BarChart3, label: 'Financial', requireAuth: false },
    { to: '/purchase', icon: CreditCard, label: 'Purchase', requireAuth: true },
    { to: '/about', icon: Info, label: 'About', requireAuth: false },
  ];

  return (
    <header className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:block">Dashboard</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              if (item.requireAuth && !user) return null;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {profile && (
                  <div className="flex items-center space-x-2 bg-slate-800 rounded-full px-3 py-1">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium">{profile.tokens_remaining}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{profile?.full_name || 'User'}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-slate-300 hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => {
                if (item.requireAuth && !user) return null;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors py-2"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {user ? (
                <>
                  {profile && (
                    <div className="flex items-center space-x-3 py-2">
                      <Coins className="w-5 h-5 text-amber-400" />
                      <span>Tokens: {profile.tokens_remaining}</span>
                    </div>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors py-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-3 border-t border-slate-800">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors py-2"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 text-blue-400 hover:text-blue-300 transition-colors py-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
