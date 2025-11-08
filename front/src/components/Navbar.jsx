'use client'
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-gradient-to-br from-blue-50  to-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Site Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-600 hover:text-gray-900 transition-colors duration-500">
                Atrsaw Aderajew
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-gray-600 font-bold hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md transition-all">
                    {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon changes based on the menu state */}
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-all">
                  {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;