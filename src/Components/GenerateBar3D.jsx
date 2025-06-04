import { useState, useRef, useEffect } from 'react';
import { Button } from '../Components/UI/Button';
import { Input } from '../Components/UI/Input';
import { 
  Sparkles, 
  Upload, 
  X, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  Trash2,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const GenerateBar3D = ({
  prompt,
  setPrompt,
  resolutionOptions,
  resolutionIndex,
  setResolutionIndex,
  uploadedImage,
  setUploadedImage,
  isGenerating,
  onGenerate,
  setIsGenerating,
  onClearCompleted
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // Placeholder for API key check (since getEnvVar is unavailable)
  const [hasApiKey, setHasApiKey] = useState(true); // Assume true or adjust based on your needs
  
  useEffect(() => {
    // Optionally show settings if no API key (customize as needed)
    if (!hasApiKey) {
      setShowSettings(true);
    }
  }, [hasApiKey]);
  
  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  
  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      
      // Clear prompt when image is uploaded
      setPrompt('');
    }
  };
  
  // Handle removing the image
  const handleRemoveImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setUploadedImage(null);
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  // Cycle through resolutions
  const cycleResolution = () => {
    setResolutionIndex((resolutionIndex + 1) % resolutionOptions.length);
  };
  
  // Handle prompt change
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    
    // If we have an image and start typing prompt, remove image
    if (e.target.value && uploadedImage) {
      handleRemoveImage();
    }
  };

  // Call onGenerate to use the original generation logic
  const handleGenerate = () => {
    if (!hasApiKey) {
      setShowSettings(true);
      return;
    }
    
    onGenerate(); // Use the original handleGenerate from parent
  };

  return (
    <div className="flex flex-col space-y-5 ">
      {showSettings && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4"
        >
          {/* Placeholder for RunPodSettings */}
          <div className="p-4 bg-black/20 border border-white/10 rounded-lg text-white">
            Please configure your API key to proceed.
          </div>
        </motion.div>
      )}
      
      {/* Generation form with Apple-inspired design */}
      <div className="space-y-4">
        {/* Prompt input group */}
        <div className="relative">
          <label className="text-sm text-white font-medium mb-1.5 block">
            Describe your 3D model
          </label>
          <label className="text-sm text-white font-medium my-2 block">
            Minimum Credits required : <span className='text-blue-600'>30</span>
          </label>
          <div className="relative">
            <Input 
              placeholder={uploadedImage ? "Using uploaded image..." : "Enter a detailed description of your 3D model..."}
              value={prompt}
              onChange={handlePromptChange}
              className="bg-black/20 text-white border-white/10 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/40 placeholder:text-white/30 h-12 pl-4 pr-12"
              disabled={isGenerating && !!uploadedImage}
            />
            
            {/* Image upload button inside input */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <input
                ref={fileInputRef}
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={!!prompt}
              />
              
              {!uploadedImage ? (
                <label 
                  htmlFor="image-upload"
                  className={`flex items-center justify-center h-8 w-8 rounded-full cursor-pointer ${
                    prompt ? 'bg-white/5 text-white/30 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <ImageIcon size={16} />
                </label>
              ) : (
                <button
                  onClick={handleRemoveImage}
                  className="h-8 w-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
          
          {/* Image preview */}
          {uploadedImage && previewUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 relative"
            >
              <div className="relative rounded-lg overflow-hidden border border-white/10 w-full max-h-40">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-auto object-contain max-h-40" 
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-black/80"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Settings and resolution row */}
        <div className="flex flex-wrap gap-3">
          {/* Resolution selector */}
          <Button
            onClick={cycleResolution}
            variant="outline"
            className="flex-1 bg-black/20 border-white/10 hover:bg-black/40 text-white justify-between"
          >
            <span>Resolution: {resolutionOptions[resolutionIndex].label}</span>
            <span className="flex items-center ml-2 text-xs bg-blue-600/80 px-2 py-0.5 rounded-md">
              <Zap size={10} className="mr-1" />
              {resolutionOptions[resolutionIndex].credits}
            </span>
          </Button>
          
          {/* Settings button */}
          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="outline" 
            size="icon"
            className="h-10 w-10 rounded-full bg-black/20 border-white/10 hover:bg-black/40"
          >
            <SettingsIcon size={16} />
          </Button>
          
          {/* Clear completed button - Only show if onClearCompleted is provided */}
          {onClearCompleted && (
            <Button 
              onClick={onClearCompleted}
              variant="outline" 
              size="icon"
              className="h-10 w-10 rounded-full bg-black/20 border-white/10 hover:bg-black/40"
              title="Clear completed models from queue"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
        
        {/* Generate button */}
        <Button 
          onClick={handleGenerate}
          disabled={(!prompt && !uploadedImage)}
          className={`w-full h-12 rounded-lg ${
            isGenerating
              ? 'bg-amber-600 hover:bg-amber-700'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-medium`}
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
              Add to Queue
            </>
          ) : (
            <>
              <Sparkles size={16} className="mr-2" />
              Generate 3D Model
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GenerateBar3D;