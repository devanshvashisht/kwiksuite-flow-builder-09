
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
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Mail, 
  Send, 
  Download, 
  ArrowRight,
  Phone,
  Sparkles,
  RefreshCw,
  Check,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

// Form validation schema
const campaignSchema = z.object({
  goal: z.string().min(1, { message: "Campaign goal is required" }),
  customerType: z.string().min(1, { message: "Customer type is required" }),
  offerDetails: z.string().min(1, { message: "Offer details are required" }),
  channelType: z.enum(["whatsapp", "email"], {
    required_error: "Please select a channel type",
  }),
});

const CrmCopilot = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSequence, setGeneratedSequence] = useState<any>(null);
  
  // Form
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      goal: '',
      customerType: '',
      offerDetails: '',
      channelType: 'whatsapp',
    },
  });
  
  // Handle form submission
  const onSubmit = (data: z.infer<typeof campaignSchema>) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      
      if (data.channelType === 'whatsapp') {
        setGeneratedSequence({
          channel: 'whatsapp',
          messages: [
            {
              id: 1,
              type: 'text',
              content: `Hi [Customer Name]! This is ${data.customerType === 'new' ? 'an exciting time to discover' : 'a great time to return to'} our store. ${data.offerDetails}`,
              timing: 'Day 1',
            },
            {
              id: 2,
              type: 'image',
              content: 'Product image with offer details',
              timing: 'Day 1',
            },
            {
              id: 3,
              type: 'text',
              content: `Did you get a chance to check out our ${data.goal === 'sales' ? 'special offer' : 'new collection'}? I'd be happy to answer any questions you might have!`,
              timing: 'Day 2',
            },
            {
              id: 4,
              type: 'text',
              content: `Last chance to take advantage of this exclusive offer! ${data.offerDetails.includes('discount') ? 'Don\'t miss out on the savings!' : 'Limited time only!'}`,
              timing: 'Day 3',
            },
          ],
        });
      } else {
        setGeneratedSequence({
          channel: 'email',
          messages: [
            {
              id: 1,
              subject: `${data.customerType === 'new' ? 'Welcome to Our Store' : 'We Miss You'}: ${data.offerDetails.includes('%') ? data.offerDetails : 'Special Offer Inside'}`,
              content: `Dear [Customer Name],\n\nWe're thrilled to ${data.customerType === 'new' ? 'welcome you to our store' : 'have you back'}! To celebrate, we're offering ${data.offerDetails}.\n\nShop now and enjoy this exclusive offer.\n\nBest regards,\nYour Store Team`,
              timing: 'Day 1',
            },
            {
              id: 2,
              subject: `Don't Miss Out: ${data.goal === 'sales' ? 'Limited Time Offer' : 'Exclusive Collection'}`,
              content: `Dear [Customer Name],\n\nJust a friendly reminder that our special offer is still available for you. ${data.offerDetails}\n\nClick here to shop now!\n\nBest regards,\nYour Store Team`,
              timing: 'Day 3',
            },
            {
              id: 3,
              subject: 'Last Chance: Offer Expires Soon',
              content: `Dear [Customer Name],\n\nThis is your last chance to take advantage of our exclusive offer. ${data.offerDetails}\n\nDon't miss out - offer expires at midnight!\n\nBest regards,\nYour Store Team`,
              timing: 'Day 5',
            },
          ],
        });
      }
      
      toast({
        title: "Sequence generated",
        description: `Your ${data.channelType === 'whatsapp' ? 'WhatsApp' : 'Email'} sequence has been generated successfully`,
      });
    }, 3000);
  };
  
  // Handle regenerate message
  const regenerateMessage = (messageId: number) => {
    setIsGenerating(true);
    
    // Simulate AI regeneration
    setTimeout(() => {
      setIsGenerating(false);
      
      if (generatedSequence.channel === 'whatsapp') {
        setGeneratedSequence({
          ...generatedSequence,
          messages: generatedSequence.messages.map((msg: any) => 
            msg.id === messageId 
              ? {
                  ...msg,
                  content: `${msg.id === 1 ? 'Hello there! ' : 'Quick reminder: '}${form.getValues().offerDetails} ${msg.id === 4 ? 'Hurry, offer ends soon!' : 'Check it out now!'}`,
                }
              : msg
          ),
        });
      } else {
        setGeneratedSequence({
          ...generatedSequence,
          messages: generatedSequence.messages.map((msg: any) => 
            msg.id === messageId 
              ? {
                  ...msg,
                  subject: msg.id === 1 ? 'Exclusive Offer Just For You' : msg.id === 2 ? 'Reminder: Your Special Offer' : 'Final Hours: Offer Ending',
                  content: `Dear [Customer Name],\n\n${msg.id === 1 ? 'We have an exclusive offer just for you!' : msg.id === 2 ? 'Just a reminder about your special offer.' : 'This is your final reminder!'} ${form.getValues().offerDetails}\n\n${msg.id === 3 ? 'Last chance to grab this deal!' : 'Click to shop now!'}\n\nBest regards,\nYour Store Team`,
                }
              : msg
          ),
        });
      }
      
      toast({
        title: "Message regenerated",
        description: "The message has been regenerated with new content",
      });
    }, 1500);
  };
  
  // Handle send test
  const sendTest = () => {
    toast({
      title: "Test message sent",
      description: `A test ${generatedSequence.channel === 'whatsapp' ? 'WhatsApp message' : 'email'} has been sent to your account`,
    });
  };
  
  // Handle export as CSV
  const exportCSV = () => {
    toast({
      title: "Sequence exported",
      description: "Your message sequence has been exported as CSV",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">CRM Co-Pilot</h1>
            <p className="text-gray-500">
              Create personalized message sequences for customer engagement
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="btn-primary" onClick={() => setGeneratedSequence(null)}>
              Create New Sequence
            </Button>
          </div>
        </div>

        {!generatedSequence ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-yale-blue" />
                Create Message Sequence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Goal</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select campaign goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sales">Increase Sales</SelectItem>
                            <SelectItem value="retention">Customer Retention</SelectItem>
                            <SelectItem value="feedback">Collect Feedback</SelectItem>
                            <SelectItem value="announcement">Product Announcement</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select customer type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new">New Customers</SelectItem>
                            <SelectItem value="existing">Existing Customers</SelectItem>
                            <SelectItem value="inactive">Inactive Customers</SelectItem>
                            <SelectItem value="vip">VIP Customers</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="offerDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Offer Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g. 20% off your next purchase, free shipping, buy one get one free" 
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
                    name="channelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message Channel</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="whatsapp" />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center">
                                <Phone className="h-4 w-4 mr-1 text-green-600" />
                                WhatsApp
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="email" />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center">
                                <Mail className="h-4 w-4 mr-1 text-blue-600" />
                                Email
                              </FormLabel>
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
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Generating Sequence...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Message Sequence
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
                  {generatedSequence.channel === 'whatsapp' ? (
                    <>
                      <Phone className="h-5 w-5 mr-2 text-green-600" />
                      WhatsApp Sequence
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5 mr-2 text-blue-600" />
                      Email Sequence
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {generatedSequence.channel === 'whatsapp' ? (
                    /* WhatsApp sequence UI */
                    <div className="space-y-4">
                      {generatedSequence.messages.map((message: any) => (
                        <div key={message.id} className="border rounded-md overflow-hidden">
                          <div className="bg-gray-50 p-3 flex justify-between items-center border-b">
                            <div className="flex items-center">
                              <span className="font-medium text-sm">{message.timing}</span>
                              {message.type === 'image' && (
                                <span className="ml-2 text-xs text-gray-500">Image Message</span>
                              )}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => regenerateMessage(message.id)}
                              disabled={isGenerating}
                            >
                              {isGenerating ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Sparkles className="h-4 w-4 text-amber-600" />
                              )}
                              <span className="ml-1 text-xs">Regenerate</span>
                            </Button>
                          </div>
                          <div className="p-4">
                            <div className="flex space-x-3">
                              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Phone className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="bg-green-50 rounded-lg p-3 max-w-[80%]">
                                <p className="text-sm">{message.content}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Email sequence UI */
                    <div className="space-y-4">
                      {generatedSequence.messages.map((message: any) => (
                        <div key={message.id} className="border rounded-md overflow-hidden">
                          <div className="bg-gray-50 p-3 flex justify-between items-center border-b">
                            <div className="flex items-center">
                              <span className="font-medium text-sm">{message.timing}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => regenerateMessage(message.id)}
                              disabled={isGenerating}
                            >
                              {isGenerating ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Sparkles className="h-4 w-4 text-amber-600" />
                              )}
                              <span className="ml-1 text-xs">Regenerate</span>
                            </Button>
                          </div>
                          <div className="p-4">
                            <div className="mb-2">
                              <span className="text-sm text-gray-500">Subject:</span>
                              <h4 className="font-medium">{message.subject}</h4>
                            </div>
                            <div className="border rounded-md p-3 bg-gray-50">
                              <p className="text-sm whitespace-pre-line">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 justify-end">
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={sendTest}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Test
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={exportCSV}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export as CSV
                    </Button>
                    <Button 
                      className="btn-primary flex items-center"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Save Sequence
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
            onClick={() => navigate('/kwikgrowth')}
            className="btn-primary"
          >
            Back to KwikGrowth Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CrmCopilot;
