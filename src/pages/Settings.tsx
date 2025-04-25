
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';
import { Save, User, Store as StoreIcon, CreditCard, BellRing } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
});

const storeFormSchema = z.object({
  storeName: z.string().min(2, { message: "Store name must be at least 2 characters." }),
  storeUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  businessType: z.string(),
});

const Settings = () => {
  const { onboarding } = useApp();

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Store Owner",
      email: onboarding.email || "",
    },
  });

  const storeForm = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeName: onboarding.store?.name || "",
      storeUrl: "",
      businessType: onboarding.store?.category || "",
    },
  });

  const onProfileSubmit = (data: z.infer<typeof profileFormSchema>) => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated.",
    });
  };

  const onStoreSubmit = (data: z.infer<typeof storeFormSchema>) => {
    toast({
      title: "Store information updated",
      description: "Your store information has been updated.",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Settings</h1>
            <p className="text-gray-500">
              Manage your account and store settings
            </p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="store" className="flex items-center">
              <StoreIcon className="h-4 w-4 mr-2" />
              Store
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <BellRing className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your personal information and account settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="h-16 w-16 rounded-full bg-oxford-blue text-white flex items-center justify-center text-xl font-bold">
                        SO
                      </div>
                      <Button variant="outline" type="button">
                        Change Avatar
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="btn-primary flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="store">
            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
                <CardDescription>
                  Manage your store information and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...storeForm}>
                  <form onSubmit={storeForm.handleSubmit(onStoreSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={storeForm.control}
                        name="storeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Store Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Store Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={storeForm.control}
                        name="storeUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Store URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://yourstore.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter your store URL if you already have one
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={storeForm.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                                <SelectItem value="electronics">Electronics</SelectItem>
                                <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                                <SelectItem value="home">Home & Garden</SelectItem>
                                <SelectItem value="food">Food & Beverage</SelectItem>
                                <SelectItem value="health">Health & Wellness</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="btn-primary flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Settings</CardTitle>
                <CardDescription>
                  Manage your subscription and payment information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-md border p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-medium">Current Plan: {onboarding.plan?.charAt(0).toUpperCase() + onboarding.plan?.slice(1)}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Your plan renews on May 25, 2025
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button variant="outline">
                          Change Plan
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-4">Payment Method</h3>
                    <div className="flex items-center">
                      <div className="h-10 w-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                        <span className="font-medium text-gray-800">Visa</span>
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-gray-500">Expires 05/2026</p>
                      </div>
                      <div className="ml-auto">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-4">Billing History</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4 font-medium">Date</th>
                            <th className="text-left py-2 px-4 font-medium">Description</th>
                            <th className="text-left py-2 px-4 font-medium">Amount</th>
                            <th className="text-right py-2 px-4 font-medium">Receipt</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-4">Apr 25, 2025</td>
                            <td className="py-2 px-4">Monthly Subscription</td>
                            <td className="py-2 px-4">$49.00</td>
                            <td className="py-2 px-4 text-right">
                              <Button variant="link" size="sm" className="text-yale-blue">
                                Download
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-gray-500">Receive updates about your store orders</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          All
                        </Button>
                        <Button variant="ghost" size="sm">
                          Important Only
                        </Button>
                        <Button variant="ghost" size="sm">
                          None
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Marketing Updates</p>
                        <p className="text-sm text-gray-500">Receive updates about marketing campaigns</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          All
                        </Button>
                        <Button variant="ghost" size="sm">
                          Important Only
                        </Button>
                        <Button variant="ghost" size="sm">
                          None
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Product Updates</p>
                        <p className="text-sm text-gray-500">Receive updates about KwikSuite</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          All
                        </Button>
                        <Button variant="ghost" size="sm">
                          Important Only
                        </Button>
                        <Button variant="ghost" size="sm">
                          None
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="btn-primary">
                    Save Notification Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
