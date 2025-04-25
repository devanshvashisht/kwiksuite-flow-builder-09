
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart, 
  Zap, 
  Target, 
  Image as ImageIcon,
  Users,
  Layout,
  Plus,
  Calendar,
  DollarSign,
  ArrowRight,
  Check,
  Sparkles
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

const KwikAds = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: 'Summer Collection Launch',
    objective: 'conversions',
    budget: '1000',
    startDate: '2023-06-01',
    endDate: '2023-06-30',
    platform: 'meta',
  });
  
  // Sample existing campaigns
  const existingCampaigns = [
    {
      id: 'campaign1',
      name: 'Spring Collection',
      status: 'active',
      platform: 'Meta Ads',
      budget: '$1,200',
      spend: '$450',
      results: '23 purchases',
      suggestedChanges: 2,
    },
    {
      id: 'campaign2',
      name: 'Mother\'s Day Promotion',
      status: 'ended',
      platform: 'Google Ads',
      budget: '$800',
      spend: '$800',
      results: '42 purchases',
      suggestedChanges: 0,
    },
  ];
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
  };
  
  // Handle save and launch
  const handleLaunch = () => {
    toast({
      title: "Campaign created",
      description: "Your campaign has been created and is now live",
    });
    navigate('/campaigns');
  };
  
  // Handle applying suggested changes
  const handleApplySuggestions = (campaignId: string) => {
    toast({
      title: "Suggestions applied",
      description: "The AI suggested changes have been applied to your campaign",
    });
  };
  
  // Render different steps of campaign creation
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Campaign Name</label>
                <Input 
                  placeholder="e.g. Summer Sale 2023" 
                  value={campaignData.name}
                  onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Campaign Objective</label>
                <Select 
                  defaultValue={campaignData.objective}
                  onValueChange={(value) => setCampaignData({...campaignData, objective: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awareness">Brand Awareness</SelectItem>
                    <SelectItem value="traffic">Website Traffic</SelectItem>
                    <SelectItem value="conversions">Conversions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Platform</label>
                <Select 
                  defaultValue={campaignData.platform}
                  onValueChange={(value) => setCampaignData({...campaignData, platform: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meta">Meta Ads (Facebook/Instagram)</SelectItem>
                    <SelectItem value="google">Google Ads</SelectItem>
                    <SelectItem value="tiktok">TikTok Ads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Budget</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      className="pl-9" 
                      placeholder="e.g. 1000" 
                      value={campaignData.budget}
                      onChange={(e) => setCampaignData({...campaignData, budget: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Input 
                        type="date" 
                        value={campaignData.startDate}
                        onChange={(e) => setCampaignData({...campaignData, startDate: e.target.value})}
                        required
                      />
                    </div>
                    <span className="flex items-center">to</span>
                    <div className="flex-1">
                      <Input 
                        type="date" 
                        value={campaignData.endDate}
                        onChange={(e) => setCampaignData({...campaignData, endDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button type="submit" className="btn-primary">
                  Continue to AI Source Planner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        );
      
      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-gamboge" />
              AI Source Planner
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-3">
                Based on your campaign objective and budget, our AI recommends the following channel allocation:
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="border rounded-md p-3 bg-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Instagram</span>
                    <Badge>60%</Badge>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yale-blue rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">$600 budget</p>
                </div>
                
                <div className="border rounded-md p-3 bg-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Facebook</span>
                    <Badge>30%</Badge>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yale-blue rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">$300 budget</p>
                </div>
                
                <div className="border rounded-md p-3 bg-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Remarketing</span>
                    <Badge>10%</Badge>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yale-blue rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">$100 budget</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                <span className="font-medium">AI Insight:</span> Based on your industry and objective, Instagram typically delivers the highest conversion rate for fashion products. We recommend allocating more budget there.
              </p>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
              <Button className="btn-primary" onClick={() => setCurrentStep(currentStep + 1)}>
                Continue to Creative Generator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-gamboge" />
              AI Creative Generator
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Ad Headline</label>
                <Input defaultValue="Summer Collection Launch: 20% Off Everything" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Ad Description</label>
                <Textarea defaultValue="Get ready for summer with our new collection. Use code SUMMER20 at checkout for 20% off. Limited time only!" rows={3} />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Call to Action</label>
                <Select defaultValue="shop_now">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a call to action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shop_now">Shop Now</SelectItem>
                    <SelectItem value="learn_more">Learn More</SelectItem>
                    <SelectItem value="sign_up">Sign Up</SelectItem>
                    <SelectItem value="book_now">Book Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Upload Creative</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-yale-blue transition-colors">
                    <div className="flex flex-col items-center">
                      <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm font-medium">Upload Image</p>
                      <p className="text-xs text-gray-500 mt-1">1080 x 1080px recommended</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">AI Creative Suggestions</h4>
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-gamboge" />
                        <span className="text-xs">Let AI generate ad creatives</span>
                      </div>
                      <Button size="sm" className="w-full">Generate Images</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
              <Button className="btn-primary" onClick={() => setCurrentStep(currentStep + 1)}>
                Continue to Audience Segments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-gamboge" />
              Audience Segments
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">AI-Generated Audience Segments</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Based on your campaign objective and product category, we've created these audience segments:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-md p-3 border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-yale-blue mr-2" />
                        <span className="font-medium">Fashion Enthusiasts</span>
                      </div>
                      <Badge variant="outline">4.2M</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      People interested in fashion, summer trends, and online shopping
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-md p-3 border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-yale-blue mr-2" />
                        <span className="font-medium">Previous Customers</span>
                      </div>
                      <Badge variant="outline">15K</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      People who have purchased from your store in the last 180 days
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-md p-3 border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-yale-blue mr-2" />
                        <span className="font-medium">Lookalike Audience</span>
                      </div>
                      <Badge variant="outline">2.8M</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      People similar to your best customers
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Custom Audience
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
              <Button className="btn-primary" onClick={() => setCurrentStep(currentStep + 1)}>
                Continue to Landing Page
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-gamboge" />
              Landing Page
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Select Landing Page</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Choose where to send people who click on your ad:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-md p-3 border border-yale-blue relative">
                    <div className="absolute top-3 right-3">
                      <Check className="h-5 w-5 text-yale-blue" />
                    </div>
                    <div className="flex items-center">
                      <Layout className="h-5 w-5 text-yale-blue mr-2" />
                      <span className="font-medium">Summer Collection Page</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      yourstore.com/collections/summer-2023
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-md p-3 border">
                    <div className="flex items-center">
                      <Layout className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="font-medium">Homepage</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      yourstore.com
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-md p-3 border flex items-center justify-between">
                    <div className="flex items-center">
                      <Plus className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="font-medium">Create New Landing Page</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Create
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">UTM Parameters</label>
                <Input defaultValue="utm_source=meta&utm_medium=cpc&utm_campaign=summer2023&utm_content=collection" />
                <p className="text-xs text-gray-500 mt-1">
                  These parameters will be added to your landing page URL for tracking.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
              <Button className="btn-primary" onClick={() => setCurrentStep(currentStep + 1)}>
                Preview Campaign
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Campaign Preview</h3>
            
            <div className="border rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-50 p-4 border-b">
                <h4 className="font-medium">{campaignData.name}</h4>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Objective</span>
                      <p className="font-medium">
                        {campaignData.objective === 'awareness' ? 'Brand Awareness' : 
                         campaignData.objective === 'traffic' ? 'Website Traffic' : 
                         'Conversions'}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-500">Platform</span>
                      <p className="font-medium">
                        {campaignData.platform === 'meta' ? 'Meta Ads (Facebook/Instagram)' : 
                         campaignData.platform === 'google' ? 'Google Ads' : 
                         'TikTok Ads'}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-500">Budget</span>
                      <p className="font-medium">${campaignData.budget}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-500">Duration</span>
                      <p className="font-medium">{campaignData.startDate} to {campaignData.endDate}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Audience Segments</span>
                      <p className="font-medium">3 segments selected</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-500">Creative</span>
                      <p className="font-medium">1 image ad</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-500">Landing Page</span>
                      <p className="font-medium">Summer Collection Page</p>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-500">Estimated Reach</span>
                      <p className="font-medium">120,000 - 350,000 people</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
              <div className="space-x-3">
                <Button variant="outline">
                  Save Draft
                </Button>
                <Button onClick={handleLaunch} className="btn-primary">
                  Launch Campaign
                </Button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">KwikAds++</h1>
            <p className="text-gray-500">
              Create, manage, and optimize your ad campaigns across platforms
            </p>
          </div>
        </div>

        <Tabs defaultValue="create">
          <TabsList className="mb-6">
            <TabsTrigger value="create" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </TabsTrigger>
            <TabsTrigger value="existing" className="flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              Existing Campaigns
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yale-blue" />
                  Create New Campaign
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Campaign Creation Steps */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className={`w-full h-1 ${currentStep > 1 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${currentStep >= 1 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
                      1
                    </div>
                    <div className="flex-1">
                      <div className={`w-full h-1 ${currentStep > 2 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${currentStep >= 2 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
                      2
                    </div>
                    <div className="flex-1">
                      <div className={`w-full h-1 ${currentStep > 3 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${currentStep >= 3 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
                      3
                    </div>
                    <div className="flex-1">
                      <div className={`w-full h-1 ${currentStep > 4 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${currentStep >= 4 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
                      4
                    </div>
                    <div className="flex-1">
                      <div className={`w-full h-1 ${currentStep > 5 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${currentStep >= 5 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
                      5
                    </div>
                    <div className="flex-1">
                      <div className={`w-full h-1 ${currentStep > 6 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${currentStep >= 6 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
                      6
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span className={currentStep === 1 ? 'text-yale-blue font-medium' : ''}>Details</span>
                    <span className={currentStep === 2 ? 'text-yale-blue font-medium' : ''}>Sources</span>
                    <span className={currentStep === 3 ? 'text-yale-blue font-medium' : ''}>Creative</span>
                    <span className={currentStep === 4 ? 'text-yale-blue font-medium' : ''}>Audience</span>
                    <span className={currentStep === 5 ? 'text-yale-blue font-medium' : ''}>Landing</span>
                    <span className={currentStep === 6 ? 'text-yale-blue font-medium' : ''}>Preview</span>
                  </div>
                </div>
                
                {renderStep()}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="existing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-yale-blue" />
                  Your Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {existingCampaigns.map((campaign) => (
                    <div key={campaign.id} className="border rounded-md p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{campaign.name}</h3>
                            <Badge 
                              className={`ml-2 ${
                                campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {campaign.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">{campaign.platform}</p>
                        </div>
                        
                        {campaign.suggestedChanges > 0 && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 mt-2 md:mt-0">
                            <Sparkles className="h-3 w-3 mr-1 text-amber-600" />
                            {campaign.suggestedChanges} AI suggestions
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500">Budget</span>
                          <p className="font-medium">{campaign.budget}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Spend</span>
                          <p className="font-medium">{campaign.spend}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Results</span>
                          <p className="font-medium">{campaign.results}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {campaign.suggestedChanges > 0 && (
                          <Button 
                            size="sm"
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                            onClick={() => handleApplySuggestions(campaign.id)}
                          >
                            Apply Suggested Changes
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Navigation */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={() => navigate('/kwikgrowth/landing-page-generator')}
            className="btn-primary"
          >
            Go to Landing Page Generator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KwikAds;
