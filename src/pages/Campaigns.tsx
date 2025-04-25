
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Clock, BarChart } from 'lucide-react';

const Campaigns = () => {
  const campaignData = [
    {
      id: 1,
      name: 'Summer Sale 2025',
      status: 'Active',
      platform: 'Meta Ads',
      spend: '$1,250.00',
      results: '145 orders',
      roas: '2.8x',
    },
    {
      id: 2,
      name: 'New Product Launch',
      status: 'Scheduled',
      platform: 'Google Ads',
      spend: '$0.00',
      results: '-',
      roas: '-',
    },
    {
      id: 3,
      name: 'Retargeting Campaign',
      status: 'Paused',
      platform: 'Meta Ads',
      spend: '$850.00',
      results: '78 orders',
      roas: '1.9x',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Campaigns</h1>
            <p className="text-gray-500">
              Manage your marketing campaigns across all channels
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="btn-primary flex items-center">
              <PlusCircle className="h-5 w-5 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Ad Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,100.00</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average ROAS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4x</div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Campaigns</CardTitle>
            <CardDescription>View and manage all your marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Campaign</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Platform</th>
                    <th className="text-left py-3 px-4 font-medium">Spend</th>
                    <th className="text-left py-3 px-4 font-medium">Results</th>
                    <th className="text-left py-3 px-4 font-medium">ROAS</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignData.map((campaign) => (
                    <tr key={campaign.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{campaign.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{campaign.platform}</td>
                      <td className="py-3 px-4">{campaign.spend}</td>
                      <td className="py-3 px-4">{campaign.results}</td>
                      <td className="py-3 px-4">{campaign.roas}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <BarChart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Clock className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
