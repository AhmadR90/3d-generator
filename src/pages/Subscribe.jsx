import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Loader2,
  CreditCard,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Axios from "../Axios/axiosInatance";
import { toast } from "sonner";

// Mocked Components

const Button = ({ children, className, onClick, disabled, variant, size }) => (
  <button
    className={`px-4 py-2 rounded ${
      variant === "outline"
        ? "border border-gray-500 text-white"
        : "bg-blue-500 text-white"
    } ${size === "sm" ? "text-sm" : ""} ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
    } ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
const Switch = ({ checked, onCheckedChange, className }) => (
  <label
    className={`relative inline-flex items-center cursor-pointer ${className}`}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="sr-only peer"
    />
    <div
      className={`peer w-11 h-6 rounded-full transition-colors ${
        checked ? "bg-blue-500" : "bg-zinc-600"
      }`}
    >
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </div>
  </label>
);
const Card = ({ className, children }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ className, children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ className, children }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);
const CardDescription = ({ className, children }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);
const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const cn = (...classes) => classes.filter(Boolean).join("");

// Subscribe component
const Subscribe = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData.data);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFailureHelp, setShowFailureHelp] = useState(false);
  const [checkoutTimedOut, setCheckoutTimedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [subscription, setSubscription] = useState({
    plan: userData?.userSubscription?.subscriptionPlan?.name || "free",
    customerId: null,
  });
  const [plans, setPlans] = useState([]);

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const response = await Axios.get("/payment/packages");
        const apiPlans = response.data.data;
        const mappedPlans = apiPlans
          .filter((plan) => plan.isActive)
          .map((plan) => ({
            id: plan.id,
            name: plan.name,
            price: plan.price === "0" ? 0 : parseFloat(plan.price) || undefined,
            credits: plan.credits || undefined,
            features: plan.features,
            popular: plan.name === "SILVER",
            enterprise: plan.name === "ENTERPRISE",
          }));
        setPlans(mappedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setError(error.response?.data?.message || error.message);
        if (error.response?.status === 401) {
          toast.error("Unauthorized: Please log in again.");
          // navigate('/login');
        } else {
          toast.error(
            "Failed to load plans: " +
              (error.response?.data?.message || error.message)
          );
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Handle subscription creation
  const handleSubscribe = async (planId) => {
    setSelectedPlan(planId);
    setIsLoading(true);
    setError(null);
    try {
      const response = await Axios.post("/payment/create-session", { planId });
      console.log(response.data.data.url);
      if (response.data.data?.url) {
        window.location.href = response.data.data.url; // Redirect to Stripe checkout
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error creating subscription session:", error);
      setError(
        error.response?.data?.message || "Failed to create subscription session"
      );
      toast.error(
        error.response?.data?.message || "Failed to create subscription session"
      );
      if (error.response?.status === 401) {
        toast.error("Unauthorized: Please log in again.");
        // navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleSubscribe(selectedPlan);
  };

  const handleManualCheckout = () => {
    alert("Mocked manual checkout");
  };

  const clearState = () => {
    setIsLoading(false);
    setError(null);
    setCheckoutTimedOut(false);
  };

  // Calculate yearly discount (20% off)
  const yearlyDiscount = 0.2;

  // Helper to calculate discounted yearly price
  const getYearlyPrice = (monthlyPrice) => {
    if (monthlyPrice === 0 || !monthlyPrice) return 0;
    const yearlyPrice = monthlyPrice * 12 * (1 - yearlyDiscount);
    return yearlyPrice.toFixed(2);
  };

  useEffect(() => {
    let timeout = null;
    if (isLoading) {
      timeout = setTimeout(() => {
        setCheckoutTimedOut(true);
      }, 5000);
    } else {
      setCheckoutTimedOut(false);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading]);

  // Mocked refreshUserData
  const refreshUserData = () => {
    console.log("Mocked refreshUserData");
  };

  useEffect(() => {
    refreshUserData();
    const interval = setInterval(() => {
      refreshUserData();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // const handleManageSubscription = () => {
  //   alert('Mocked manage subscription');
  // };

  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      alert("Mocked status refreshed");
    }, 1000);
  };

  const isCurrentPlan = (planId) => {
    return (
      subscription?.plan === plans.find((plan) => plan.id === planId)?.name
    );
  };

  const blurryFade = {
    initial: { opacity: 0, filter: "blur(12px)" },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.45 },
    },
    exit: { opacity: 0, filter: "blur(12px)", transition: { duration: 0.35 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* <Navbar /> */}

      <div className="flex-1 p-2 md:pt-12 md:pb-24 md:px-10 max-w-7xl mx-auto w-full">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gradient bg-gradient-to-br from-white via-white/80 to-blue-400 bg-clip-text text-transparent pb-1 mb-2 py-[19px]">
            Choose Your Plan
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Select the subscription plan that best fits your needs and unlock
            the full potential of YVO3D.
          </p>
          <p className="text-sm text-zinc-500 mt-2">
            Current Date & Time:{" "}
            {new Date().toLocaleString("en-US", {
              timeZone: "Asia/Karachi",
              hour12: true,
              timeStyle: "medium",
              dateStyle: "full",
            })}
          </p>
        </div>

        {/* Monthly/Yearly Switch */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span
            className={`text-sm font-medium ${
              billingCycle === "monthly" ? "text-blue-400" : "text-zinc-400"
            }`}
          >
            Monthly
          </span>
          <Switch
            checked={billingCycle === "yearly"}
            onCheckedChange={(v) => setBillingCycle(v ? "yearly" : "monthly")}
            className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-zinc-600 !scale-110"
          />
          <span
            className={`text-sm font-medium ${
              billingCycle === "yearly" ? "text-blue-400" : "text-zinc-400"
            }`}
          >
            Yearly{" "}
            <span className="text-xs bg-green-600/20 text-green-400 px-1.5 py-0.5 rounded-sm ml-1">
              Save 20%
            </span>
          </span>
        </div>

        {/* Plans Grid */}
        {isLoading && (
          <div className="flex justify-center items-center mb-6">
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
              Loading plans...
            </p>
          </div>
        )}

        {error && !isLoading && (
          <Card className="mb-8 p-4 bg-red-900/20 border border-red-700/30 rounded-lg">
            <CardContent className="p-0">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <div className="flex-1">
                  <h3 className="text-white font-medium">
                    Error Loading Plans
                  </h3>
                  <p className="text-zinc-300 mt-1">{error}</p>
                  <div className="mt-4 flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/30 bg-red-900/20 hover:bg-red-900/40"
                      onClick={() => window.location.reload()}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Retry
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!isLoading && plans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-16">
            <AnimatePresence mode="wait">
              {plans.map((plan) => {
                const isActive = isCurrentPlan(plan.id);
                const displayPrice =
                  billingCycle === "yearly" && plan.price
                    ? getYearlyPrice(plan.price)
                    : plan.price;

                return (
                  <motion.div
                    key={plan.id}
                    className={cn(
                      "relative h-full rounded-2xl shadow-lg shadow-black/40 border border-white/10 flex flex-col items-start justify-between",
                      isActive
                        ? "ring-2 ring-green-600/60 border-green-500/40 shadow-green-700/40"
                        : "",
                      "bg-gradient-to-br from-zinc-900/70 to-black/60"
                    )}
                    {...blurryFade}
                    layout
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <div className="bg-blue-600/90 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg drop-shadow mt-1 animate-glow">
                          Most Popular
                        </div>
                      </div>
                    )}
                    {isActive && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <div className="bg-green-600/90 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg drop-shadow mt-1 animate-glow">
                          Your Current Plan
                        </div>
                      </div>
                    )}
                    <Card className="flex-grow w-full bg-transparent border-none shadow-none">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold text-white">
                          {plan.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-3">
                          {plan.enterprise ? (
                            <span className="text-2xl font-semibold text-white/75">
                              Contact us
                            </span>
                          ) : plan.price === 0 ? (
                            <span className="text-3xl font-bold text-white">
                              Free
                            </span>
                          ) : (
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold text-white">
                                ${displayPrice}
                              </span>
                              <span className="ml-1 text-sm text-zinc-400">
                                /{billingCycle === "yearly" ? "year" : "month"}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="mb-4 flex items-center text-blue-300 text-sm">
                          <span>
                            {plan.credits
                              ? plan.credits.toLocaleString() +
                                " credits included"
                              : "Custom credits available"}
                          </span>
                        </div>
                        <ul className="mb-8 space-y-2 text-zinc-200">
                          {plan.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm gap-2"
                            >
                              <CheckCircle
                                size={16}
                                className="text-green-400 shrink-0"
                              />
                              <span className="text-left">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      {plan.enterprise ? (
                        <Button
                          className="w-content m-4 py-3 font-semibold text-base rounded-xl bg-yellow-700 hover:bg-yellow-800 text-white"
                          onClick={() => navigate("/contact")}
                        >
                          Contact Us
                        </Button>
                      ) : plan.id !== "free" ? (
                        <Button
                          className={cn(
                            "w-content m-4 py-3 font-semibold text-base rounded-xl",
                            "bg-white/10 hover:bg-white/20 border border-white/10 text-white"
                          )}
                          onClick={() =>
                            isActive
                              ? handleManageSubscription()
                              : handleSubscribe(plan.id)
                          }
                          disabled={isLoading || isRefreshing}
                        >
                          {isLoading && selectedPlan === plan.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : isActive ? (
                            <>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Manage Subscription
                            </>
                          ) : (
                            `Subscribe ${
                              billingCycle === "yearly" ? "Yearly" : "Monthly"
                            }`
                          )}
                        </Button>
                      ) : null}
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Buy Credits Button */}
        <div className="w-full my-10 flex flex-col items-center">
          <Card className="w-full max-w-3xl bg-gradient-to-br from-white/10 to-black/30 rounded-2xl shadow-lg shadow-black/30 border border-white/12 text-center">
            <CardContent className="px-8 py-8">
              <h3 className="text-lg font-semibold text-white mb-1">
                Need more credits?
              </h3>
              <p className="text-zinc-300 mb-4">
                One-time credit packs are available for purchase without a
                subscription.
              </p>
              <Button
                variant="outline"
                className="bg-white/5 border-white/20 px-8 py-3"
                onClick={() => navigate("/credit-packs")}
              >
                View Credit Packs
              </Button>
            </CardContent>
          </Card>
          <div className="my-8 text-center w-full">
            <Button
              variant="outline"
              className="bg-white/5 hover:bg-white/10 px-8 py-3"
              onClick={() => navigate("/subscribe-table")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Stripe Pricing Table
            </Button>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && plans.length === 0 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <Card className="bg-zinc-900 rounded-lg border border-blue-500/30 shadow-2xl max-w-md w-full">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                  <h2 className="text-xl font-semibold text-white">
                    Preparing Your Checkout...
                  </h2>
                  <p className="text-zinc-400">
                    We're connecting to Stripe to set up your subscription. This
                    should only take a moment.
                  </p>

                  {checkoutTimedOut && (
                    <Card className="mt-4 p-4 bg-amber-900/20 border border-amber-700/30 rounded-lg w-full text-left">
                      <CardContent className="p-0">
                        <p className="text-amber-300 font-medium mb-2">
                          Taking longer than expected?
                        </p>
                        <p className="text-zinc-300 mb-4 text-sm">
                          If the checkout doesn't load after a few seconds, you
                          can try the following options:
                        </p>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            className="border-amber-500/30 bg-amber-900/20 hover:bg-amber-900/40"
                            onClick={() => handleRetry()}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Retry Checkout
                          </Button>
                          <Button
                            variant="outline"
                            className="border-zinc-500/30 bg-zinc-900/50 hover:bg-zinc-800"
                            onClick={() => {
                              clearState();
                              setShowFailureHelp(true);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Failure Help */}
        {showFailureHelp && !isLoading && (
          <Card className="mb-8 p-5 bg-amber-900/20 border border-amber-700/30 rounded-lg">
            <CardContent className="p-0">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium">
                    Checkout Connection Issues
                  </h3>
                  <p className="mt-1 text-zinc-300">
                    There may be an issue connecting to our payment processor.
                    Here are some options to try:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    <li>Check your internet connection</li>
                    <li>Try using a different browser</li>
                    <li>Disable any VPN or proxy services</li>
                    <li>Try again in a few minutes</li>
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700"
                      onClick={() => {
                        setShowFailureHelp(false);
                        handleRetry();
                      }}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-500/30"
                      onClick={() => {
                        setShowFailureHelp(false);
                      }}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {error && !isLoading && !showFailureHelp && (
          <Card className="mb-8 p-4 bg-red-900/20 border border-red-700/30 rounded-lg">
            <CardContent className="p-0">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <div className="flex-1">
                  <h3 className="text-white font-medium">Checkout Error</h3>
                  <p className="text-zinc-300 mt-1">{error}</p>
                  <div className="mt-4 flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/30 bg-red-900/20 hover:bg-red-900/40"
                      onClick={handleRetry}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Retry
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleManualCheckout}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open Checkout Manually
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
