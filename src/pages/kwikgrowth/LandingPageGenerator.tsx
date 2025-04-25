
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
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { 
  Layout, 
  Code, 
  Copy, 
  ArrowRight,
  Download,
  ExternalLink,
  CheckCircle,
  Blocks,
  Wand2,
  Sparkles
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

// Form validation schema
const landingPageSchema = z.object({
  goal: z.string().min(1, { message: "Goal is required" }),
  product: z.string().min(1, { message: "Product information is required" }),
  offer: z.string().min(1, { message: "Offer details are required" }),
  style: z.enum(["minimal", "bold", "elegant"], {
    required_error: "Please select a design style",
  }),
});

const LandingPageGenerator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPage, setGeneratedPage] = useState<any>(null);
  
  // Form
  const form = useForm<z.infer<typeof landingPageSchema>>({
    resolver: zodResolver(landingPageSchema),
    defaultValues: {
      goal: '',
      product: '',
      offer: '',
      style: 'minimal',
    },
  });
  
  // Handle form submission
  const onSubmit = (data: z.infer<typeof landingPageSchema>) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPage({
        title: `${data.product} - Special ${data.offer.includes('%') ? data.offer : 'Offer'}`,
        headline: generateHeadline(data),
        description: generateDescription(data),
        cta: generateCTA(data),
        style: data.style,
        sections: [
          { type: 'hero', content: 'Hero section with product image and headline' },
          { type: 'features', content: 'Key product features section' },
          { type: 'testimonials', content: 'Customer testimonials' },
          { type: 'offer', content: data.offer },
          { type: 'cta', content: 'Call to action section' },
        ],
        utmUrl: `https://yourdomain.com/landing?utm_source=kwikgrowth&utm_medium=generator&utm_campaign=${data.product.toLowerCase().replace(/\s+/g, '-')}&utm_content=${data.goal.toLowerCase().replace(/\s+/g, '-')}`,
      });
      
      toast({
        title: "Landing page generated",
        description: "Your AI landing page has been generated successfully",
      });
    }, 3000);
  };
  
  // Helper functions to generate content
  const generateHeadline = (data: z.infer<typeof landingPageSchema>) => {
    const templates = [
      `Introducing: ${data.product} - ${data.offer}`,
      `The Perfect ${data.product} for ${data.goal}`,
      `Transform Your ${data.goal} with Our ${data.product}`,
      `Exclusive Offer: ${data.offer} on ${data.product}`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  };
  
  const generateDescription = (data: z.infer<typeof landingPageSchema>) => {
    return `Our premium ${data.product} is designed to help you ${data.goal.toLowerCase()}. With exceptional quality and performance, it stands out from the competition. For a limited time, take advantage of our special offer: ${data.offer}.`;
  };
  
  const generateCTA = (data: z.infer<typeof landingPageSchema>) => {
    const ctas = [
      'Shop Now',
      'Get Started',
      'Claim Offer',
      'Buy Now',
    ];
    return ctas[Math.floor(Math.random() * ctas.length)];
  };
  
  // Handle copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard",
    });
  };
  
  // Handle downloading HTML
  const downloadHTML = () => {
    toast({
      title: "HTML downloaded",
      description: "The landing page HTML has been downloaded",
    });
  };
  
  // Handle publishing to store
  const publishToStore = () => {
    toast({
      title: "Published to store",
      description: "The landing page has been published to your store",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">AI Landing Page Generator</h1>
            <p className="text-gray-500">
              Create high-converting landing pages with AI assistance
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="btn-primary" onClick={() => setGeneratedPage(null)}>
              Create New Page
            </Button>
          </div>
        </div>

        {!generatedPage ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wand2 className="h-5 w-5 mr-2 text-yale-blue" />
                Create Landing Page
              </CardTitle>
              <CardDescription>
                Provide details about your landing page and let AI generate it for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Landing Page Goal</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Increase product sales, collect leads, promote event" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product or Service Information</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your product or service. Include key features and benefits." 
                            {...field} 
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="offer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Offer (if any)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 20% off, Free shipping, Buy one get one free" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Design Style</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                          >
                            <FormItem className="flex flex-col items-start space-y-0 rounded-md border border-gray-200 p-4 hover:border-yale-blue">
                              <FormControl>
                                <RadioGroupItem value="minimal" className="sr-only" />
                              </FormControl>
                              <div className={`flex flex-col ${field.value === 'minimal' ? 'text-yale-blue' : ''}`}>
                                <div className="font-semibold">Minimal</div>
                                <div className="text-sm text-gray-500 mt-1">Clean and modern design with focus on content</div>
                              </div>
                            </FormItem>
                            <FormItem className="flex flex-col items-start space-y-0 rounded-md border border-gray-200 p-4 hover:border-yale-blue">
                              <FormControl>
                                <RadioGroupItem value="bold" className="sr-only" />
                              </FormControl>
                              <div className={`flex flex-col ${field.value === 'bold' ? 'text-yale-blue' : ''}`}>
                                <div className="font-semibold">Bold & Vibrant</div>
                                <div className="text-sm text-gray-500 mt-1">Colorful and energetic design for high impact</div>
                              </div>
                            </FormItem>
                            <FormItem className="flex flex-col items-start space-y-0 rounded-md border border-gray-200 p-4 hover:border-yale-blue">
                              <FormControl>
                                <RadioGroupItem value="elegant" className="sr-only" />
                              </FormControl>
                              <div className={`flex flex-col ${field.value === 'elegant' ? 'text-yale-blue' : ''}`}>
                                <div className="font-semibold">Elegant</div>
                                <div className="text-sm text-gray-500 mt-1">Sophisticated design for luxury products</div>
                              </div>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Landing Page...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Landing Page
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Generated Landing Page
                </CardTitle>
                <CardDescription>
                  Your AI-generated landing page is ready
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Landing Page Preview</h3>
                        <Badge variant="outline">{generatedPage.style} style</Badge>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="bg-white border rounded-md p-6 max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                          <div className="inline-block mx-auto mb-4 h-20 w-20 bg-gray-200 rounded-full"></div>
                          <h1 className="text-2xl font-bold mb-2">{generatedPage.headline}</h1>
                          <p className="text-gray-600">{generatedPage.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="text-center">
                            <div className="inline-block h-12 w-12 bg-gray-200 rounded-full mb-2"></div>
                            <h3 className="font-medium mb-1">Feature 1</h3>
                            <p className="text-xs text-gray-500">Description</p>
                          </div>
                          <div className="text-center">
                            <div className="inline-block h-12 w-12 bg-gray-200 rounded-full mb-2"></div>
                            <h3 className="font-medium mb-1">Feature 2</h3>
                            <p className="text-xs text-gray-500">Description</p>
                          </div>
                          <div className="text-center">
                            <div className="inline-block h-12 w-12 bg-gray-200 rounded-full mb-2"></div>
                            <h3 className="font-medium mb-1">Feature 3</h3>
                            <p className="text-xs text-gray-500">Description</p>
                          </div>
                        </div>
                        
                        <div className="text-center mb-8">
                          <div className="inline-block px-6 py-3 bg-yale-blue text-white rounded-md">
                            {generatedPage.cta}
                          </div>
                        </div>
                        
                        <div className="border-t pt-4 text-center">
                          <p className="text-xs text-gray-500">Special offer: {generatedPage.offer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Page Structure</h3>
                      <div className="space-y-2">
                        {generatedPage.sections.map((section: any, index: number) => (
                          <div key={index} className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
                            <Blocks className="h-4 w-4 text-yale-blue mr-2" />
                            <span className="text-sm">{section.type.charAt(0).toUpperCase() + section.type.slice(1)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">UTM Tracking URL</h3>
                      <div className="flex items-center space-x-2">
                        <Input value={generatedPage.utmUrl} readOnly className="bg-gray-50" />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => copyToClipboard(generatedPage.utmUrl)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Use this URL for tracking campaign performance
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 justify-end">
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={downloadHTML}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download HTML
                    </Button>
                    <Button 
                      className="btn-primary flex items-center"
                      onClick={publishToStore}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Publish to Store
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Navigation */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={() => navigate('/kwikgrowth/crm-copilot')}
            className="btn-primary"
          >
            Go to CRM Co-Pilot
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LandingPageGenerator;
