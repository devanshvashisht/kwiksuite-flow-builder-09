
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Info, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for analytics
const salesData = [
  { name: 'Jan', actual: 4000, predicted: 4200 },
  { name: 'Feb', actual: 3000, predicted: 3100 },
  { name: 'Mar', actual: 5000, predicted: 4800 },
  { name: 'Apr', actual: 2780, predicted: 2900 },
  { name: 'May', actual: 1890, predicted: 2100 },
  { name: 'Jun', actual: 2390, predicted: 2500 },
  { name: 'Jul', actual: 3490, predicted: 3600 },
  { name: 'Aug', actual: 4000, predicted: 4300 },
  { name: 'Sep', actual: 5000, predicted: 5200 },
  { name: 'Oct', actual: 6000, predicted: 6200 },
  { name: 'Nov', actual: 7000, predicted: 7300 },
  { name: 'Dec', actual: 9800, predicted: 10000 },
];

const campaignData = [
  { name: 'Facebook', value: 25, color: '#4267B2' },
  { name: 'Instagram', value: 35, color: '#C13584' },
  { name: 'Google', value: 20, color: '#4285F4' },
  { name: 'TikTok', value: 15, color: '#000000' },
  { name: 'Other', value: 5, color: '#767676' },
];

const trafficSourceData = [
  { name: 'Direct', visits: 4000, color: '#0088FE' },
  { name: 'Organic', visits: 3000, color: '#00C49F' },
  { name: 'Social', visits: 2000, color: '#FFBB28' },
  { name: 'Referral', visits: 1000, color: '#FF8042' },
  { name: 'Paid', visits: 1500, color: '#a855f7' },
];

const conversionData = [
  { name: 'Jan', rate: 2.5 },
  { name: 'Feb', rate: 2.8 },
  { name: 'Mar', rate: 3.1 },
  { name: 'Apr', rate: 2.9 },
  { name: 'May', rate: 3.2 },
  { name: 'Jun', rate: 3.5 },
  { name: 'Jul', rate: 3.7 },
  { name: 'Aug', rate: 3.8 },
  { name: 'Sep', rate: 4.0 },
  { name: 'Oct', rate: 4.2 },
  { name: 'Nov', rate: 4.5 },
  { name: 'Dec', rate: 4.7 },
];

const Analytics = () => {
  const [dateRange, setDateRange] = useState('last30Days');
  
  // Summary metrics
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$48,294.75',
      change: 12.5,
      isPositive: true,
      description: 'vs. previous period'
    },
    {
      title: 'Conversion Rate',
      value: '3.42%',
      change: 0.8,
      isPositive: true,
      description: 'vs. previous period'
    },
    {
      title: 'Avg. Order Value',
      value: '$87.32',
      change: -2.1,
      isPositive: false,
      description: 'vs. previous period'
    },
    {
      title: 'Total Orders',
      value: '553',
      change: 9.7,
      isPositive: true,
      description: 'vs. previous period'
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Store Analytics</h1>
            <p className="text-gray-500">
              Track performance and get AI-powered insights
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <div className="inline-flex items-center rounded-md border border-input bg-background p-1">
              <Button
                variant={dateRange === 'last7Days' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-xs"
                onClick={() => setDateRange('last7Days')}
              >
                7D
              </Button>
              <Button
                variant={dateRange === 'last30Days' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-xs"
                onClick={() => setDateRange('last30Days')}
              >
                30D
              </Button>
              <Button
                variant={dateRange === 'last90Days' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-xs"
                onClick={() => setDateRange('last90Days')}
              >
                90D
              </Button>
              <Button
                variant={dateRange === 'year' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-xs"
                onClick={() => setDateRange('year')}
              >
                Year
              </Button>
            </div>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{metric.title}</p>
                    <h3 className="text-2xl font-bold">{metric.value}</h3>
                  </div>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Info className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Metrics from {dateRange === 'last7Days' ? 'last 7 days' : 
                           dateRange === 'last30Days' ? 'last 30 days' : 
                           dateRange === 'last90Days' ? 'last 90 days' : 'this year'}</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center mt-2">
                  <span className={`flex items-center text-sm font-medium ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.isPositive ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1.5">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics Content */}
        <Tabs defaultValue="realPerformance" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="realPerformance">Real Performance</TabsTrigger>
            <TabsTrigger value="predictiveInsights">Predictive Insights</TabsTrigger>
            <TabsTrigger value="campaignBreakdown">Campaign Breakdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="realPerformance">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Trend Chart */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Sales Trend</CardTitle>
                  <CardDescription>Revenue over time</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={salesData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                        <Area type="monotone" dataKey="actual" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Traffic Sources</CardTitle>
                  <CardDescription>Visitor acquisition channels</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={trafficSourceData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="visits" name="Visitors">
                          {trafficSourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Rate */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Conversion Rate</CardTitle>
                  <CardDescription>Visitor to customer conversion</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={conversionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis unit="%" />
                        <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                        <Line type="monotone" dataKey="rate" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Performance */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Campaign Performance</CardTitle>
                  <CardDescription>Revenue by marketing channel</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={campaignData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {campaignData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Revenue Share']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictiveInsights">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Prediction Chart */}
              <Card className="lg:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Sales Prediction</CardTitle>
                  <CardDescription>AI-powered revenue forecast for next 30 days</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={salesData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                        <Legend />
                        <Line type="monotone" dataKey="actual" name="Actual Sales" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="predicted" name="Predicted Sales" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">AI-Generated Growth Insights</CardTitle>
                  <CardDescription>Smart recommendations based on your data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-2">Conversion Opportunity</h4>
                      <p className="text-blue-700">Your checkout page has a 38% abandonment rate, which is 12% higher than industry average. Consider adding express checkout options to improve conversions.</p>
                      <Button variant="link" className="text-blue-700 p-0 h-auto mt-2">View Detailed Analysis</Button>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <h4 className="font-medium text-green-800 mb-2">Pricing Optimization</h4>
                      <p className="text-green-700">Based on competitive analysis and your profit margins, we recommend increasing prices by 5-8% on your top 20 products without significantly impacting conversion rates.</p>
                      <Button variant="link" className="text-green-700 p-0 h-auto mt-2">View Product List</Button>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <h4 className="font-medium text-amber-800 mb-2">Inventory Alert</h4>
                      <p className="text-amber-700">Our prediction model shows 3 of your best-selling products will run out of stock within 14 days. Consider restocking early to avoid lost sales opportunities.</p>
                      <Button variant="link" className="text-amber-700 p-0 h-auto mt-2">View Inventory Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="campaignBreakdown">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Campaign Comparison */}
              <Card className="lg:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Campaign Performance Comparison</CardTitle>
                  <CardDescription>ROI analysis across marketing channels</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Facebook', spend: 2000, revenue: 4000, roi: 100 },
                          { name: 'Instagram', spend: 3000, revenue: 7500, roi: 150 },
                          { name: 'Google', spend: 5000, revenue: 9000, roi: 80 },
                          { name: 'TikTok', spend: 1500, revenue: 4500, roi: 200 },
                          { name: 'Email', spend: 500, revenue: 3000, roi: 500 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="spend" name="Ad Spend ($)" fill="#8884d8" />
                        <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)" fill="#82ca9d" />
                        <Bar yAxisId="right" dataKey="roi" name="ROI (%)" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Campaign Recommendations</CardTitle>
                  <CardDescription>AI-generated campaign optimization suggestions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-600">FB</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Facebook Campaign Optimization</h4>
                        <p className="text-gray-600 mt-1">Reallocate budget from underperforming ad sets to your top 3 performers to improve overall ROAS by an estimated 37%.</p>
                        <Button size="sm" className="mt-2">Apply Changes</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-red-600">G</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Google Ads Keyword Suggestion</h4>
                        <p className="text-gray-600 mt-1">Add 12 new long-tail keywords related to your best-selling products to capture more qualified traffic at lower CPC.</p>
                        <Button size="sm" className="mt-2">View Keywords</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-pink-600">IG</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Instagram Creative Refresh</h4>
                        <p className="text-gray-600 mt-1">Your Instagram creatives are showing fatigue with 22% lower CTR. Use our AI to generate fresh creative concepts.</p>
                        <Button size="sm" className="mt-2">Generate Creatives</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
