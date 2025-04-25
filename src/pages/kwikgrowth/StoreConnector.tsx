
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Link as LinkIcon, 
  ExternalLink, 
  Check, 
  BarChart2, 
  Laptop, 
  MessageSquare, 
  Image,
  ArrowRight
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

// Form validation schema
const apiSchema = z.object({
  apiKey: z.string().min(1, { message: "API key is required" }),
});

interface ChannelCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  onConnect: () => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ 
  name, 
  description, 
  icon, 
  isConnected, 
  onConnect 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const apiForm = useForm<z.infer<typeof apiSchema>>({
    resolver: zodResolver(apiSchema),
    defaultValues: {
      apiKey: '',
    },
  });
  
  const onSubmit = (data: z.infer<typeof apiSchema>) => {
    setIsLoading(true);
    
    // Simulate API connection
    setTimeout(() => {
      setIsLoading(false);
      onConnect();
      toast({
        title: `${name} connected`,
        description: `Successfully connected to ${name}`,
      });
    }, 1500);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-yale-blue/10 flex items-center justify-center mr-3">
              {icon}
            </div>
            <CardTitle>{name}</CardTitle>
          </div>
          {isConnected && (
            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
              Connected
            </span>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        {isConnected ? (
          <div className="bg-green-50 rounded-md p-3">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-sm text-green-600">
                Account successfully connected
              </p>
            </div>
          </div>
        ) : (
          <Form {...apiForm}>
            <form onSubmit={apiForm.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={apiForm.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key / Token</FormLabel>
                    <div className="flex space-x-2">
                      <FormControl>
                        <Input placeholder="Enter API key or token" {...field} />
                      </FormControl>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => window.open(`https://${name.toLowerCase().replace(' ', '')}.com`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect Channel'}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

const StoreConnector = () => {
  const navigate = useNavigate();
  const [connectedChannels, setConnectedChannels] = useState<string[]>([]);
  
  // Analytics channels data
  const analyticsChannels = [
    {
      id: 'ga4',
      name: 'Google Analytics 4',
      description: 'Connect your GA4 property to track website performance',
      icon: <BarChart2 className="h-5 w-5 text-yale-blue" />,
    },
    {
      id: 'meta',
      name: 'Meta Ads',
      description: 'Connect your Facebook and Instagram ad accounts',
      icon: <Laptop className="h-5 w-5 text-yale-blue" />,
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      description: 'Connect your TikTok for Business account',
      icon: <MessageSquare className="h-5 w-5 text-yale-blue" />,
    },
    {
      id: 'snap',
      name: 'Snapchat',
      description: 'Connect your Snapchat Ads Manager account',
      icon: <Image className="h-5 w-5 text-yale-blue" />,
    },
  ];
  
  // GoKwik apps data
  const gokwikApps = [
    {
      id: 'kwikcheckout',
      name: 'KwikCheckout',
      description: 'Seamless checkout experience with payment options',
      icon: <LinkIcon className="h-5 w-5 text-yale-blue" />,
    },
    {
      id: 'kwikpass',
      name: 'KwikPass',
      description: 'One-click login solution for faster conversions',
      icon: <LinkIcon className="h-5 w-5 text-yale-blue" />,
    },
  ];
  
  // Handle connecting a channel
  const connectChannel = (channelId: string) => {
    if (!connectedChannels.includes(channelId)) {
      setConnectedChannels([...connectedChannels, channelId]);
    }
  };
  
  // Check if all channels are connected
  const areAllChannelsConnected = () => {
    return [...analyticsChannels, ...gokwikApps].every(channel => 
      connectedChannels.includes(channel.id)
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Store Connector</h1>
            <p className="text-gray-500">
              Connect your analytics, ad platforms, and GoKwik apps
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Connection Progress</span>
              <span className="text-sm text-gray-500">
                {connectedChannels.length} of {analyticsChannels.length + gokwikApps.length} connected
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-yale-blue rounded-full transition-all duration-500"
                style={{ width: `${(connectedChannels.length / (analyticsChannels.length + gokwikApps.length)) * 100}%` }}
              ></div>
            </div>
            
            {connectedChannels.length > 0 && (
              <div className="flex justify-end">
                <Button
                  onClick={() => navigate('/kwikgrowth/seo-optimizer')}
                  className="btn-primary"
                >
                  Continue to SEO Optimizer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analytics & Ad Platforms */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Analytics & Ad Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analyticsChannels.map((channel) => (
              <ChannelCard
                key={channel.id}
                name={channel.name}
                description={channel.description}
                icon={channel.icon}
                isConnected={connectedChannels.includes(channel.id)}
                onConnect={() => connectChannel(channel.id)}
              />
            ))}
          </div>
        </div>
        
        {/* GoKwik Apps */}
        <div>
          <h2 className="text-xl font-semibold mb-4">GoKwik Apps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gokwikApps.map((app) => (
              <ChannelCard
                key={app.id}
                name={app.name}
                description={app.description}
                icon={app.icon}
                isConnected={connectedChannels.includes(app.id)}
                onConnect={() => connectChannel(app.id)}
              />
            ))}
          </div>
        </div>
        
        {/* Quick Navigation */}
        {connectedChannels.length > 0 && (
          <div className="mt-8 flex justify-end">
            <Button
              onClick={() => navigate('/kwikgrowth/seo-optimizer')}
              className="btn-primary"
            >
              Continue to SEO Optimizer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StoreConnector;
