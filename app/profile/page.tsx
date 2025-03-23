/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const VehiclePopup = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/idme");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4 text-green-600">Get Started!</h2>
        <div className="mb-6">
          <p className="text-gray-600">
  Start by verifying your identity. This information must match your driver’s license submitted earlier.
</p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleContinue}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
          >
            <span className="mr-2">🚗</span> Verify
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [accountData, setAccountData] = useState<any>(null);
  const [, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => setShowPopup(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
    if (!storedUsername) return;

    const fetchAccountData = async () => {
      try {
        const response = await fetch(`https://ymcq30o8c7.execute-api.us-east-1.amazonaws.com/profile/${storedUsername}`);
        const data = await response.json();
        setAccountData(data);
        if (!data.vehicleVerified) setShowPopup(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccountData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {showPopup && <VehiclePopup onClose={closePopup} />}
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gradient-to-b from-green-900 to-green-800 text-white p-6 space-y-8">
        <div className="flex items-center space-x-3 border-b border-green-700 pb-6">
          <img src="/logogreen.svg" alt="Logo" className="h-8" />
        </div>

        <nav>
          <ul className="space-y-4">
            <li>
              <a href="mygov" className="flex items-center space-x-3 p-3 hover:bg-green-700 rounded-lg">
                <span className="text-xl">📊</span>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="mygov" className="flex items-center space-x-3 p-3 hover:bg-green-700 rounded-lg">
                <span className="text-xl">💵</span>
                <span>Earnings</span>
              </a>
            </li>
            <li>
              <a href="mygov" className="flex items-center space-x-3 p-3 hover:bg-green-700 rounded-lg">
                <span className="text-xl">🚘</span>
                <span>Vehicles</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="bg-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {accountData?.firstName || 'Driver'}! 🚙
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {accountData?.vehicleCount || 0} Registered Vehicles
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm">
              ⭐ {accountData?.driverRating || '4.8'} Rating
            </div>
            <div className="relative group">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer">
                {username?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="mb-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                    <p className="text-3xl font-bold text-gray-800">
                      ${accountData?.totalEarnings?.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div className="bg-green-600 p-3 rounded-lg">💵</div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Active Campaigns</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {accountData?.activeCampaigns || 0}
                    </p>
                  </div>
                  <div className="bg-green-600 p-3 rounded-lg">📈</div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Vehicle Views</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {accountData?.totalViews?.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div className="bg-purple-600 p-3 rounded-lg">👀</div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Referral Earnings</p>
                    <p className="text-3xl font-bold text-gray-800">
                      ${accountData?.referralEarnings?.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div className="bg-orange-600 p-3 rounded-lg">👥</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Current Campaigns</h3>
            <div className="space-y-4">
              {accountData?.activeCampaignsList?.map((campaign: any) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">📢</div>
                    <div>
                      <p className="font-medium">{campaign.brand}</p>
                      <p className="text-sm text-gray-500">Earnings: ${campaign.earnings}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{campaign.duration}</p>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      Active
                    </span>
                  </div>
                </div>
              ))}
              <button className="w-full text-center text-green-600 py-3 hover:bg-gray-50 rounded-lg">
                View All Campaigns →
              </button>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Driver Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                onClick={() => setShowPopup(true)}
              >
                <div className="text-3xl mb-2">🚘</div>
                <div className="font-medium">New Campaign</div>
              </button>
              <button
                className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                onClick={() => setShowPopup(true)}
              >
                <div className="text-3xl mb-2">📋</div>
                <div className="font-medium">Manage Vehicles</div>
              </button>
              <button
                className="p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                onClick={() => setShowPopup(true)}
              >
                <div className="text-3xl mb-2">⚙️</div>
                <div className="font-medium">Payment Settings</div>
              </button>
              <button
                className="p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                onClick={() => setShowPopup(true)}
              >
                <div className="text-3xl mb-2">🎁</div>
                <div className="font-medium">Refer Friends</div>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;