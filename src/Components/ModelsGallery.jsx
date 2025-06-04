import React, { useState, useEffect } from "react";
import ModelViewer2 from "./ModelViewer";

const Gallery3D = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Geometric Structure",
      category: "Environmental",
      thumbnail:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/modelthumbnails/96f71072-982c-4204-91fa-23a4a3593d18.png",
      modelUrl:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/models/152ee5eb-5823-49ac-8cbc-e2e231da851e.glb",
    },
    {
      id: 2,
      title: "Batman 3d model",
      category: "Architecture",
      thumbnail:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/modelthumbnails/71f76b07-37c0-4eeb-ac43-303b0eaa663d.png",
      modelUrl:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/models/d5abb449-12e1-4640-978a-27068de274ae.glb",
    },
    {
      id: 3,
      title: "create a model for cricket player",
      category: "Character",
      thumbnail:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/modelthumbnails/f8b46850-8cd7-4ac2-a8b6-79192461a776.png",
      modelUrl:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/models/5081aaa3-ea93-4e14-b944-974b665ac2ec.glb",
    },
    {
      id: 4,
      title: "make a model of cricket player",
      category: "Environment",
      thumbnail:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/modelthumbnails/741f898a-5074-478e-8c8a-6bb0389b229b.png",
      modelUrl:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/models/7ea3b2b1-bfe6-4241-8da4-d8439f094ccd.glb",
    },
    {
      id: 5,
      title: "Robotic Companion",
      category: "Props",
      thumbnail:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/modelthumbnails/bd02ec2f-8e56-406c-a9f0-7c4a093ff3ff.png",
      modelUrl:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/models/71b3633b-0318-42d4-9fc4-065a9eea485d.glb",
    },
    {
      id: 6,
      title: "Urban Landscape",
      category: "Character",
      thumbnail:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/modelthumbnails/662027d5-77cf-47f8-8bb5-5d75e15922e3.png",
      modelUrl:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/models/7374cde8-938e-498a-a742-1703cfdf340b.glb",
    },
    {
      id: 7,
      title: "Cybernetic Arm",
      category: "Environment",
      thumbnail:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/modelthumbnails/43e71065-bd44-4450-be97-a9ca6600b848.png",
      modelUrl:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/models/ac3c1c76-6b09-48aa-b22b-ebac8cc9eccd.glb",
    },
    {
      id: 8,
      title: "Modern Cityscape",
      category: "Environment",
      thumbnail:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/modelthumbnails/56845606-c3b9-4978-9915-00a7797acaf5.png",
      modelUrl:
        "https://bvezzqrszbdifhtifrbq.supabase.co/storage/v1/object/public/project/models/4049f9b9-779d-4b96-bedb-f70a023009af.glb",
    },
  ];

  const categories = [
    "All",
    "Character",
    "Environment",
    "Props",
    "Architecture",
  ];

  const filteredItems =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
    </div>
  );

  const GalleryCard = ({ item }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
      <div
        className="bg-black rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gray-800 border border-gray-800"
        onClick={() => setSelectedItem(item)}
      >
        <div className="aspect-video bg-black flex items-center justify-center relative">
          {!imageLoaded && <LoadingSpinner />}
          <img
            src={item.thumbnail}
            alt={item.title}
            className={`w-full h-contain object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
          <p className="text-gray-400 text-sm">{item.category}</p>
        </div>
      </div>
    );
  };

  const Modal = ({ item, onClose }) => {
    const [modelLoading, setModelLoading] = useState(true);
    const [modelError, setModelError] = useState(null);

    // Check if model URL is accessible
    useEffect(() => {
      const checkModel = async () => {
        try {
          const response = await fetch(item.modelUrl, { method: 'HEAD' });
          if (!response.ok) {
            throw new Error('Model URL not accessible');
          }
          setModelLoading(false);
        } catch (error) {
          setModelError('Failed to load 3D model: ' + error.message);
          setModelLoading(false);
        }
      };
      checkModel();
    }, [item.modelUrl]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-90 p-4">
        <div className="bg-black border-2 rounded-lg max-w-4xl w-full  max-h-[90vh] mt-24 overflow-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <div>
              <h2 className="text-2xl font-bold text-white">{item.title}</h2>
              <p className="text-gray-400">{item.category}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="p-6">
            <div className="bg-black rounded-lg h-96 flex items-center justify-center relative">
              {(modelLoading || modelError) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black rounded-lg">
                  {modelError ? (
                    <div className="text-center">
                      <p className="text-red-400 mb-2">{modelError}</p>
                      <button
                        onClick={() => {
                          setModelError(null);
                          setModelLoading(true);
                          // Retry loading
                          const event = new Event('retry');
                          window.dispatchEvent(event);
                        }}
                        className="text-blue-500 hover:text-blue-400 underline"
                      >
                        Retry
                      </button>
                    </div>
                  ) : (
                    <LoadingSpinner />
                  )}
                </div>
              )}
              <div
                className={`w-full h-full ${modelLoading || modelError ? 'opacity-0' : 'opacity-100'} h-full transition-opacity duration-300`}
              >
                <ModelViewer2
                  modelUrl={item.modelUrl}
                  onLoad={() => setModelLoading(false)}
                  onError={(error) => {
                    setModelLoading(false);
                    setModelError('Failed to load 3D model: ' + error.message);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-black border text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No items found for "{activeFilter}"
            </p>
          </div>
        )}
      </div>
      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default Gallery3D;