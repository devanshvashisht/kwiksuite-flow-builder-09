
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-oxford-blue">
              Kwik<span className="text-yale-blue">Suite</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/kwikbuddy" className="text-gray-600 hover:text-yale-blue transition-colors">
              KwikBuddy
            </Link>
            <Link to="/kwikgrowth" className="text-gray-600 hover:text-yale-blue transition-colors">
              KwikGrowth
            </Link>
            <Link to="/campaigns" className="text-gray-600 hover:text-yale-blue transition-colors">
              Campaigns
            </Link>
            <Link to="/settings" className="text-gray-600 hover:text-yale-blue transition-colors">
              Settings
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/onboarding">
            <Button className="btn-primary">Get Started</Button>
          </Link>
          <Button variant="outline" className="btn-secondary hidden md:inline-flex">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
