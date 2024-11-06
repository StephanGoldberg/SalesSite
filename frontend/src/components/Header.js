import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleNavClick = (sectionId) => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="bg-black/90 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
            Directory Maker
          </Link>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <button onClick={() => handleNavClick('features')} 
                  className="text-gray-300 hover:text-white transition-colors px-3 py-2">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('pricing')} 
                  className="text-gray-300 hover:text-white transition-colors px-3 py-2">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} 
                  className="text-gray-300 hover:text-white transition-colors px-3 py-2">
                  FAQ
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

















