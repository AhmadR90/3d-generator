// import React, { useState, useEffect, useRef } from 'react';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';
// import Axios from '../Axios/axiosInatance';
// import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// const ProfileSettings = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [profilePicture, setProfilePicture] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const fileInputRef = useRef(null);

//   // Fetch user data on component mount
//   useEffect(() => {
//     const fetchUserData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await Axios.get('/user/me');
//         console.log(response.data)
//         const { userName, email, profilePicture } = response.data.data;
//         setUsername(userName || 'User');
//         setEmail(email || '');
//         setProfilePicture(profilePicture || username?.charAt(0).toLowerCase() || 'u');
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setError(error.response?.data?.message || error.message);
//         if (error.response?.status === 401) {
//           toast.error('Unauthorized: Please log in again.');
//           // Optionally redirect to login page
//           // window.location.href = '/login';
//         } else {
//           toast.error('Failed to load profile: ' + (error.response?.data?.message || error.message));
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleChangePicture = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setProfilePicture(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemovePicture = () => {
//     setProfilePicture(username.charAt(0).toLowerCase());
//   };

//   const handleSaveChanges = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const payload = {
//         username,
//         profilePicture: profilePicture.length > 1 ? profilePicture : null, // Send null if using initial
//       };
//       await Axios.patch('/user/me', payload, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       toast.success('Profile updated successfully!', {
//         description: 'Your changes have been saved.',
//       });
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       setError(error.response?.data?.message || error.message);
//       if (error.response?.status === 401) {
//         toast.error('Unauthorized: Please log in again.');
//         // Optionally redirect to login page
//         // window.location.href = '/login';
//       } else {
//         toast.error('Failed to save profile: ' + (error.response?.data?.message || error.message));
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-white pt-20"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg">Profile Settings</h1>
//         <p className="text-gray-400 text-sm sm:text-base mb-6">Manage your profile information and account settings</p>

//         {/* Loading State */}
//         <AnimatePresence>
//           {isLoading && (
//             <motion.div
//               className="flex justify-center items-center mb-6"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="flex space-x-2">
//                 <motion.div
//                   className="w-3 h-3 bg-indigo-400 rounded-full"
//                   animate={{ y: [0, -10, 0] }}
//                   transition={{ repeat: Infinity, duration: 0.5 }}
//                 />
//                 <motion.div
//                   className="w-3 h-3 bg-indigo-400 rounded-full"
//                   animate={{ y: [0, -10, 0] }}
//                   transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
//                 />
//                 <motion.div
//                   className="w-3 h-3 bg-indigo-400 rounded-full"
//                   animate={{ y: [0, -10, 0] }}
//                   transition={{ repeat: Infinity, duration: 0.5, delay: 0.4 }}
//                 />
//               </div>
//               <p className="ml-4 text-indigo-300 text-sm sm:text-base">Loading...</p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Error Message */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               className="mb-6 bg-red-900/20 text-red-300 p-4 sm:p-6 rounded-xl border border-red-400/20 max-w-3xl sm:max-w-4xl mx-auto shadow-lg"
//               initial={{ opacity: 0, y: 20, scale: 0.9 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="flex items-center gap-3">
//                 <FaExclamationCircle className="text-red-400 text-xl sm:text-2xl" />
//                 <div>
//                   <p className="text-sm sm:text-base font-medium">Failed to load or save profile</p>
//                   <p className="text-xs sm:text-sm text-red-400/80">{error}</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Profile Information Section */}
//         {!isLoading && (
//           <motion.div
//             className="bg-gray-900/90 backdrop-blur-xl rounded-lg p-6 shadow-lg"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-lg sm:text-xl font-medium mb-6">Profile Information</h2>

//             {/* Profile Picture */}
//             <div className="flex items-center mb-6">
//               <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-medium mr-4 overflow-hidden">
//                 {profilePicture.length === 1 ? (
//                   <span className="text-white">{profilePicture}</span>
//                 ) : (
//                   <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
//                 )}
//               </div>
//               <div>
//                 <button
//                   className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm mr-2 hover:bg-indigo-700 transition"
//                   onClick={handleChangePicture}
//                   disabled={isLoading}
//                 >
//                   <span className="mr-2">📷</span> Change Picture
//                 </button>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//                 <button
//                   className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition"
//                   onClick={handleRemovePicture}
//                   disabled={isLoading}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>

//             {/* Username */}
//             <div className="mb-4">
//               <label className="block text-gray-400 text-sm mb-2">Username</label>
//               <div className="flex items-center bg-gray-800 rounded-lg p-2">
//                 <span className="text-gray-400 mr-2">👤</span>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="bg-transparent w-full text-white outline-none"
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>

//             {/* Email Address */}
//             <div className="mb-6">
//               <label className="block text-gray-400 text-sm mb-2">Email Address</label>
//               <div className="flex items-center bg-gray-800 rounded-lg p-2">
//                 <span className="text-gray-400 mr-2">📧</span>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="bg-transparent w-full text-white outline-none"
//                   disabled
//                 />
//               </div>
//               <p className="text-gray-500 text-xs mt-1">Email cannot be changed</p>
//             </div>

//             {/* Save Changes Button */}
//             <button
//               className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-400"
//               onClick={handleSaveChanges}
//               disabled={isLoading}
//             >
//               <span className="mr-2">💾</span> Save Changes
//             </button>
//           </motion.div>
//         )}

//         {/* Security Section (Placeholder) */}
//         {activeTab === 'security' && !isLoading && (
//           <motion.div
//             className="bg-gray-900/90 backdrop-blur-xl rounded-lg p-6 shadow-lg text-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <p className="text-gray-400">Security settings will be implemented here.</p>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default ProfileSettings;


import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Axios from '../Axios/axiosInatance';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// Helper function to convert base64 to File object
const base64ToFile = (base64, filename) => {
  const [header, data] = base64.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new File([array], filename, { type: mime });
};

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await Axios.get('/user/me');
        const { userName, email, profilePicture } = response.data.data;
        setFullName(userName || 'User');
        setEmail(email || '');
        setProfilePicture(profilePicture || userName?.charAt(0).toLowerCase() || 'u');
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.response?.data?.message || error.message);
        if (error.response?.status === 401) {
          toast.error('Unauthorized: Please log in again.');
          // Optionally redirect to login page
          // window.location.href = '/login';
        } else {
          toast.error('Failed to load profile: ' + (error.response?.data?.message || error.message));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChangePicture = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    setProfilePicture(fullName.charAt(0).toLowerCase());
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      if (profilePicture.length > 1) {
        // Convert base64 to File if profilePicture is an image
        const file = base64ToFile(profilePicture, 'profile-picture.jpg');
        formData.append('profilePicture', file);
      } else {
        formData.append('profilePicture', null);
      }

      await Axios.patch('/user/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Profile updated successfully!', {
        description: 'Your changes have been saved.',
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      setError(error.response?.data?.message || error.message);
      if (error.response?.status === 401) {
        toast.error('Unauthorized: Please log in again.');
        // Optionally redirect to login page
        // window.location.href = '/login';
      } else {
        toast.error('Failed to save profile: ' + (error.response?.data?.message || error.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-white pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg">Profile Settings</h1>
        <p className="text-gray-400 text-sm sm:text-base mb-6">Manage your profile information and account settings</p>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="flex justify-center items-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex space-x-2">
                <motion.div
                  className="w-3 h-3 bg-indigo-400 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                />
                <motion.div
                  className="w-3 h-3 bg-indigo-400 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                />
                <motion.div
                  className="w-3 h-3 bg-indigo-400 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: 0.4 }}
                />
              </div>
              <p className="ml-4 text-indigo-300 text-sm sm:text-base">Loading...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className=".library-error mb-6 bg-red-900/20 text-red-300 p-4 sm:p-6 rounded-xl border border-red-400/20 max-w-3xl sm:max-w-4xl mx-auto shadow-lg"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <FaExclamationCircle className="text-red-400 text-xl sm:text-2xl" />
                <div>
                  <p className="text-sm sm:text-base font-medium">Failed to load or save profile</p>
                  <p className="text-xs sm:text-sm text-red-400/80">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Information Section */}
        {!isLoading && (
          <motion.div
            className="bg-gray-900/90 backdrop-blur-xl rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg sm:text-xl font-medium mb-6">Profile Information</h2>

            {/* Profile Picture */}
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-medium mr-4 overflow-hidden">
                {profilePicture.length === 1 ? (
                  <span className="text-white">{profilePicture}</span>
                ) : (
                  <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm mr-2 hover:bg-indigo-700 transition"
                  onClick={handleChangePicture}
                  disabled={isLoading}
                >
                  <span className="mr-2">📷</span> Change Picture
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition"
                  onClick={handleRemovePicture}
                  disabled={isLoading}
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Full Name</label>
              <div className="flex items-center bg-gray-800 rounded-lg p-2">
                <span className="text-gray-400 mr-2">👤</span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-transparent w-full text-white outline-none"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">Email Address</label>
              <div className="flex items-center bg-gray-800 rounded-lg p-2">
                <span className="text-gray-400 mr-2">📧</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent w-full text-white outline-none"
                  disabled
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">Email cannot be changed</p>
            </div>

            {/* Save Changes Button */}
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-400"
              onClick={handleSaveChanges}
              disabled={isLoading}
            >
              <span className="mr-2">💾</span> Save Changes
            </button>
          </motion.div>
        )}

        {/* Security Section (Placeholder) */}
        {activeTab === 'security' && !isLoading && (
          <motion.div
            className="bg-gray-900/90 backdrop-blur-xl rounded-lg p-6 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400">Security settings will be implemented here.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileSettings;