

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Components/UI/Button";
import { Input } from "../Components/UI/Input";
import CustomAIGenerateBar from "../Components/CustomAIGeneratorBar";
import Axios from "../Axios/axiosInatance";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// Particle animation for celebratory effect
const Particle = ({ index }) => {
  const randomAngle = Math.random() * 2 * Math.PI;
  const distance = 50 + Math.random() * 100;
  return (
    <motion.div
      className="absolute w-2 h-2 bg-indigo-400 rounded-full"
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: Math.cos(randomAngle) * distance,
        y: Math.sin(randomAngle) * distance,
        opacity: 0,
      }}
      transition={{ duration: 1, delay: index * 0.05 }}
    />
  );
};

const CustomAIContainer = () => {
  // Local state management
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [resolutionIndex, setResolutionIndex] = useState(0);
  const [resolutionOptions] = useState([
    { value: "1K", label: "1K", credits: 1 },
    { value: "2K", label: "2K", credits: 2 },
    { value: "4K", label: "4K", credits: 4 },
    { value: "FAST-4K", label: "4K(Fast)", credits: "4 (Fast)" },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(null);

  // Mock user for authentication (replace with your auth logic)
  const [user] = useState({ id: "mock-user" });

  // Helper function to convert image File to base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Handle generating a model
  const handleGenerate = async () => {
    if (!prompt && !image) {
      toast.error("Please enter a valid prompt or upload an image");
      return;
    }
    setIsGenerating(true);
    setShowError(null);
    try {
      // Prepare payload
      let imageData = null;
      if (image instanceof File) {
        imageData = await convertImageToBase64(image);
      }
      const payload = {
        prompt,
        image: imageData,
        resolution: resolutionOptions[resolutionIndex].value,
      };

      // Call API
      const response = await Axios.post("/model/generate", payload, {
        headers: { "Content-Type": "application/json" },
      });

      // Handle success
      setIsGenerating(false);
      setShowSuccess(true);
      toast.success("Model added to generation queue", {
        description: "You can continue adding more models to the queue",
      });
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error generating model:", error);
      setIsGenerating(false);
      setShowError(error.response?.data?.message || error.message);
      toast.error("Failed to generate model: " + (error.response?.data?.message || error.message));
      // Hide error message after 5 seconds
      setTimeout(() => {
        setShowError(null);
      }, 5000);
    }
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 pt-9"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-1 flex-col pt-5">
        {/* Header section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 py-8 sm:pt-8 sm:p-16">
          <header className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
            3D Model Generator
          </header>
          {/* Success message with particle animation */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="relative mt-6 bg-indigo-900/20 text-indigo-300 p-4 sm:p-6 rounded-xl border border-indigo-400/20 max-w-3xl sm:max-w-4xl mx-auto shadow-lg"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <Particle key={i} index={i} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-indigo-400 text-xl sm:text-2xl" />
                  <p className="text-sm sm:text-base font-medium">
                    Model generated successfully!
                  </p>
                </div>
              </motion.div>
            )}
            {showError && (
              <motion.div
                className="relative mt-6 bg-red-900/20 text-red-300 p-4 sm:p-6 rounded-xl border border-red-400/20 max-w-3xl sm:max-w-4xl mx-auto shadow-lg"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <FaExclamationCircle className="text-red-400 text-xl sm:text-2xl" />
                  <div>
                    <p className="text-sm sm:text-base font-medium">
                      Failed to generate model
                    </p>
                    <p className="text-xs sm:text-sm text-red-400/80">
                      {showError}
                    </p>
                    <Button
                      className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm px-4 py-1 rounded-md"
                      onClick={handleGenerate}
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Loading animation during generation */}
          {isGenerating && (
            <motion.div
              className="mt-6 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
              <p className="ml-4 text-indigo-300 text-sm sm:text-base">
                Generating your model...
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating bottom generation bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="max-w-4xl sm:max-w-5xl mx-auto px-4 sm:px-4 sm:p-4 pb-4"
        >
          <div className="bg-zinc-800/90 sm:bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl">
            <CustomAIGenerateBar
              prompt={prompt}
              setPrompt={setPrompt}
              uploadedImage={image}
              setImage={setImage}
              resolutionIndex={resolutionIndex}
              setResolutionIndex={setResolutionIndex}
              resolutionOptions={resolutionOptions}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              setIsGenerating={setIsGenerating}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CustomAIContainer;
