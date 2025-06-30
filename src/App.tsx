import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Dashboard } from "@/pages/Dashboard";
import { FinancialDashboard } from "@/pages/FinancialDashboard";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { Chat } from "@/pages/Chat";
import { Purchase } from "@/pages/Purchase";
import { About } from "@/pages/About";
import NotFound from "./pages/NotFound";
import N8NDashboard from './pages/N8NDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Screener } from "@/pages/Screener";
import { Report } from "@/pages/Report";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/financial" element={<FinancialDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/about" element={<About />} />
            <Route path="/screener" element={<Screener />} />
            <Route path="/report" element={<Report />} />
            <Route
              path="/n8ndashboard"
              element={
                <ProtectedRoute>
                  <N8NDashboard />
                </ProtectedRoute>
              }
            />
           
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
