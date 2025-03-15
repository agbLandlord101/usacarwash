/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => (
  <div className={`animate-spin rounded-full border-2 border-solid border-current border-r-transparent 
    ${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-12 w-12' : 'h-8 w-8'} inline-block`}>
    <span className="sr-only">Loading...</span>
  </div>
);

const VerificationPopup = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();



  
  const handleContinue = () => {
    router.push("/mygov"); // Route to your desired page
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm text-center">
    <h2 className="text-xl font-semibold mb-4 text-green-700">Welcome!</h2>
    <p className="text-gray-600 mb-6">
      Get started by verifying your identity.
    </p>

    <div className="flex justify-center gap-4">
      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300"
      >
        Continue
      </button>

      {/* Cancel Button */}
      <button
        onClick={onClose}
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
      >
        Cancel
      </button>
    </div>
  </div>
</div>

  );
};

const DriverDashboard = () => {
  const [driverData, setDriverData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        
        
        const response = await fetch(`/api/drivers/${userId}`);
        const data = await response.json();
        
        setDriverData(data);
        if (data.verified) setShowVerifyPopup(true);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverProfile();
  }, [router]);

  const campaignStatusBadge = (status: string) => {
    const statusStyles = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-sm ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showVerifyPopup && <VerificationPopup onClose={() => setShowVerifyPopup(false)} />}

      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <img src="/adrider-logo.svg" alt="AdRider" className="h-8" />
            <div className="flex items-center space-x-4">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={() => setShowVerifyPopup(true)}
              >
                Apply for Campaign
              </button>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="font-medium">{driverData?.firstName?.[0] || 'U'}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {driverData?.firstName || 'Driver'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Your vehicle is currently earning: ${driverData?.currentEarnings?.toFixed(2) || '0.00'} this month
          </p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold mt-1">
                    ${driverData?.totalEarnings?.toLocaleString() || '0.00'}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">💸</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Available Balance</p>
                  <p className="text-2xl font-bold mt-1">
                    ${driverData?.availableBalance?.toLocaleString() || '0.00'}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">🏦</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Current Campaigns</p>
                  <p className="text-2xl font-bold mt-1">
                    {driverData?.currentCampaigns || 0}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">🚗</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Next Payment</p>
                  <p className="text-2xl font-bold mt-1">
                    {driverData?.nextPaymentDate || '--'}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">📅</div>
              </div>
            </div>
          </div>
        )}

        {/* Campaign Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Active Campaigns</h3>
            <div className="space-y-4">
              {driverData?.campaigns?.map((campaign: any) => (
                <div key={campaign.id} className="p-4 border-b last:border-0 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">{campaign.dates}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${campaign.earnings.toFixed(2)}</p>
                      {campaignStatusBadge(campaign.status)}
                    </div>
                  </div>
                </div>
              ))}
              <button 
                className="w-full text-center text-blue-600 py-3 hover:bg-gray-50 rounded-lg"
                onClick={() => router.push("/campaigns")}
              >
                View All Campaigns →
              </button>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Driver Tools</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                onClick={() => router.push("/campaigns/apply")}
              >
                <div className="text-xl mb-2">📢</div>
                <span className="font-medium">Apply for New Campaign</span>
              </button>
              <button
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
                onClick={() => router.push("/schedule")}
              >
                <div className="text-xl mb-2">🗓️</div>
                <span className="font-medium">View Schedule</span>
              </button>
              <button
                className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                onClick={() => router.push("/documents")}
              >
                <div className="text-xl mb-2">📁</div>
                <span className="font-medium">Upload Documents</span>
              </button>
              <button
                className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
                onClick={() => router.push("/support")}
              >
                <div className="text-xl mb-2">🛟</div>
                <span className="font-medium">Support Center</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;