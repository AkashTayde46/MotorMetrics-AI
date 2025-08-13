import { Car } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Car className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold">CarShare</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-300 text-sm">
              © 2024 CarShare. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Connect car owners with buyers and renters
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 