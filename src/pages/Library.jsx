

import React, { useState, useEffect, useCallback } from "react";
import Axios from "../Axios/axiosInatance";
import { Download, Trash2, Image, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";
import CustomAIContainer from "../pages/3DAiContainer";
import ModelViewer2 from "../Components/ModelViewer";

// Loader Component
const Loader = ({ text }) => (
  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
    <div className="flex flex-col items-center bg-zinc-950 p-6 rounded-lg border border-white/10">
      <RefreshCw size={32} className="text-blue-400 animate-spin mb-4" />
      <p className="text-blue-400 text-lg">{text}</p>
    </div>
  </div>
);

// CustomButton Component
const CustomButton = ({ onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-2 rounded-lg text-white transition ${
      disabled
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
  >
    {children}
  </button>
);

// ModelViewerModal Component (Unchanged)
const ModelViewerModal = ({ isOpen, onClose, model, downloadModel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex mt-12 items-center justify-center p-4">
      <div className="relative bg-zinc-950 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/10">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-400">
            {model.job?.prompt || "Unnamed Model"}
          </h2>
          <button
            className="p-2 text-gray-400 hover:text-white transition"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          <div className="relative aspect-[16/9] bg-black rounded-lg flex items-center justify-center overflow-hidden">

          <ModelViewer2 modelUrl={model.modelUrl}/>
          
            <p className="absolute bottom-2 left-2 text-xs text-gray-400 bg-black/50 px-2 py-1 rounded">
              Placeholder: 3D Model Viewer
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-400">
              Created: {new Date(model.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              Resolution: {model.resolution || "2K"}
            </p>
          </div>
          <div className="mt-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
              onClick={() => downloadModel(model)}
            >
              <Download size={16} />
              Download Model
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ModelCard Component (Unchanged)
const ModelCard = ({
  model,
  openModelViewer,
  downloadModel,
  deleteModel,
  generateThumbnail,
  isGeneratingThumbnail,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formattedDate = model.createdAt
    ? new Date(model.createdAt).toLocaleDateString()
    : "Unknown date";

  return (
    <div
      className="relative overflow-hidden rounded-lg transition-all duration-200 cursor-pointer border border-white/10 hover:border-blue-500/50 w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-square bg-black flex items-center justify-center">
        {model.thumbnailUrl && !imageError ? (
          <img
            src={model.thumbnailUrl}
            alt={model.job?.prompt || "Model"}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-zinc-700/50 flex items-center justify-center">
            <span className="text-lg font-bold text-white/30">3D</span>
          </div>
        )}
        {isGeneratingThumbnail && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
            <RefreshCw size={20} className="animate-spin mb-2" />
            <p className="text-xs">Generating thumbnail...</p>
          </div>
        )}
        <div
          className={`absolute top-2 right-2 flex gap-1 sm:gap-2 bg-black/50 rounded p-1 transition-opacity duration-200 ${
            isHovering || window.innerWidth < 768 ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className="p-1 sm:p-2 bg-transparent text-white hover:bg-blue-600 rounded"
            onClick={(e) => {
              e.stopPropagation();
              downloadModel(model);
            }}
          >
            <Download size={14} />
          </button>
          <button
            className="p-1 sm:p-2 bg-transparent text-white hover:bg-blue-600 rounded"
            onClick={(e) => {
              e.stopPropagation();
              openModelViewer(model);
            }}
            disabled={isGeneratingThumbnail}
          >
            <Image size={14} />
          </button>
          <button
            className="p-1 sm:p-2 bg-transparent text-white hover:bg-blue-600 rounded"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Are you sure you want to delete this model?")) {
                deleteModel(model.id);
              }
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div className="p-2 bg-zinc-800/50">
        <h3
          className="font-medium text-white text-xs truncate"
          title={model.job?.prompt || "Unnamed Model"}
        >
          {model.job?.prompt
            ? model.job.prompt.length > 15
              ? `${model.job.prompt.substring(0, 15)}...`
              : model.job.prompt
            : "Unnamed Model"}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-zinc-400">{formattedDate}</span>
          <span className="text-xs text-zinc-400">
            {model.resolution || "2K"}
          </span>
        </div>
      </div>
    </div>
  );
};

// Models Component (Modified for Loader)
const Models = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingThumbnailId, setGeneratingThumbnailId] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchModels = useCallback(async (pageNum) => {
    try {
      setLoading(true);
      const response = await Axios.get(
        `/model/my-models?page=${pageNum}&limit=12`
      );
      const modelsData = Array.isArray(response.data?.data?.models)
        ? response.data.data.models
        : [];
      console.log("Fetched Models:", modelsData);
      setModels((prev) =>
        pageNum === 1 ? modelsData : [...prev, ...modelsData]
      );
      setHasMore(modelsData.length === 12);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching models:", err);
      setError(err.message);
      toast.error(
        "Failed to fetch models: " +
          (err.response?.data?.message || err.message)
      );
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModels(page);
  }, [page, fetchModels]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 800 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const openModelViewer = async (model) => {
    setSelectedModel(model);
  };

  const closeModelViewer = () => {
    setSelectedModel(null);
  };

  const downloadModel = async (model) => {
    window.open(model.modelUrl, "_blank");
  };

  const deleteModel = async (id) => {
    try {
      await Axios.delete(`/model/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setModels(models.filter((model) => model.id !== id));
      setSelectedModel(null);
      toast.success("Model deleted successfully");
      return true;
    } catch (err) {
      console.error("Error deleting model:", err);
      toast.error(
        "Failed to delete model: " +
          (err.response?.data?.message || err.message)
      );
      return false;
    }
  };

  const generateThumbnail = async (model) => {
    setGeneratingThumbnailId(model.id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setGeneratingThumbnailId(null);
      return "https://example.com/thumbnail.png";
    } catch (err) {
      console.error("Error generating thumbnail:", err);
      setGeneratingThumbnailId(null);
      return null;
    }
  };

  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">
          Models
        </h2>
        <p className="text-red-400 text-sm sm:text-base">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {loading && <Loader text="Loading Models..." />}
      <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4 pt-16">
        Models
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {models.length > 0 ? (
          models.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              openModelViewer={openModelViewer}
              downloadModel={downloadModel}
              deleteModel={deleteModel}
              generateThumbnail={generateThumbnail}
              isGeneratingThumbnail={generatingThumbnailId === model.id}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm sm:text-base">No models found.</p>
        )}
      </div>
      <ModelViewerModal
        isOpen={!!selectedModel}
        onClose={closeModelViewer}
        model={selectedModel}
        downloadModel={downloadModel}
      />
    </div>
  );
};

// JobCard Component (Modified for Status Column)
const JobCard = ({ job }) => {
  const formattedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString()
    : "Unknown date";

  return (
    <tr className="border-b border-white/10 hover:bg-zinc-800/50 transition">
      <td
        className="p-3 text-sm text-white truncate"
        title={job.prompt || "Unnamed Job"}
      >
        {job.prompt
          ? job.prompt.length > 50
            ? `${job.prompt.substring(0, 50)}...`
            : job.prompt
          : "Unnamed Job"}
      </td>
      <td className="p-3 text-sm text-zinc-400">{formattedDate}</td>
      <td className="p-3 text-sm text-zinc-400">{job.resolution || "2K"}</td>
      <td className="p-3 text-sm text-zinc-400">{job.credits || "N/A"}</td>
      <td className="p-3 text-sm text-zinc-400">{job.progress || 0}%</td>
      <td className="p-3 text-sm text-zinc-400">{job.status || "Unknown"}</td>
      <td className="p-3 text-sm">
        {job.model ? (
          <a
            href={job.model.modelUrl}
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Model
          </a>
        ) : (
          <span className="text-zinc-400">N/A</span>
        )}
      </td>
      <td className="p-3 text-sm">
        {job.model?.thumbnailUrl ? (
          <a
            href={job.model.thumbnailUrl}
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thumbnail
          </a>
        ) : (
          <span className="text-zinc-400">N/A</span>
        )}
      </td>
    </tr>
  );
};

// Jobs Component (Modified for Status, Load More Button, and Loader)
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(async (pageNum, isPolling = false) => {
    try {
      setLoading(!isPolling);
      const response = await Axios.get(
        `/model/my-jobs?page=${pageNum}&limit=10`
      );
      const jobsData = Array.isArray(response.data?.data?.jobs)
        ? response.data.data.jobs
        : [];
      // console.log("Fetched Jobs:", response.data);
      setJobs((prev) => (pageNum === 1 ? jobsData : [...prev, ...jobsData]));
      setHasMore(jobsData.length === 10); // Adjusted for limit=10
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.message);
      toast.error(
        "Failed to fetch jobs: " + (err.response?.data?.message || err.message)
      );
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs(page);
  }, [page, fetchJobs]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchJobs(1, true);
    }, 20000);
    return () => clearInterval(interval);
  }, [fetchJobs]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4 pt-16">
          Jobs
        </h2>
        <p className="text-red-400 text-sm sm:text-base">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {loading && <Loader text="Loading Jobs..." />}
      <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4 pt-16">
        Jobs
      </h2>
      <div className="bg-zinc-950 rounded-lg border border-white/10 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-900/50">
              <th className="p-3 text-sm font-semibold text-blue-400">
                Prompt
              </th>
              <th className="p-3 text-sm font-semibold text-blue-400">
                Created
              </th>
              <th className="p-3 text-sm font-semibold text-blue-400">
                Resolution
              </th>
              <th className="p-3 text-sm font-semibold text-blue-400">
                Credits
              </th>
              <th className="p-3 text-sm font-semibold text-blue-400">
                Progress
              </th>
              <th className="p-3 text-sm font-semibold text-blue-400">
                Status
              </th>
              <th className="p-3 text-sm font-semibold text-blue-400">Model</th>
              <th className="p-3 text-sm font-semibold text-blue-400">
                Thumbnail
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="p-4 text-gray-400 text-sm sm:text-base text-center"
                >
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <CustomButton onClick={handleLoadMore} disabled={loading}>
            Load More
          </CustomButton>
        </div>
      )}
    </div>
  );
};

// Main Library Component (Unchanged)
const Library = () => {
  const [activeTab, setActiveTab] = useState("Models");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Models":
        return <Models />;
      case "Jobs":
        return <Jobs />;
      case "Generate Model":
        return <CustomAIContainer />;
      default:
        return <Models />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-zinc-950 z-50 flex items-center justify-between p-4 border-b border-white/10">
        <h1 className="text-xl font-bold text-blue-400">Library</h1>
        <button
          className="p-2 bg-blue-600 text-white rounded-lg focus:outline-none hover:bg-blue-700 transition"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isSidebarOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>
      <div
        className={`fixed sm:static inset-y-0 left-0 w-64 sm:w-72 bg-zinc-950 flex flex-col space-y-3 shadow-xl pt-20 sm:pt-24 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 z-40 overflow-y-auto`}
      >
        <h1 className="text-xl sm:text-2xl font-bold text-blue-400 mb-6 ml-4 sm:block hidden">
          Library
        </h1>
        {[
          { name: "Models", icon: "M3 8h18M6 11h12M6 14h12M6 17h12" },
          {
            name: "Jobs",
            icon: "M20 7l-8-4-8 4m16 0v10l-8 4m8-14l-8 4m0 10V11m-8-4l8 4m-8 0v10",
          },
          {
            name: "Generate Model",
            icon: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
          },
        ].map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center space-x-3 ml-3 py-2 sm:py-3 px-4 w-48 rounded-xl transition-all duration-300 ${
              activeTab === tab.name
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
            onClick={() => {
              setActiveTab(tab.name);
              setIsSidebarOpen(false);
            }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={tab.icon}
              />
            </svg>
            <span className="text-sm sm:text-base">{tab.name}</span>
          </button>
        ))}
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="flex-1 bg-black pt-16 sm:pt-0">{renderContent()}</div>
    </div>
  );
};

export default Library;
