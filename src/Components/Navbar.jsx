// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Search, Zap, User } from 'lucide-react';

// const Navbar = () => {
//   const navLinkClasses = "text-white/60 hover:text-white transition-colors duration-200";

//   return (
//     <nav className="bg-gray-900 shadow-sm py-2">
//       <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
//             {/* Placeholder for logo image/icon */}
//             <span className="text-white text-xs">Y</span>
//           </div>
//           <div className="flex flex-col leading-none select-none text-left">
//             <span className="text-white text-sm font-bold">
//               YVO3D <span className="text-xs italic text-white/70">beta</span>
//             </span>
//             <span className="text-[9px] font-normal text-zinc-600 italic text-opacity-80">
//               by YVOVY
//             </span>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex space-x-6">
//           <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-500 font-medium" : navLinkClasses}>
//             Home
//           </NavLink>
//           <NavLink to="/editor" className={({ isActive }) => isActive ? "text-blue-500 font-medium" : navLinkClasses}>
//             Editor
//           </NavLink>
//           <NavLink to="/library" className={({ isActive }) => isActive ? "text-blue-500 font-medium" : navLinkClasses}>
//             Library
//           </NavLink>
//           <NavLink to="/community" className={({ isActive }) => isActive ? "text-blue-500 font-medium" : navLinkClasses}>
//             Community
//           </NavLink>
//           <NavLink to="/3d-ai" className={({ isActive }) => isActive ? "text-blue-500 font-medium" : navLinkClasses}>
//             3D AI
//           </NavLink>
//         </div>

//         {/* Right Section (Search, Upgrade, Sign In) */}
//         <div className="flex items-center space-x-4">
//           <button className="text-white/60 hover:text-white">
//             <Search size={16} />
//           </button>
//           <a href="/subscribe" className="flex items-center text-white/60 hover:text-white">
//             <Zap size={14} className="text-blue-400 mr-1" />
//             Upgrade
//           </a>
//           <a href="/auth" className="flex items-center text-white/60 hover:text-white">
//             <User size={16} className="mr-1" />
//             Sign In
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Zap, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinkClasses = "text-white/60 hover:text-white transition-colors duration-200";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">Y</span>
            </div>
            <div className="flex flex-col leading-none select-none text-left">
              <span className="text-white text-sm font-bold">
                YVO3D <span className="text-xs italic text-white/70">beta</span>
              </span>
              <span className="text-[9px] font-normal text-zinc-600 italic text-opacity-80">
                by YVOVY
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "text-blue-500 font-medium" : navLinkClasses}
            >
              Home
            </NavLink>
            <NavLink 
              to="/editor" 
              className={({ isActive }) => isActive ? "text-blue-500 font-medium" : navLinkClasses}
            >
              Editor
            </NavLink>
            <NavLink 
              to="/library" 
              className={({ isActive }) => isActive ? "text-blue-500 font-medium" : navLinkClasses}
            >
              Library
            </NavLink>
            <NavLink 
              to="/community" 
              className={({ isActive }) => isActive ? "text-blue-500 font-medium" : navLinkClasses}
            >
              Community
            </NavLink>
            <NavLink 
              to="/3d-ai" 
              className={({ isActive }) => isActive ? "text-blue-500 font-medium" : navLinkClasses}
            >
              3D AI
            </NavLink>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="text-white/60 hover:text-white">
              <Search size={16} />
            </button>
            <a href="/subscribe" className="flex items-center text-white/60 hover:text-white">
              <Zap size={14} className="text-blue-400 mr-1" />
              Upgrade
            </a>
            <a href="/auth" className="flex items-center text-white/60 hover:text-white">
              <User size={16} className="mr-1" />
              Sign In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-white/60 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? "text-blue-500 bg-gray-800" : navLinkClasses
                  }`
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/editor"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? "text-blue-500 bg-gray-800" : navLinkClasses
                  }`
                }
                onClick={toggleMenu}
              >
                Editor
              </NavLink>
              <NavLink
                to="/library"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? "text-blue-500 bg-gray-800" : navLinkClasses
                  }`
                }
                onClick={toggleMenu}
              >
                Library
              </NavLink>
              <NavLink
                to="/community"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? "text-blue-500 bg-gray-800" : navLinkClasses
                  }`
                }
                onClick={toggleMenu}
              >
                Community
              </NavLink>
              <NavLink
                to="/3d-ai"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? "text-blue-500 bg-gray-800" : navLinkClasses
                  }`
                }
                onClick={toggleMenu}
              >
                3D AI
              </NavLink>
              <div className="px-3 py-2 space-y-2">
                <button className="flex w-full text-white/60 hover:text-white">
                  <Search size={16} className="mr-2" />
                  Search
                </button>
                <a 
                  href="/subscribe" 
                  className="flex w-full text-white/60 hover:text-white"
                  onClick={toggleMenu}
                >
                  <Zap size={14} className="text-blue-400 mr-2" />
                  Upgrade
                </a>
                <a 
                  href="/auth" 
                  className="flex w-full text-white/60 hover:text-white"
                  onClick={toggleMenu}
                >
                  <User size={16} className="mr-2" />
                  Sign In
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;