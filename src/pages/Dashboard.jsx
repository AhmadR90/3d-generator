import React from "react";
import { useSelector } from "react-redux";
import { User, Crown, Activity, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../Components/UI/Card"; // Adjust the import path as needed
import { cn } from "../lib/utils";
import { Button } from "../Components/UI/Button"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col pt-16">
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center border-b border-gray-800 py-3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">
          Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-700 w-full sm:w-auto">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-md bg-gray-800 hover:bg-gray-700 w-full sm:w-auto">
            <span>Sign Out</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className={cn("w-full border-2 border-white/10 text-center")}>
          <CardHeader className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-gray-400">@</span>
            </div>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardDescription className="text-blue-300 mb-2">
            Your account info
          </CardDescription>
          <hr />
          <CardContent className="pt-4">
            <p className="text-blue-300 mb-1">Email</p>
            <p className="text-white mb-4">
              {userData.data?.email || "Not logged in"}
            </p>
            <p className="text-blue-300 mb-1">Username</p>
            <p className="text-white mb-4">
              {userData.data?.userName || "N/A"}
            </p>
            <p className="text-xs text-zinc-600">Account ID</p>
            <p className="text-xs text-zinc-600">{userData.data?.id}</p>
          </CardContent>
        </Card>

        {/* Subscription Status Card */}
        <Card className={cn("w-full bg-zinc-900 border-2 border-white/10")}>
          <CardHeader className="flex items-center justify-center space-x-3">
            <Crown className="w-8 h-8 text-yellow-500" />
            <CardTitle>Subscription Status</CardTitle>
          </CardHeader>
          <CardDescription className="text-gray-400 text-center mb-2">
            Your current plan and credits
          </CardDescription>
          <hr />
          <CardContent className="pt-4">
            <div className="bg-zinc-800 p-4 rounded-md mt-4 mb-4">
              <p className="text-white">
                {userData.data.userSubscription.subscriptionPlan?.name}
              </p>
              <p className="text-gray-500">
                {userData.data.userSubscription.subscriptionPlan?.isActive}
              </p>
            </div>
            <p className="mb-1">Available Credits</p>
            <p className="text-white mb-4">
              {userData.data?.credits}
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
              <button className="w-full sm:w-1/2 py-1 bg-gray-700 rounded-md">
                Monthly
              </button>
              <button className="w-full sm:w-1/2 py-1 bg-gray-700 rounded-md">
                Yearly
              </button>
            </div>
            <Button
              onClick={() => navigate("/subscribe")}
              className="w-full bg-blue-600 hover:bg-blue-700 shadow premium px-7 py-3 font-semibold text-base"
            >
              Get Subscription <ArrowRight className="w-5 h-5 inline ml-2" />
            </Button>
            <Button className="w-full mt-3 border-white/30 bg-white/5 hover:bg-white/10 text-white px-6 py-3">
              Buy More Credits
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card className={cn("w-full border-2 border-white/10")}>
          <CardHeader className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-gray-400">Ⓐ</span>
            </div>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardDescription className="text-gray-400 mb-2 text-center">
            Your latest models
          </CardDescription>
          <hr />
          <CardContent className="pt-4">
            <p className="text-gray-500 mt-7 text-center">No recent activity</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-4">
              Create Models
            </button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
