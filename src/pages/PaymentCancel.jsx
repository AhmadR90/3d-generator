import { motion } from 'framer-motion';

const SubscriptionFailure = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black p-4">
      <motion.div
        className="max-w-md w-full bg-zinc-900/80 border border-red-700/30 rounded-xl shadow-lg shadow-black/40 p-6 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex justify-center mb-4">
          <svg
            className="h-12 w-12 text-red-500 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">Subscription Request Failed</h2>
        <p className="text-zinc-400 text-sm mb-6">
          We're sorry, but your subscription request was not successful. Please try again or contact support for assistance.
        </p>
        <button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
};

export default SubscriptionFailure;