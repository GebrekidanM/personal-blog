// components/Footer.js

import Link from 'next/link';
import { FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa'; // Importing social icons

const Footer = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/atrsaw-aderajew', icon: FaLinkedin },
    // Add Atrsaw's YouTube and TikTok links here when ready
    // { name: 'YouTube', href: '#', icon: FaYoutube },
    // { name: 'TikTok', href: '#', icon: FaTiktok },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          
          {/* Left Side: Navigation Links */}
          <div className="flex justify-center space-x-6 md:order-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side: Social Media & Copyright */}
          <div className="mt-8 md:mt-0 md:order-1">
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Atrsaw Aderajew. All Rights Reserved.
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;