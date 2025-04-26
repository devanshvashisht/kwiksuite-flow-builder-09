import { useState } from "react";
import DashboardHeader from "./layout/DashboardHeader";
import { Button } from "./ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import { 
  MessageSquare, 
  Loader2, 
  User, 
  Bot, 
  Settings, 
  PlusCircle, 
  ShoppingCart,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

// Types for chat messages
type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

// Demo conversation
const demoConversation: Message[] = [
  {
    id: "1",
    content: "Hi there! 👋 I noticed you're looking at our Premium Serum. How can I help you today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 10) // 10 minutes ago
  },
  {
    id: "2",
    content: "I'm interested in the Premium Serum, but I have sensitive skin. Will it work for me?",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 9) // 9 minutes ago
  },
  {
    id: "3",
    content: "Great question! Our Premium Serum is formulated for all skin types, including sensitive skin. It's dermatologist-tested, fragrance-free, and doesn't contain harsh chemicals that might irritate your skin. Many of our customers with sensitive skin report excellent results!",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 8) // 8 minutes ago
  },
  {
    id: "4",
    content: "That sounds good. How often should I use it?",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 7) // 7 minutes ago
  },
  {
    id: "5",
    content: "For best results, apply a small amount of the Premium Serum to your face and neck twice daily - once in the morning and once before bed, after cleansing. Gently massage it into your skin until fully absorbed. You should start seeing improvements in skin texture and appearance within 2-3 weeks of consistent use.",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 6) // 6 minutes ago
  },
  {
    id: "6",
    content: "What are the main ingredients?",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  },
  {
    id: "7",
    content: "Our Premium Serum contains: \n\n• Hyaluronic Acid - For deep hydration\n• Vitamin C - For brightening and antioxidant protection\n• Niacinamide - To minimize pores and improve skin texture\n• Peptides - To boost collagen production\n• Plant-based stem cells - For regenerative properties\n\nAll ingredients are ethically sourced and we never test on animals.",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 4) // 4 minutes ago
  },
  {
    id: "8",
    content: "It's a bit expensive compared to other serums I've used before.",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 3) // 3 minutes ago
  },
  {
    id: "9",
    content: "I understand your concern about the price. Our Premium Serum is concentrated, so a little goes a long way - one bottle typically lasts 2-3 months with regular use.\n\nHowever, I'd like to offer you a special 15% discount code (WELCOME15) that you can use on your first purchase! This discount makes it more comparable to other products while still giving you the premium quality ingredients we're known for.",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 2) // 2 minutes ago
  },
  {
    id: "10",
    content: "Thanks for the discount! I think I'll give it a try.",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 1) // 1 minute ago
  },
  {
    id: "11",
    content: "Wonderful choice! I've applied the discount code to your cart. Would you like to checkout now, or do you have any other questions about the Premium Serum or any of our other products?",
    sender: "bot",
    timestamp: new Date() // now
  }
];

const ShoppingAssistant = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(demoConversation);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWidgetPreview, setShowWidgetPreview] = useState(false);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help you with that! Our Premium Serum is designed to address multiple skin concerns including hydration, fine lines, and texture improvement.",
        "That's a great question! The Premium Serum works well with most skincare routines. For best results, apply it after cleansing and before moisturizing.",
        "Our Premium Serum is suitable for all skin types, including sensitive and acne-prone skin. It's non-comedogenic and dermatologist tested.",
        "I understand your concern. Many customers see visible results within 2-3 weeks of consistent use, with optimal results after 8 weeks."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Preview of how the widget would look on a store
  const WidgetPreview = () => (
    <div className="fixed bottom-20 right-6 max-w-xs z-10 animate-scale-in">
      <Card className="shadow-lg border border-primary/20">
        <CardHeader className="bg-primary text-white p-3 rounded-t-lg flex items-center gap-2">
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=assistant" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm">AI Shopping Assistant</CardTitle>
            <CardDescription className="text-white/80 text-xs">Online • Ready to help</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-3 text-sm bg-white">
          <p className="mb-2">Hi there! 👋 Looking for help with our Premium Serum?</p>
          <p className="text-muted-foreground text-xs italic">Click to chat with me</p>
        </CardContent>
      </Card>
    </div>
  );
  
  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        
        {showWidgetPreview && <WidgetPreview />}
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">AI Shopping Assistant</h2>
                <p className="text-muted-foreground">
                  Engage customers with AI-powered shopping assistance
                </p>
              </div>
              <Button
                onClick={() => setShowWidgetPreview(!showWidgetPreview)}
                variant={showWidgetPreview ? "default" : "outline"}
              >
                {showWidgetPreview ? "Hide Preview" : "Show Widget Preview"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <Card className="border border-border shadow-sm">
                  <CardHeader>
                    <CardTitle>Chat Simulator</CardTitle>
                    <CardDescription>
                      Preview how the AI assistant interacts with customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[500px] flex flex-col">
                    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`
                              max-w-[80%] px-4 py-2 rounded-lg 
                              ${message.sender === 'user' 
                                ? 'bg-primary text-primary-foreground ml-12' 
                                : 'bg-muted mr-12'
                              }
                            `}
                          >
                            <div className="flex items-center mb-1">
                              {message.sender === 'bot' && (
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=assistant" />
                                  <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                                </Avatar>
                              )}
                              <span className="text-xs opacity-70">
                                {message.sender === 'user' ? 'You' : 'AI Assistant'}
                              </span>
                              {message.sender === 'user' && (
                                <Avatar className="h-6 w-6 ml-2">
                                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
                                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                            <div className="whitespace-pre-line">
                              {message.content}
                            </div>
                            <div className="text-xs opacity-50 mt-1 text-right">
                              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%] mr-12">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=assistant" />
                                <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                              </Avatar>
                              <span className="text-xs opacity-70">AI Assistant</span>
                            </div>
                            <div className="flex items-center space-x-1 mt-2">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t pt-4 flex">
                      <Input 
                        placeholder="Type a message..." 
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="mr-2"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                      >
                        {isTyping ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-border shadow-sm">
                  <CardHeader>
                    <CardTitle>Example Scenarios</CardTitle>
                    <CardDescription>
                      Try these common customer scenarios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        "Is this product right for sensitive skin?",
                        "Do you offer international shipping?",
                        "What's the difference between the standard and premium version?",
                        "Can I get a discount code for my first purchase?"
                      ].map((question, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          className="w-full justify-start text-left h-auto py-2"
                          onClick={() => setInputMessage(question)}
                        >
                          {question}
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <Card className="border border-border shadow-sm">
                  <CardHeader>
                    <CardTitle>Assistant Configuration</CardTitle>
                    <CardDescription>
                      Customize how your AI assistant works
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="font-medium">Store Information</div>
                      <Input placeholder="Your store name" defaultValue="BeautyEssentials" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Product Catalog</div>
                      <div className="flex justify-between items-center border p-2 rounded-md">
                        <span className="text-sm">Premium Serum</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center border p-2 rounded-md">
                        <span className="text-sm">Hydrating Cleanser</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="font-medium">Assistant Behavior</div>
                      {[
                        {
                          label: "Personalized Greeting",
                          description: "Greet customers with contextual messages"
                        },
                        {
                          label: "Product Recommendations",
                          description: "Suggest relevant products based on the conversation"
                        },
                        {
                          label: "Offer Discounts",
                          description: "Provide special discounts to engage hesitant shoppers"
                        },
                        {
                          label: "Save Conversation History",
                          description: "Remember past interactions with returning visitors"
                        }
                      ].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <Label htmlFor={`setting-${index}`} className="font-medium">
                              {setting.label}
                            </Label>
                            <p className="text-xs text-muted-foreground">{setting.description}</p>
                          </div>
                          <Switch id={`setting-${index}`} defaultChecked={index < 3} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Settings saved",
                          description: "Your AI assistant configuration has been updated."
                        });
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Save Configuration
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="border border-border shadow-sm bg-gradient-to-br from-indigo-50 to-blue-50">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-indigo-600" />
                      <CardTitle className="text-indigo-800">Conversion Boost</CardTitle>
                    </div>
                    <CardDescription className="text-indigo-700">
                      The impact of AI Shopping Assistant on your store
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-indigo-600">+24%</div>
                        <div className="text-xs text-indigo-700">Conversion Rate</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-indigo-600">3.5min</div>
                        <div className="text-xs text-indigo-700">Avg. Session Time</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-indigo-700">
                      <p className="mb-2 font-medium">How it works:</p>
                      <ul className="space-y-1 list-disc pl-4 text-xs">
                        <li>Answers customer questions instantly</li>
                        <li>Provides personalized product recommendations</li>
                        <li>Offers strategic discounts to hesitant shoppers</li>
                        <li>Creates a memorable shopping experience</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => {
                        toast({
                          title: "Widget Installed",
                          description: "Your AI Shopping Assistant has been installed on your store."
                        });
                        
                        setShowWidgetPreview(true);
                      }}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Install on Your Store
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShoppingAssistant;