import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/license" className="text-gray-300 hover:text-white transition-colors">
            License
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            &copy; 2024 Directory Maker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;





