import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Eye, Download, Camera, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useGLTF } from '@react-three/drei';

const GalleryGrid = ({
  items,
  isLoading,
  generatingThumbnail,
  thumbnails,
  imageErrors,
  openModelViewer,
  generateThumbnail,
  handleImageError
}) => {
  // Track which items have had auto-generation attempted
  const [autoGenerationAttempted, setAutoGenerationAttempted] = useState({});

  // Check for items that need thumbnails and trigger generation
  items.forEach(item => {
    const needsThumbnail = !thumbnails[item.id];
    const notCurrentlyGenerating = generatingThumbnail !== item.id;
    const notAlreadyAttempted = !autoGenerationAttempted[item.id];
    
    // Auto-generate missing thumbnails when the component loads (one at a time)
    if (needsThumbnail && notCurrentlyGenerating && notAlreadyAttempted && !isLoading) {
      // Only attempt auto-generation if no other thumbnail is being generated
      if (generatingThumbnail === null) {
        // Mark this item as attempted to prevent infinite loops
        setAutoGenerationAttempted(prev => ({ ...prev, [item.id]: true }));
        
        // Slight delay to prevent multiple triggers
        setTimeout(() => {
          generateThumbnail(item);
        }, 500);
      }
    }
  });
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map(item => {
        // Determine thumbnail source: use generated thumbnail or placeholder
        const thumbnailSrc = thumbnails[item.id] || '/placeholder-model.jpg';
        const isGenerating = generatingThumbnail === item.id;
        const hasCustomThumbnail = Boolean(thumbnails[item.id]);
        
        return (
          <div 
            key={item.id} 
            className="relative group bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 transition-all hover:border-zinc-600"
          >
            <div 
              className="aspect-square overflow-hidden cursor-pointer relative" 
              onClick={() => openModelViewer(item)}
            >
              {isLoading || isGenerating ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-800">
                  <Loader className="w-8 h-8 text-blue-400 animate-spin mb-2" />
                  <span className="text-sm text-white/70">
                    {isGenerating ? 'Generating thumbnail...' : 'Loading...'}
                  </span>
                </div>
              ) : (
                <>
                  <img 
                    src={thumbnailSrc} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => handleImageError(item.id)}
                  />
                  
                  {!hasCustomThumbnail && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      No thumbnail
                    </div>
                  )}
                </>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                <div>
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.category}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-8 h-8 rounded-full bg-white/10 text-white" 
                    onClick={e => {
                      e.stopPropagation();
                      toast.info("Download feature not implemented");
                    }}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-8 h-8 rounded-full bg-white/10 text-white" 
                    onClick={e => {
                      e.stopPropagation();
                      openModelViewer(item);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between px-3 py-2 border-t border-zinc-800">
              <div className="flex items-center gap-1 text-gray-400">
                <span className="text-xs">25</span>
                <Eye className="w-3 h-3" />
              </div>
              
              <div className="flex items-center gap-1 text-gray-400">
                {!isGenerating && !hasCustomThumbnail && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-xs flex items-center gap-1 py-0 h-6" 
                    onClick={(e) => {
                      e.stopPropagation();
                      generateThumbnail(item);
                    }}
                  >
                    <Camera className="w-3 h-3" />
                    <span>Generate</span>
                  </Button>
                )}
                <span className="text-xs ml-2">4K</span>
                <ImageIcon className="w-3 h-3" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryGrid;