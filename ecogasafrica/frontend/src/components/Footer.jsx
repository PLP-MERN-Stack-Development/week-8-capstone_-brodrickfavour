// frontend/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">EcoGasAfrica</h3>
            <p className="text-sm">
              Empowering communities through sustainable biogas energy and waste conversion innovation across Africa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/kits" className="hover:text-green-200 text-sm">Our Kits</Link></li>
              <li><Link to="/blog" className="hover:text-green-200 text-sm">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-green-200 text-sm">Contact Us</Link></li>
              {/* Add Privacy Policy, Terms of Service links if available */}
            </ul>
          </div>

          {/* Contact Info / Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <p className="text-sm">Email: info@ecogasafrica.com</p>
            <p className="text-sm mt-1">Phone: +234 9021 5340 41</p>
            <div className="flex justify-center space-x-4 mt-4">
              {/* Placeholder for social media icons */}
              <a href="#" className="hover:text-green-200"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-green-200"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-green-200"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-6 text-sm">
          &copy; {new Date().getFullYear()} EcoGasAfrica. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;