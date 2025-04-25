
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ArrowRight, BarChart, Package, Settings, Globe, ShoppingCart, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  const { onboarding, kwikBuddyProgress } = useApp();
  const navigate = useNavigate();

  // Calculate overall KwikBuddy progress
  const overallProgress = 
    (kwikBuddyProgress.website + 
    kwikBuddyProgress.seo + 
    kwikBuddyProgress.payments + 
    kwikBuddyProgress.apps + 
    kwikBuddyProgress.optimization) / 5;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Welcome, {onboarding.store?.name || 'Merchant'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stats Card 1 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Store Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
                <div className="h-10 w-10 rounded-full bg-yale-blue/10 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-yale-blue" />
                </div>
              </div>
              <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yale-blue rounded-full"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stats Card 2 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Orders (Demo)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">0</div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Connect your store to track orders
              </div>
            </CardContent>
          </Card>
          
          {/* Stats Card 3 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Traffic (Demo)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">0</div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Set up analytics to track visitors
              </div>
            </CardContent>
          </Card>
          
          {/* Stats Card 4 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Revenue (Demo)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">$0</div>
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <BarChart2 className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Connect your store to track revenue
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* KwikBuddy Card */}
          <Card className="overflow-hidden border border-gray-200">
            <div className="bg-yale-blue p-4 text-white">
              <div className="flex items-center">
                <Package className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold">KwikBuddy</h3>
              </div>
              <p className="mt-1 text-sm text-white/80">Website Setup SaaS</p>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-500">{Math.round(overallProgress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yale-blue rounded-full"
                      style={{ width: `${overallProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Website Setup</span>
                    <span className="text-sm text-gray-500">{kwikBuddyProgress.website}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">SEO Setup</span>
                    <span className="text-sm text-gray-500">{kwikBuddyProgress.seo}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Payments & Shipping</span>
                    <span className="text-sm text-gray-500">{kwikBuddyProgress.payments}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Required Apps</span>
                    <span className="text-sm text-gray-500">{kwikBuddyProgress.apps}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Page Optimization</span>
                    <span className="text-sm text-gray-500">{kwikBuddyProgress.optimization}%</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full btn-primary"
                  onClick={() => navigate('/kwikbuddy')}
                >
                  Continue Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* KwikGrowth Card */}
          <Card className="overflow-hidden border border-gray-200">
            <div className="bg-oxford-blue p-4 text-white">
              <div className="flex items-center">
                <BarChart className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold">KwikGrowth</h3>
              </div>
              <p className="mt-1 text-sm text-white/80">Sales & Growth Tools</p>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Ready to grow your business? KwikGrowth provides powerful tools to help you increase traffic, conversions, and revenue.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-yale-blue/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-yale-blue">1</span>
                    </div>
                    <span className="text-sm">Connect your store and marketing channels</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-yale-blue/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-yale-blue">2</span>
                    </div>
                    <span className="text-sm">Optimize your SEO and product pages</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-yale-blue/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-yale-blue">3</span>
                    </div>
                    <span className="text-sm">Create and manage marketing campaigns</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-yale-blue/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-yale-blue">4</span>
                    </div>
                    <span className="text-sm">Generate high-converting landing pages</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-yale-blue/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-yale-blue">5</span>
                    </div>
                    <span className="text-sm">Engage customers with CRM tools</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-oxford-blue hover:bg-oxford-blue/90 text-white"
                  onClick={() => navigate('/kwikgrowth')}
                >
                  Activate KwikGrowth
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
