/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from "react";


const steps = [
  {
    title: "Earn While You Drive",
    content: "Turn your daily commute into a money-making opportunity by displaying premium brand decals on your car.",
  },
  {
    title: "Simple Online Application",
    content: "Our streamlined application process gets you started in just a few minutes — no long forms or hidden fees.",
  },
  {
    title: "Fast Review & Approval",
    content: "We review applications within **24 hours** and notify you immediately if you're selected for a campaign.",
  },
  {
    title: "Guaranteed Weekly Payments",
    content: "Receive up to **$750 weekly** directly into your bank account — no delays, no excuses.",
  },
  {
    title: "Non-Damaging Decals",
    content: "We use high-quality vinyl decals that won't damage your car's paint or leave residue behind.",
  },
  {
    title: "Drive on Your Own Schedule",
    content: "No fixed hours — just drive your usual routes and earn passively while you do.",
  },
  {
    title: "Join the Drive & Earn Community",
    content: "Be part of a growing community of drivers turning their cars into **moving billboards** and making passive income.",
  },
  {
    title: "What Happens Next?",
    content: "After approval, we'll guide you through the decal installation process and set you up to start earning immediately.",
  },
  
];

const TaxRefundPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(steps[0].title);
  const [isMobile, setIsMobile] = useState(false);
  const [openTabs, setOpenTabs] = useState<boolean[]>(new Array(steps.length).fill(false));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccordion = (index: number) => {
    setOpenTabs(prev => {
      const newTabs = [...prev];
      newTabs[index] = !newTabs[index];
      return newTabs;
    });
  };

  return (
    <div className="page-container bg-white text-black">
      <header className="header bg-white text-black flex justify-between items-center p-6 shadow-md sticky top-0 z-50">
        <div className="logo-container">
          <a >
          <img src="/Carvertise_Logo_White.svg" alt="Logo" className="h-8 mr-3" />
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <a
            href="/info"
            className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 text-sm"
          >
            Apply
          </a>
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-menu hidden md:flex space-x-8 font-medium text-sm md:text-base">
        
        </nav>

        <div className="hidden md:flex space-x-4">
          <a href="/login" className="text-black hover:text-green-500 transition duration-300">Log in</a>
          <a href="/registercard" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-300">
            Activate
          </a>
          <a href="/info" className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
            Apply
          </a>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white text-black space-y-4 p-4">
          
          <a href="/registercard" className="block bg-black text-white px-5 py-2 rounded-lg hover:bg-green-500 transition duration-300">
            Activate your card
          </a>
          <a href="/info" className="block bg-green-500 text-black px-5 py-2 rounded-lg hover:bg-green-600 transition duration-300">
            Apply
          </a>
        </nav>
      )}

      <main>

      <section className="p-6 md:p-10 bg-gray-50">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
    How It Works
  </h2>

  {/* Wrapper for Flexbox Layout */}
  <div className="flex flex-col md:flex-row items-center justify-center md:space-x-10 space-y-6 md:space-y-0">
    
    {/* Step 1 */}
    <div className="flex items-center space-x-4">
      <img src="/submit.png" alt="Submit Application" className="w-12 h-12" />
      <div>
        <h3 className="font-bold">Submit Your Application</h3>
        <p className="text-sm text-gray-600">We ask some simple questions about where you normally drive.</p>
      </div>
      <span className="hidden md:inline-block text-xl text-orange-500">➡</span>
    </div>

    {/* Step 2 */}
    <div className="flex items-center space-x-4">
      <img src="/stopwatch.png" alt="Get Matched" className="w-12 h-12" />
      <div>
        <h3 className="font-bold">Get Matched & Get Wrapped</h3>
        <p className="text-sm text-gray-600">We then match you to a brand that likes your driving habits.</p>
      </div>
      <span className="hidden md:inline-block text-xl text-orange-500">➡</span>
    </div>

    {/* Step 3 */}
    <div className="flex items-center space-x-4">
      <img src="/moneyhand.png" alt="Drive & Earn" className="w-12 h-12" />
      <div>
        <h3 className="font-bold">Drive & Earn</h3>
        <p className="text-sm text-gray-600">We wrap your car and then pay you every month through direct deposit.</p>
      </div>
    </div>

  </div>
</section>



        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center p-6 md:p-10 gap-8">
  {/* First Section - Image on Right */}
  <div className="w-full md:w-1/2 text-center md:text-left">
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
  Drive with Purpose, Earn with Ease
</h2>
<p className="text-lg md:text-xl mb-4">
  Turn your daily commute into a steady income stream. Join our car advertising program and let brands pay you while you drive.
</p>


    
    <a
      href="/info"
      className="inline-block bg-green-500 text-black px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300 text-lg font-semibold"
    >
      Join Now
    </a>
  </div>
  <div className="w-full md:w-1/2">
    {/* Mobile Image */}
    <img
      src="/Driver-Page-scaled.jpg"
      alt="Drive Advertisement Mobile"
      className="w-full max-w-xl mx-auto rounded-xl shadow-lg md:hidden"
    />
    {/* Desktop Image */}
    <img
      src="/Driver-Page-scaled.jpg"
      alt="Drive Advertisement Desktop"
      className="w-full max-w-xl mx-auto rounded-xl shadow-lg hidden md:block"
    />
  </div>
</section>

{/* Second Section - Image on Left */}
<section className="flex flex-col md:flex-row-reverse items-center p-6 md:p-10 gap-8">
  <div className="w-full md:w-1/2 text-center md:text-left">
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
  Fast & Easy Enrollment
</h2>
<p className="text-lg md:text-xl mb-4">
  Our simple application process gets you on the road to earning in no time. Submit your application and start driving with confidence.
</p>

    
    <a
      href="/info"
      className="inline-block bg-green-500 text-black px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300 text-lg font-semibold"
    >
      Apply
    </a>
  </div>
  <div className="w-full md:w-1/2">
    {/* Mobile Image */}
    <img
      src="/bg-1.png"
      alt="Fast Enrollment Mobile"
      className="w-full max-w-xl mx-auto rounded-xl shadow-lg md:hidden"
    />
    {/* Desktop Image */}
    <img
      src="/bg-1.png"
      alt="Fast Enrollment Desktop"
      className="w-full max-w-xl mx-auto rounded-xl shadow-lg hidden md:block"
    />
  </div>
</section>





        {/* Steps Section */}
        <section className="p-6 md:p-10 bg-gray-50">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Complete These Steps to Enter
          </h2>

          {!isMobile ? (
            // Desktop Tabs
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {steps.map((step) => (
                  <button
                    key={step.title}
                    onClick={() => setActiveTab(step.title)}
                    className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                      activeTab === step.title
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {step.title}
                  </button>
                ))}
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                {steps.find((step) => step.title === activeTab)?.content}
              </div>
            </div>
          ) : (
            // Mobile Accordion
            <div className="max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center px-6 py-4 font-semibold"
                  >
                    <span>{step.title}</span>
                    <span className={`text-green-500 text-xl transition-transform ${openTabs[index] ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {openTabs[index] && (
                    <div className="px-6 py-4 border-t border-gray-100">
                      {step.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-black text-white p-6 text-center">
        <p className="text-sm md:text-base">
          © 2025  Car Advertising Corporation. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default TaxRefundPage;