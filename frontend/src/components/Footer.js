import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8">
          <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/license" className="hover:underline">License</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm">&copy; 2024 Directory Maker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;





