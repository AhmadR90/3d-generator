// import React, { useState, useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Search, Zap, User, Menu, X } from "lucide-react";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const userData = useSelector((state) => state.user.userData);
//   const navLinkClasses =
//     "text-white/60 hover:text-white transition-colors duration-200";
//   const profileRef = useRef(null);
//   const mobileProfileRef = useRef(null);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     if (isProfileOpen) setIsProfileOpen(false); // Close profile dropdown if mobile menu is toggled
//   };

//   const toggleProfile = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   // Close profile dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         profileRef.current &&
//         !profileRef.current.contains(event.target) &&
//         mobileProfileRef.current &&
//         !mobileProfileRef.current.contains(event.target)
//       ) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Get the first letter of the email or default to 'U' if no user
//   const userInitial = userData?.data?.userName?.charAt(0).toUpperCase() || "U";

//   return (
//     <nav className="fixed w-full bg-black/95 shadow-sm z-[150]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
//               <span className="text-white text-xs">Y</span>
//             </div>
//             <div className="flex flex-col leading-none select-none text-left">
//               <span className="text-white text-sm font-bold">
//                 YVO3D <span className="text-xs italic text-white/70">beta</span>
//               </span>
//               <span className="text-[9px] font-normal text-zinc-600 italic text-opacity-80">
//                 by YVOVY
//               </span>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex md:items-center md:space-x-6">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 isActive ? "text-blue-500 font-medium" : navLinkClasses
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/editor"
//               className={({ isActive }) =>
//                 isActive ? "text-blue-500 font-medium" : navLinkClasses
//               }
//             >
//               Editor
//             </NavLink>
//             <NavLink
//               to="/library"
//               className={({ isActive }) =>
//                 isActive ? "text-blue-500 font-medium" : navLinkClasses
//               }
//             >
//               Library
//             </NavLink>
//             <NavLink
//               to="/community"
//               className={({ isActive }) =>
//                 isActive ? "text-blue-500 font-medium" : navLinkClasses
//               }
//             >
//               Community
//             </NavLink>
//             <NavLink
//               to="/3d-ai"
//               className={({ isActive }) =>
//                 isActive ? "text-blue-500 font-medium" : navLinkClasses
//               }
//             >
//               3D AI
//             </NavLink>
//           </div>

//           {/* Desktop Right Section */}
//           <div className="hidden md:flex md:items-center md:space-x-4">
//             <button className="text-white/60 hover:text-white">
//               <Search size={16} />
//             </button>
//             <a
//               href="/subscribe"
//               className="flex items-center text-white/60 hover:text-white"
//             >
//               <Zap size={14} className="text-blue-400 mr-1" />
//               Upgrade
//             </a>
//             {userData ? (
//               <div className="relative" ref={profileRef}>
//                 <button
//                   onClick={toggleProfile}
//                   className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium"
//                 >
//                   {userInitial}
//                 </button>
//                 {/* Dropdown Menu */}
//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-64  bg-black rounded-xl shadow-lg py-2">
//                     <a
//                       href="/profile"
//                       className="flex items-center bg-zinc-950 px-4 py-2 text-white hover:bg-gray-700"
//                     >
//                       <span className="mr-2">👤</span> Profile Settings
//                     </a>
//                     <a
//                       href="/subscription-credits"
//                       className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
//                     >
//                       <span className="mr-2">💳</span> Subscription & Credits
//                     </a>
//                     <a
//                       href="/model-history"
//                       className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
//                     >
//                       <span className="mr-2">📋</span> Model History
//                     </a>
//                     <a
//                       href="/help-support"
//                       className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
//                     >
//                       <span className="mr-2">❓</span> Help & Support
//                     </a>
//                     <a className="flex items-center px-4 py-2 text-red-400 hover:bg-gray-700">
//                       <span className="mr-2">🚪</span> Logout
//                     </a>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <a
//                 href="/auth"
//                 className="flex items-center text-white/60 hover:text-white"
//               >
//                 <User size={16} className="mr-1" />
//                 Sign In
//               </a>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMenu}
//               className="text-white/60 hover:text-white focus:outline-none"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden">
//             <div className="pt-2 pb-3 space-y-1">
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-base font-medium ${
//                     isActive ? "text-blue-500 bg-gray-800" : navLinkClasses
//                   }`
//                 }
//                 onClick={toggleMenu}
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/editor"
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-base font-medium ${
//                     isActive ? "text-blue-500 bg-gray-800" : navLinkClasses
//                   }`
//                 }
//                 onClick={toggleMenu}
//               >
//                 Editor
//               </NavLink>
//               <NavLink
//                 to="/library"
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-base font-medium ${
//                     isActive ? "text-blue-500 bg-gray-800" : navLinkClasses
//                   }`
//                 }
//                 onClick={toggleMenu}
//               >
//                 Library
//               </NavLink>
//               <NavLink
//                 to="/community"
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-base font-medium ${
//                     isActive ? "text-blue-500 bg-gray-800" : navLinkClasses
//                   }`
//                 }
//                 onClick={toggleMenu}
//               >
//                 Community
//               </NavLink>
//               <NavLink
//                 to="/3d-ai"
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-base font-medium ${
//                     isActive ? "text-blue-500 bg-gray-800" : navLinkClasses
//                   }`
//                 }
//                 onClick={toggleMenu}
//               >
//                 3D AI
//               </NavLink>
//               <div className="px-3 py-2 space-y-2">
//                 <button className="flex w-full text-white/60 hover:text-white">
//                   <Search size={16} className="mr-2" />
//                   Search
//                 </button>
//                 <a
//                   href="/subscribe"
//                   className="flex w-full text-white/60 hover:text-white"
//                   onClick={toggleMenu}
//                 >
//                   <Zap size={14} className="text-blue-400 mr-2" />
//                   Upgrade
//                 </a>
//                 {userData ? (
//                   <div className="relative" ref={mobileProfileRef}>
//                     <button
//                       onClick={toggleProfile}
//                       className="flex items-center w-full text-white/60 hover:text-white"
//                     >
//                       <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium mr-2">
//                         {userInitial}
//                       </div>
//                       Profile
//                     </button>
//                     {/* Mobile Dropdown Menu */}
//                     {isProfileOpen && (
//                       <div className="mt-2 w-64 bg-black  rounded-lg shadow-lg py-2">
//                         <a
//                           href="/profile"
//                           className="flex items-center px-4 py-2 text-white/60 hover:text-white hover:bg-gray-700"
//                         >
//                           <span className="mr-2">👤</span> Profile Settings
//                         </a>
//                         <a
//                           href="/subscription-credits"
//                           className="flex items-center px-4 py-2 text-white/60 hover:text-white hover:bg-gray-700"
//                         >
//                           <span className="mr-2">💳</span> Subscription &
//                           Credits
//                         </a>
//                         <a
//                           href="/model-history"
//                           className="flex items-center px-4 py-2 text-white/60 hover:text-white hover:bg-gray-700"
//                         >
//                           <span className="mr-2">📋</span> Model History
//                         </a>
//                         <a
//                           href="/help-support"
//                           className="flex items-center px-4 py-2 text-white/60 hover:text-white hover:bg-gray-700"
//                         >
//                           <span className="mr-2">❓</span> Help & Support
//                         </a>
//                         <a className="flex items-center bg-black px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700">
//                           <span className="mr-2">🚪</span> Logout
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <a
//                     href="/auth"
//                     className="flex w-full text-white/60 hover:text-white"
//                     onClick={toggleMenu}
//                   >
//                     <User size={16} className="mr-2" />
//                     Sign In
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Added useNavigate
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { Search, Zap, User, Menu, X } from "lucide-react";
import Axios from "../Axios/axiosInatance"; // Import Axios
// Assuming you have a Redux action to clear user data
import { logout } from "../Redux/Slice/UserSlice"; // Adjust the path to your userSlice

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate
  const navLinkClasses =
    "text-white/60 hover:text-white transition-colors duration-200";
  const profileRef = useRef(null);
  const mobileProfileRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Handle logout API call
  const handleLogout = async () => {
    try {
      await Axios.post("/user/logout"); // Call the logout API
      dispatch(logout()); // Dispatch Redux action to clear user data
      setIsProfileOpen(false); // Close profile dropdown
      setIsMenuOpen(false);
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
      // Close mobile menu
      navigate("/auth"); // Redirect to sign-in page
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, show an error message to the user
    }
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        mobileProfileRef.current &&
        !mobileProfileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get the first letter of the email or default to 'U' if no user
  const userInitial = userData?.data?.userName?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="fixed w-full bg-black/95 shadow-sm z-[150]">
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
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-medium" : navLinkClasses
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/editor"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-medium" : navLinkClasses
              }
            >
              Editor
            </NavLink>
            <NavLink
              to="/library"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-medium" : navLinkClasses
              }
            >
              Library
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-medium" : navLinkClasses
              }
            >
              Community
            </NavLink>
            <NavLink
              to="/3d-ai"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-medium" : navLinkClasses
              }
            >
              3D AI
            </NavLink>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="text-white/60 hover:text-white">
              <Search size={16} />
            </button>
            <a
              href="/subscribe"
              className="flex items-center text-white/60 hover:text-white"
            >
              <Zap size={14} className="text-blue-400 mr-1" />
              Upgrade
            </a>
            {userData ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium"
                >
                  {userInitial}
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-black rounded-xl shadow-lg py-2">
                    <a
                      href="/profile"
                      className="flex items-center bg-zinc-950 px-4 py-2 text-white hover:bg-gray-700"
                    >
                      <span className="mr-2">👤</span> Profile Settings
                    </a>
                    <a
                      href="/subscription-credits"
                      className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
                    >
                      <span className="mr-2">💳</span> Subscription & Credits
                    </a>
                    <a
                      href="/model-history"
                      className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
                    >
                      <span className="mr-2">📋</span> Model History
                    </a>
                    <a
                      href="/help-support"
                      className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
                    >
                      <span className="mr-2">❓</span> Help & Support
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 text-left"
                    >
                      <span className="mr-2">🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/auth"
                className="flex items-center text-white/60 hover:text-white"
              >
                <User size={16} className="mr-1" />
                Sign In
              </a>
            )}
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
                {userData ? (
                  <div className="relative" ref={mobileProfileRef}>
                    <button
                      onClick={toggleProfile}
                      className="flex items-center w-full text-white/60 hover:text-white"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium mr-2">
                        {userInitial}
                      </div>
                      Profile
                    </button>
                    {isProfileOpen && (
                      <div className="mt-2 w-64 bg-black rounded-lg shadow-lg py-2">
                        <a
                          href="/profile"
                          className="flex items-center px-4 py-2 text-white/60 hover:text-white hover:bg-gray-700"
                        >
                          <span className="mr-2">👤</span> Profile Settings
                        </a>
                        <a
                          href="/subscription-credits"
                          className="flex items-center px-4 py-2 text-white/60 hover:text-white hover:bg-gray-700"
                        >
                          <span className="mr-2">💳</span> Subscription &
                          Credits
                        </a>
                        <a
                          href="/model-history"
                          className="flex items-center px-4 py-2 text-white/60 hover:text-white hover:bg-gray-700"
                        >
                          <span className="mr-2">📋</span> Model History
                        </a>
                        <a
                          href="/help-support"
                          className="flex items-center px-4 py-2 text-white/60 hover:text-white hover:bg-gray-700"
                        >
                          <span className="mr-2">❓</span> Help & Support
                        </a>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 text-left"
                        >
                          <span className="mr-2">🚪</span> Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href="/auth"
                    className="flex w-full text-white/60 hover:text-white"
                    onClick={toggleMenu}
                  >
                    <User size={16} className="mr-2" />
                    Sign In
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
