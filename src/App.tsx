import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Pages
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import KwikBuddy from "./pages/KwikBuddy";
import KwikGrowth from "./pages/KwikGrowth";
import Settings from "./pages/Settings";
import Campaigns from "./pages/Campaigns";
import NotFound from "./pages/NotFound";

// KwikBuddy Module Pages
import WebsiteSetup from "./pages/kwikbuddy/WebsiteSetup";
import SeoSetup from "./pages/kwikbuddy/SeoSetup";
import PaymentsShipping from "./pages/kwikbuddy/PaymentsShipping";
import AppsSetup from "./pages/kwikbuddy/AppsSetup";
import PageOptimization from "./pages/kwikbuddy/PageOptimization";

// KwikGrowth Module Pages
import StoreConnector from "./pages/kwikgrowth/StoreConnector";
import SeoOptimizer from "./pages/kwikgrowth/SeoOptimizer";
import KwikAds from "./pages/kwikgrowth/KwikAds";
import LandingPageGenerator from "./pages/kwikgrowth/LandingPageGenerator";
import CrmCopilot from "./pages/kwikgrowth/CrmCopilot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* KwikBuddy Routes */}
            <Route path="/kwikbuddy" element={<KwikBuddy />} />
            <Route path="/kwikbuddy/website-setup" element={<WebsiteSetup />} />
            <Route path="/kwikbuddy/seo-setup" element={<SeoSetup />} />
            <Route path="/kwikbuddy/payments-shipping" element={<PaymentsShipping />} />
            <Route path="/kwikbuddy/apps-setup" element={<AppsSetup />} />
            <Route path="/kwikbuddy/page-optimization" element={<PageOptimization />} />
            
            {/* KwikGrowth Routes */}
            <Route path="/kwikgrowth" element={<KwikGrowth />} />
            <Route path="/kwikgrowth/store-connector" element={<StoreConnector />} />
            <Route path="/kwikgrowth/seo-optimizer" element={<SeoOptimizer />} />
            <Route path="/kwikgrowth/kwik-ads" element={<KwikAds />} />
            <Route path="/kwikgrowth/landing-page-generator" element={<LandingPageGenerator />} />
            <Route path="/kwikgrowth/crm-copilot" element={<CrmCopilot />} />
            
            {/* Other Routes */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/campaigns" element={<Campaigns />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
