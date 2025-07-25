// frontend/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-green-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-white text-2xl font-bold">
          EcoGasAfrica
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className={`md:flex items-center space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0">
            <li>
              <Link to="/kits" className="text-white hover:text-green-200 block py-2">Kits</Link>
            </li>
            <li>
              <Link to="/blog" className="text-white hover:text-green-200 block py-2">Blog</Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-green-200 block py-2">Contact</Link>
            </li>
            {user ? (
              <>
                {user.isAdmin && (
                  <li>
                    <Link to="/admin" className="text-white hover:text-green-200 block py-2">Admin</Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="text-white hover:text-green-200 block py-2 bg-transparent border-none cursor-pointer">
                    Logout ({user.username})
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="text-white hover:text-green-200 block py-2">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;