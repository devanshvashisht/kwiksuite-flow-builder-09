
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Package, 
  Truck, 
  Globe, 
  Settings, 
  Plus, 
  Search,
  ArrowUpDown,
  Badge,
  CheckCircle,
  Download,
  ExternalLink
} from 'lucide-react';

const KwikShip = () => {
  // Modal state
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  
  // Connected carriers
  const [connectedCarriers, setConnectedCarriers] = useState([
    { id: 1, name: 'DHL Express', status: 'active', shipments: 124, rates: 'Standard' },
    { id: 2, name: 'UPS', status: 'active', shipments: 87, rates: 'Negotiated' },
  ]);

  // Mock shipments
  const recentShipments = [
    { id: 'SHP-2345', date: '2025-04-24', customer: 'James Wilson', destination: 'Chicago, IL', status: 'Delivered', carrier: 'UPS', tracking: '1Z9999W99999999999' },
    { id: 'SHP-2344', date: '2025-04-23', customer: 'Emily Chen', destination: 'San Francisco, CA', status: 'In Transit', carrier: 'DHL Express', tracking: '7777777770' },
    { id: 'SHP-2343', date: '2025-04-23', customer: 'Michael Brown', destination: 'New York, NY', status: 'Shipped', carrier: 'UPS', tracking: '1Z9999W99999999998' },
    { id: 'SHP-2342', date: '2025-04-22', customer: 'Sarah Johnson', destination: 'Austin, TX', status: 'Processing', carrier: 'DHL Express', tracking: '7777777771' },
    { id: 'SHP-2341', date: '2025-04-22', customer: 'Alex Rodriguez', destination: 'Miami, FL', status: 'Delivered', carrier: 'UPS', tracking: '1Z9999W99999999997' },
  ];

  // Available logistics partners
  const logisticsPartners = [
    { id: 'dhl', name: 'DHL Express', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/DHL_Express_logo.svg/200px-DHL_Express_logo.svg.png' },
    { id: 'ups', name: 'UPS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPS_Logo_Shield_2017.svg/200px-UPS_Logo_Shield_2017.svg.png' },
    { id: 'fedex', name: 'FedEx', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/FedEx_Express.svg/200px-FedEx_Express.svg.png' },
    { id: 'usps', name: 'USPS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/United_States_Postal_Service_Logo.svg/200px-United_States_Postal_Service_Logo.svg.png' },
    { id: 'australia-post', name: 'Australia Post', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Australia_Post_logo.svg/200px-Australia_Post_logo.svg.png' },
    { id: 'royal-mail', name: 'Royal Mail', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Royal_Mail.svg/200px-Royal_Mail.svg.png' },
  ];

  // Connect carrier handler
  const handleConnectCarrier = () => {
    if (selectedProvider) {
      const newCarrier = {
        id: connectedCarriers.length + 3,
        name: logisticsPartners.find(p => p.id === selectedProvider)?.name || '',
        status: 'active',
        shipments: 0,
        rates: 'Standard'
      };
      
      setConnectedCarriers([...connectedCarriers, newCarrier]);
      setIsConnectModalOpen(false);
      // In a real app, we would make an API call to connect the carrier
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">KwikShip</h1>
            <p className="text-gray-500">
              Manage your logistics and shipping operations
            </p>
          </div>
          <div className="mt-4 md:mt-0 space-x-2">
            <Dialog open={isConnectModalOpen} onOpenChange={setIsConnectModalOpen}>
              <DialogTrigger asChild>
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Connect Carrier
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Connect Shipping Carrier</DialogTitle>
                  <DialogDescription>
                    Link your shipping carrier account to enable automatic shipping rate calculation and label generation.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-1 block">Select Shipping Carrier</label>
                    <Select value={selectedProvider || ''} onValueChange={setSelectedProvider}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a carrier" />
                      </SelectTrigger>
                      <SelectContent>
                        {logisticsPartners.map(partner => (
                          <SelectItem key={partner.id} value={partner.id}>
                            <div className="flex items-center">
                              <img src={partner.logo} alt={partner.name} className="h-5 w-auto mr-2" />
                              {partner.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedProvider && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">API Key</label>
                        <Input type="password" placeholder="Enter your carrier API key" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Account Number</label>
                        <Input placeholder="Enter your account number" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsConnectModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleConnectCarrier} disabled={!selectedProvider}>
                    Connect Carrier
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Shipping Settings
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Overview</CardTitle>
            <CardDescription>
              Monitor your shipping performance and carrier connections.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <div className="flex items-center mb-3">
                  <Package className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium">Total Shipments</h3>
                </div>
                <div className="text-3xl font-bold text-blue-700">211</div>
                <p className="text-sm text-blue-600 mt-1">Last 30 days</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-medium">Delivered</h3>
                </div>
                <div className="text-3xl font-bold text-green-700">185</div>
                <p className="text-sm text-green-600 mt-1">87.7% success rate</p>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
                <div className="flex items-center mb-3">
                  <Truck className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="font-medium">In Transit</h3>
                </div>
                <div className="text-3xl font-bold text-amber-700">24</div>
                <p className="text-sm text-amber-600 mt-1">All on schedule</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <div className="flex items-center mb-3">
                  <Globe className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="font-medium">Countries</h3>
                </div>
                <div className="text-3xl font-bold text-purple-700">18</div>
                <p className="text-sm text-purple-600 mt-1">Shipping destinations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="shipments" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="shipments">Recent Shipments</TabsTrigger>
            <TabsTrigger value="carriers">Connected Carriers</TabsTrigger>
            <TabsTrigger value="rates">Shipping Rates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shipments">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <CardTitle>Recent Shipments</CardTitle>
                  <div className="flex items-center mt-2 md:mt-0">
                    <div className="relative mr-2">
                      <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
                      <Input placeholder="Search shipments..." className="pl-8 h-9" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1.5" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Shipment ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead className="w-[100px]">Tracking</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentShipments.map(shipment => (
                        <TableRow key={shipment.id}>
                          <TableCell className="font-medium">{shipment.id}</TableCell>
                          <TableCell>{shipment.date}</TableCell>
                          <TableCell>{shipment.customer}</TableCell>
                          <TableCell>{shipment.destination}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                              shipment.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              shipment.status === 'In Transit' ? 'bg-amber-100 text-amber-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {shipment.status}
                            </span>
                          </TableCell>
                          <TableCell>{shipment.carrier}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
                              <a href="#" target="_blank" rel="noopener noreferrer">
                                Track
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="carriers">
            <Card>
              <CardHeader>
                <CardTitle>Connected Shipping Carriers</CardTitle>
                <CardDescription>Manage your shipping carrier integrations.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {connectedCarriers.map(carrier => (
                    <Card key={carrier.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                            <span className="text-lg font-semibold">{carrier.name}</span>
                            <span className={`inline-flex items-center text-xs ${
                              carrier.status === 'active' ? 'text-green-600' : 'text-gray-500'
                            } mt-1`}>
                              <span className={`h-2 w-2 rounded-full ${
                                carrier.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                              } mr-1`}></span>
                              {carrier.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">Settings</Button>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Shipments</span>
                            <span>{carrier.shipments}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Rate Type</span>
                            <span>{carrier.rates}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <Button variant="outline" size="sm" className="w-full">
                            Generate Label
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Dialog open={isConnectModalOpen} onOpenChange={setIsConnectModalOpen}>
                    <DialogTrigger asChild>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center p-6 h-full cursor-pointer hover:border-gray-300 transition-colors">
                        <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                          <Plus className="h-6 w-6 text-gray-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">Add Carrier</h3>
                        <p className="text-sm text-gray-500 text-center">Connect a new shipping carrier</p>
                      </div>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rates">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Rate Comparison</CardTitle>
                <CardDescription>Compare shipping rates across different carriers.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Origin</label>
                      <Input placeholder="Enter origin zip code" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Destination</label>
                      <Input placeholder="Enter destination zip code" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Package Weight (lbs)</label>
                      <Input type="number" min="0" step="0.1" defaultValue="2" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Compare Rates</Button>
                  </div>
                  
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Carrier</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Delivery Time</TableHead>
                          <TableHead>
                            <div className="flex items-center">
                              Price
                              <ArrowUpDown className="h-4 w-4 ml-1" />
                            </div>
                          </TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>UPS</TableCell>
                          <TableCell>Ground</TableCell>
                          <TableCell>3-5 business days</TableCell>
                          <TableCell>$8.75</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm">Select</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-green-50">
                          <TableCell>
                            <div className="flex items-center">
                              DHL Express
                              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100 border-none">Best Value</Badge>
                            </div>
                          </TableCell>
                          <TableCell>Ground</TableCell>
                          <TableCell>3-4 business days</TableCell>
                          <TableCell className="font-medium">$7.50</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm">Select</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>UPS</TableCell>
                          <TableCell>2nd Day Air</TableCell>
                          <TableCell>2 business days</TableCell>
                          <TableCell>$15.25</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm">Select</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>FedEx</TableCell>
                          <TableCell>Express</TableCell>
                          <TableCell>1-2 business days</TableCell>
                          <TableCell>$21.80</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm">Select</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default KwikShip;
