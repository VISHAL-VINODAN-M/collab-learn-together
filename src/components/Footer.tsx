
import React from 'react';
import { Book } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Book className="h-6 w-6 text-brand-purple" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
              Class Collab
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left mb-4 md:mb-0">
            <a href="#" className="text-gray-600 hover:text-brand-purple mb-2 md:mb-0">About Us</a>
            <a href="#" className="text-gray-600 hover:text-brand-purple mb-2 md:mb-0">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-brand-purple mb-2 md:mb-0">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-brand-purple">Contact</a>
          </div>
          
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Class Collab. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
