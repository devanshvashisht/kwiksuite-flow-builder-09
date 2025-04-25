
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  Check, 
  ArrowRight, 
  ExternalLink,
  FileCode,
  BarChart2,
  AlertCircle
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Form validation schema
const pixelSchema = z.object({
  ga4Id: z.string().optional(),
  metaPixelId: z.string().optional(),
  tiktokPixelId: z.string().optional(),
  snapPixelId: z.string().optional(),
});

const SeoSetup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { kwikBuddyProgress, updateKwikBuddyProgress } = useApp();
  
  const [currentProgress, setCurrentProgress] = useState(kwikBuddyProgress.seo);
  const [connectedServices, setConnectedServices] = useState<string[]>([]);
  
  // Pixel setup form
  const pixelForm = useForm<z.infer<typeof pixelSchema>>({
    resolver: zodResolver(pixelSchema),
    defaultValues: {
      ga4Id: '',
      metaPixelId: '',
      tiktokPixelId: '',
      snapPixelId: '',
    },
  });
  
  // Handle pixel form submission
  const onPixelSubmit = (data: z.infer<typeof pixelSchema>) => {
    // Add all filled fields to connected services
    const newConnections: string[] = [];
    
    if (data.ga4Id) newConnections.push('ga4');
    if (data.metaPixelId) newConnections.push('meta');
    if (data.tiktokPixelId) newConnections.push('tiktok');
    if (data.snapPixelId) newConnections.push('snap');
    
    setConnectedServices([...connectedServices, ...newConnections]);
    
    // Calculate new progress based on connected services
    const progressIncrement = newConnections.length * 25; // 25% for each service
    const newProgress = Math.min(100, currentProgress + progressIncrement);
    
    updateProgress(newProgress);
    
    toast({
      title: "Analytics connected",
      description: `Successfully connected ${newConnections.length} analytics services.`,
    });
    
    if (newProgress === 100) {
      // If progress is 100%, navigate to next step after a delay
      setTimeout(() => {
        navigate('/kwikbuddy/payments-shipping');
      }, 1500);
    }
  };
  
  // Update progress state and context
  const updateProgress = (newProgress: number) => {
    setCurrentProgress(newProgress);
    updateKwikBuddyProgress({
      seo: newProgress,
      currentStep: 2,
    });
  };

  // Handle skipping to next step
  const skipToNext = () => {
    updateProgress(100);
    navigate('/kwikbuddy/payments-shipping');
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">SEO Setup</h1>
            <p className="text-gray-500">
              Connect analytics services and set up your SEO foundation
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-sm font-medium mr-2">{currentProgress}% Complete</span>
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yale-blue rounded-full transition-all duration-500"
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2 text-yale-blue" />
              Connect Analytics & Tracking Pixels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Connect your analytics and tracking pixels to monitor your store's performance and optimize your marketing campaigns.
              </p>
            </div>
            
            <Form {...pixelForm}>
              <form onSubmit={pixelForm.handleSubmit(onPixelSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Google Analytics 4 */}
                  <FormField
                    control={pixelForm.control}
                    name="ga4Id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Google Analytics 4 
                          {connectedServices.includes('ga4') && 
                            <span className="ml-2 text-xs text-white bg-green-500 px-2 py-0.5 rounded-full">Connected</span>
                          }
                        </FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            <Input placeholder="G-XXXXXXXXXX" {...field} disabled={connectedServices.includes('ga4')} />
                            {!connectedServices.includes('ga4') && (
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="icon"
                                onClick={() => window.open('https://analytics.google.com/', '_blank')}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Meta Pixel */}
                  <FormField
                    control={pixelForm.control}
                    name="metaPixelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Meta Pixel 
                          {connectedServices.includes('meta') && 
                            <span className="ml-2 text-xs text-white bg-green-500 px-2 py-0.5 rounded-full">Connected</span>
                          }
                        </FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            <Input placeholder="1234567890" {...field}  disabled={connectedServices.includes('meta')} />
                            {!connectedServices.includes('meta') && (
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="icon"
                                onClick={() => window.open('https://business.facebook.com/events_manager', '_blank')}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* TikTok Pixel */}
                  <FormField
                    control={pixelForm.control}
                    name="tiktokPixelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          TikTok Pixel 
                          {connectedServices.includes('tiktok') && 
                            <span className="ml-2 text-xs text-white bg-green-500 px-2 py-0.5 rounded-full">Connected</span>
                          }
                        </FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            <Input placeholder="C8ABCDEFGH" {...field} disabled={connectedServices.includes('tiktok')} />
                            {!connectedServices.includes('tiktok') && (
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="icon"
                                onClick={() => window.open('https://ads.tiktok.com/marketing_api/docs?id=1701890979375106', '_blank')}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Snap Pixel */}
                  <FormField
                    control={pixelForm.control}
                    name="snapPixelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Snap Pixel 
                          {connectedServices.includes('snap') && 
                            <span className="ml-2 text-xs text-white bg-green-500 px-2 py-0.5 rounded-full">Connected</span>
                          }
                        </FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            <Input placeholder="12345-abcde" {...field} disabled={connectedServices.includes('snap')} />
                            {!connectedServices.includes('snap') && (
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="icon"
                                onClick={() => window.open('https://ads.snapchat.com/', '_blank')}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/kwikbuddy/website-setup')}
                  >
                    Back
                  </Button>
                  <div className="space-x-3">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={skipToNext}
                    >
                      Skip for Now
                    </Button>
                    <Button 
                      type="submit" 
                      className="btn-primary"
                      disabled={
                        pixelForm.formState.isSubmitting ||
                        (!pixelForm.getValues().ga4Id &&
                        !pixelForm.getValues().metaPixelId &&
                        !pixelForm.getValues().tiktokPixelId &&
                        !pixelForm.getValues().snapPixelId)
                      }
                    >
                      Connect Services
                      <Check className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* SEO Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCode className="h-5 w-5 mr-2 text-yale-blue" />
              SEO Quick Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Meta Tags Implementation</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 mb-2">
                    Ensure your store has proper meta tags for title, description, and Open Graph content.
                  </p>
                  <div className="bg-gray-100 p-3 rounded-md font-mono text-xs overflow-x-auto">
                    &lt;title&gt;Your Product Name | Your Store&lt;/title&gt;<br />
                    &lt;meta name="description" content="Description of your product or page"&gt;<br />
                    &lt;meta property="og:title" content="Your Product for Social Sharing"&gt;<br />
                    &lt;meta property="og:description" content="Compelling description for social"&gt;
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Product Page Optimization</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Use descriptive, keyword-rich product titles</li>
                    <li>Write unique product descriptions (300+ words)</li>
                    <li>Include schema markup for products and reviews</li>
                    <li>Optimize image alt tags with descriptive keywords</li>
                    <li>Ensure proper URL structure (example.com/category/product-name)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Site Speed Optimization</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 mb-2">
                    Fast-loading sites rank better and convert more visitors.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Compress and properly size all images</li>
                    <li>Minimize unnecessary apps and scripts</li>
                    <li>Enable browser caching</li>
                    <li>Use a content delivery network (CDN)</li>
                    <li>Implement lazy loading for images</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Mobile Optimization</AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-start mb-3">
                    <AlertCircle className="h-5 w-5 text-yale-blue mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">
                      Google uses mobile-first indexing, so your mobile experience is critical for SEO.
                    </p>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Ensure responsive design across all pages</li>
                    <li>Check font sizes are readable on mobile (minimum 16px)</li>
                    <li>Ensure tap targets (buttons, links) are large enough</li>
                    <li>Test site using Google's Mobile-Friendly Test tool</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-6">
              <Button 
                className="w-full flex items-center justify-center"
                variant="outline"
                onClick={() => {
                  toast({
                    title: "SEO Guide Downloaded",
                    description: "The complete SEO guide has been downloaded",
                  });
                }}
              >
                <BarChart2 className="h-4 w-4 mr-2" />
                Download Complete SEO Guide
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Next Step CTA */}
        {currentProgress === 100 && (
          <div className="flex justify-end">
            <Button 
              onClick={() => navigate('/kwikbuddy/payments-shipping')}
              className="btn-primary"
            >
              Continue to Payments & Shipping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SeoSetup;
