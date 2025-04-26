import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssistantSetup from "./pages/kwikstore/AssistantSetup";
import CatalogSetup from "./pages/CatalogSetup";
import { AppProvider } from "./context/AppContext";

// Pages
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import KwikStore from "./pages/KwikStore";
import KwikGrowth from "./pages/KwikGrowth";
import KwikShip from "./pages/KwikShip";
import Analytics from "./pages/Analytics";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import Campaigns from "./pages/Campaigns";
import NotFound from "./pages/NotFound";

// KwikStore Buddy Module Pages
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
            <Route path="/signup" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/analytics" element={<Analytics />} />
            
            {/* KwikStore Buddy Routes (formerly KwikBuddy) */}
            <Route path="/kwikstore" element={<KwikStore />} />
            <Route path="/kwikstore/assistant-setup" element={<AssistantSetup />} />
            <Route path="/kwikstore/website-setup" element={<WebsiteSetup />} />
            <Route path="/kwikstore/seo-setup" element={<SeoSetup />} />
            <Route path="/kwikstore/payments-shipping" element={<PaymentsShipping />} />
            <Route path="/kwikstore/apps-setup" element={<AppsSetup />} />
            <Route path="/kwikstore/page-optimization" element={<PageOptimization />} />
            <Route path="/kwikstore/catalog-setup" element={<CatalogSetup />} />
            
            {/* KwikGrowth Routes */}
            <Route path="/kwikgrowth" element={<KwikGrowth />} />
            <Route path="/kwikgrowth/store-connector" element={<StoreConnector />} />
            <Route path="/kwikgrowth/seo-optimizer" element={<SeoOptimizer />} />
            <Route path="/kwikgrowth/kwik-ads" element={<KwikAds />} />
            <Route path="/kwikgrowth/landing-page-generator" element={<LandingPageGenerator />} />
            <Route path="/kwikgrowth/crm-copilot" element={<CrmCopilot />} />
            
            {/* KwikShip Routes */}
            <Route path="/kwikship" element={<KwikShip />} />
            
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
