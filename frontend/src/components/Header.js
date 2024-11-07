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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">
            Directory Maker
          </Link>
          <nav className="flex">
            <ul className="flex space-x-2 sm:space-x-8">
              <li>
                <button 
                  onClick={() => handleNavClick('features')} 
                  className="text-sm sm:text-base text-white hover:text-purple-400 transition-colors px-2 sm:px-4 py-2"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('pricing')} 
                  className="text-sm sm:text-base text-white hover:text-purple-400 transition-colors px-2 sm:px-4 py-2"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('faq')} 
                  className="text-sm sm:text-base text-white hover:text-purple-400 transition-colors px-2 sm:px-4 py-2"
                >
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

















