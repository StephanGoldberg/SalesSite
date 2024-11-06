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
    <header className="header">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">Directory Maker</Link>
        <nav className="flex space-x-6">
          <span className="cursor-pointer hover:text-blue-400" onClick={() => handleNavClick('features')}>Features</span>
          <span className="cursor-pointer hover:text-blue-400" onClick={() => handleNavClick('pricing')}>Pricing</span>
          <span className="cursor-pointer hover:text-blue-400" onClick={() => handleNavClick('faq')}>FAQ</span>
        </nav>
      </div>
    </header>
  );
}

export default Header;















