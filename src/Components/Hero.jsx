
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./UI/Button";
import ModelViewer2 from "../Components/ModelViewer";

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const animatedTexts = ["Immersive", "Realistic", "Detailed", "Dynamic"];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleWatchDemo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className="relative min-h-screen flex items-center bg-black justify-center overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black pointer-events-none"></div>
      <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KICA8cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgIDxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYwOCIgc3Ryb2tlLXdpZHRoPSIwLjUiPjwvcGF0aD4KICA8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3QgaWQ9InJlY3QiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiPjwvcmVjdD4KPC9zdmc+')] opacity-20 z-0 pointer-events-none"></div>

      {/* Particles */}
      <div className="absolute inset-0 z-5 opacity-40 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() > 0.5 ? "0.5rem" : "0.375rem",
              height: Math.random() > 0.5 ? "0.5rem" : "0.375rem",
              backgroundColor: `rgb(59 130 246 / ${0.3 + (i % 4) * 0.1})`,
            }}
            initial={{
              x: `${10 + i * 10}%`,
              y: `${10 + i * 8}%`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
            animate={{
              x: `${15 + i * 10}%`,
              y: `${15 + i * 8}%`,
            }}
            transition={{
              duration: 7 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        {/* Text Content */}
        <div className="flex flex-col justify-center items-center text-center lg:text-left lg:items-start w-full lg:w-[40vw] max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full flex flex-col items-center lg:items-start space-y-4"
          >
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600/20 to-blue-400/20 text-blue-200 text-xs tracking-wider font-medium backdrop-blur-md border border-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(19,130,246,0.25)] px-[13px] py-0">
                beta
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 text-center px-0 lg:text-left"
            >
              Create{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={animatedTexts[currentTextIndex]}
                    initial={{ opacity: 0, y: 10, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(12px)" }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
                    style={{ willChange: "opacity, filter, transform" }}
                  >
                    {animatedTexts[currentTextIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="invisible">{animatedTexts[0]}</span>
              </span>
              <br />
              <span className="bg-gradient-to-br from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                3D Models with AI
              </span>
            </motion.h1>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button
                size="lg"
                onClick={() => navigate("/workspace")}
                className="w-full sm:w-auto bg-gradient-to-r from-[#0071E3] to-[#0071E3] hover:from-[#1EAEDB] hover:to-[#1EAEDB] text-white border-0 hover:shadow-lg hover:shadow-[#1EAEDB]/20 transition-all duration-300 rounded-full px-6 text-sm py-3"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Creating Now
              </Button>

              <Button
                size="lg"
                variant="glass"
                onClick={handleWatchDemo}
                className="w-full sm:w-auto rounded-full px-6 group text-sm bg-black py-3"
              >
                <Play size={18} className="mr-2" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* ModelViewer2 Content */}
        <div className="w-full lg:w-[50vw] max-w-4xl flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full bg-black/50  border-white/10 rounded-lg overflow-hidden aspect-[4/3]"
          >
            <ModelViewer2 modelUrl="/Models/model2.glb" />
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseVideo}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-white/10">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="YVO3D Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <button
                  className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/70 p-2 h-10 w-10 flex items-center justify-center z-[60]"
                  onClick={handleCloseVideo}
                  aria-label="Close video"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
