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
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-black">Directory Maker</Link>
        <nav className="flex space-x-6">
          <span
            className="cursor-pointer text-black hover:text-blue-600"
            onClick={() => handleNavClick('features')}
          >
            Features
          </span>
          <span
            className="cursor-pointer text-black hover:text-blue-600"
            onClick={() => handleNavClick('pricing')}
          >
            Pricing
          </span>
          <span
            className="cursor-pointer text-black hover:text-blue-600"
            onClick={() => handleNavClick('faq')}
          >
            FAQ
          </span>
        </nav>
      </div>
    </header>
  );
}

export default Header;














