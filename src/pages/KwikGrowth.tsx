
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Link as LinkIcon, 
  Search, 
  BarChart, 
  Layout, 
  MessageSquare,
  ArrowRight,
  Zap
} from 'lucide-react';
import { Description } from '@radix-ui/react-toast';

const KwikGrowth = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'store-connector',
      title: 'Store Connector',
      description: 'Connect your analytics and ad platforms in one place.',
      icon: <LinkIcon className="h-5 w-5" />,
      path: '/kwikgrowth/store-connector',
      isNew: false,
    },
    {
      id: 'seo-optimizer',
      title: 'SEO Optimizer',
      description: 'Improve your search engine rankings with AI-powered suggestions.',
      icon: <Search className="h-5 w-5" />,
      path: '/kwikgrowth/seo-optimizer',
      isNew: true,
    },
    {
      id: 'kwik-ads',
      title: 'KwikAds++',
      description: 'Create, manage, and optimize your ad campaigns across platforms.',
      icon: <BarChart className="h-5 w-5" />,
      path: '/kwikgrowth/kwik-ads',
      isNew: false,
    },
    {
      id: 'landing-page-generator',
      title: 'AI Landing Page Generator',
      description: 'Create high-converting landing pages with AI assistance.',
      icon: <Layout className="h-5 w-5" />,
      path: '/kwikgrowth/landing-page-generator',
      isNew: true,
    },
    {
      id: 'crm-copilot',
      title: 'CRM Co-Pilot',
      description: 'Engage with your customers using AI-powered messaging tools.',
      icon: <MessageSquare className="h-5 w-5" />,
      path: '/kwikgrowth/crm-copilot',
      isNew: false,
    },
    { 
      id: 'KwikShip',
      title: 'KwikShip',
      description: 'Handle all your shipping integrations in one place. ',
      name: 'KwikShip', 
      path: '/kwikship', 
      icon: <MessageSquare className="h-5 w-5" /> 
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">KwikGrowth</h1>
            <p className="text-gray-500">
              Tools to grow your sales and optimize your marketing
            </p>
          </div>
        </div>

        {/* Getting Started Card */}
        <Card className="bg-gradient-to-r from-oxford-blue to-yale-blue text-white mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                <Zap className="h-12 w-12" />
              </div>
              <div className="md:flex-1">
                <h2 className="text-xl font-bold mb-2">Boost Your Growth with KwikGrowth</h2>
                <p className="text-white/80 mb-4">
                  Unlock the full potential of your ecommerce store with our suite of growth tools. Start by connecting your store to access all features.
                </p>
                <Button 
                  onClick={() => navigate('/kwikgrowth/store-connector')}
                  className="bg-white text-yale-blue hover:bg-white/90"
                >
                  Activate KwikGrowth Suite
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card 
              key={module.id}
              className="overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-md"
            >
              <CardHeader className="pb-2 relative">
                {module.isNew && (
                  <span className="absolute top-4 right-4 bg-gamboge text-white text-xs font-medium px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
                <div className="h-10 w-10 bg-yale-blue/10 rounded-lg flex items-center justify-center mb-3">
                  {module.icon}
                </div>
                <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-gray-600 mb-4 min-h-[60px]">
                  {module.description}
                </p>
                <Button 
                  onClick={() => navigate(module.path)}
                  className="w-full btn-primary"
                >
                  Open {module.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KwikGrowth;
