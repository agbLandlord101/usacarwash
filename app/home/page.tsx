/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from "react";


const steps = [
  {
    title: "Easy Online Loan Application",
    content: "Our five-minute loan application saves you serious time and travel.",
  },
  {
    title: "Super-Fast Loan Approval",
    content: "We’re not about making you wait. We work hard to get your bad credit loan approved and funds in your bank within 24 hours of your application.",
  },
  {
    title: "Your Privacy Matters",
    content: "All of our online services are 100% secure, keeping your information where it belongs: between us.",
  },
  {
    title: "Responsible Lending",
    content: "We don’t approve every application because we want to make sure your  loan doesn’t create more difficulties for you. If you’re approved, it’s because we truly believe you’ll be able to make good on your commitment.",
  },
  {
    title: "After you file",
    content: "What to expect after filing your tax return and tracking your refund.",
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
          <img src="/logogreen.svg" alt="Logo" className="h-8 mr-3" />
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <a
            href="/info"
            className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 text-sm"
          >
            Apply Now
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
          <a href="/products" className="hover:text-green-500 transition duration-300">Products</a>
          <a href="/benefits" className="hover:text-green-500 transition duration-300">Benefits</a>
          <a href="/partners" className="hover:text-green-500 transition duration-300">Partners</a>
          <a href="/about-us" className="hover:text-green-500 transition duration-300">About Us</a>
          <a href="/help" className="hover:text-green-500 transition duration-300">Help</a>
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
          {["Products", "Benefits", "Partners", "About Us", "Help", "Log in"].map((item) => (
            <a key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="block hover:text-green-500">
              {item}
            </a>
          ))}
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
      <img src="/submit.png" alt="Instant Quote" className="w-12 h-12" />
      <div>
        <h3 className="font-bold">Start with an Instant Quote</h3>
        <p className="text-sm text-gray-600">Tell us how much money you’re looking to borrow and enter a few details.</p>
      </div>
      <span className="hidden md:inline-block text-xl text-orange-500">➡</span>
    </div>

    {/* Step 2 */}
    <div className="flex items-center space-x-4">
      <img src="/stopwatch.png" alt="Instant Response" className="w-12 h-12" />
      <div>
        <h3 className="font-bold">Receive an Instant Response</h3>
        <p className="text-sm text-gray-600">Find out how much money you qualify for and what your payments might be.</p>
      </div>
      <span className="hidden md:inline-block text-xl text-orange-500">➡</span>
    </div>

    {/* Step 3 */}
    <div className="flex items-center space-x-4">
      <img src="/moneyhand.png" alt="Get Money Quickly" className="w-12 h-12" />
      <div>
        <h3 className="font-bold">Get Your Money Quickly</h3>
        <p className="text-sm text-gray-600">Finalize your loan application and get your money in as little as 24 hours.</p>
      </div>
    </div>

  </div>
</section>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center p-6 md:p-10 gap-8">
  {/* First Section - Image on Right */}
  <div className="w-full md:w-1/2 text-center md:text-left">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
    We Give You the Credit You Deserve
    </h2>
    <p className="text-lg md:text-xl mb-4">
  Banks can be restrictive, but Greendot offers flexible options for those with bad credit. We consider more than just your credit score—making financial support more accessible.
</p>


    
    <a
      href="/login"
      className="inline-block bg-green-500 text-black px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300 text-lg font-semibold"
    >
      Log in to Enter
    </a>
  </div>
  <div className="w-full md:w-1/2">
    {/* Mobile Image */}
    <img
      src="/tax-center.png"
      alt="Tax Refund Mobile"
      className="w-full max-w-xl mx-auto rounded-xl shadow-lg md:hidden"
    />
    {/* Desktop Image */}
    <img
      src="/tax-center.png"
      alt="Tax Refund Desktop"
      className="w-full max-w-xl mx-auto rounded-xl shadow-lg hidden md:block"
    />
  </div>
</section>

{/* Second Section - Image on Left */}
<section className="flex flex-col md:flex-row-reverse items-center p-6 md:p-10 gap-8">
  <div className="w-full md:w-1/2 text-center md:text-left">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Superfast Loan Approval
    </h2>
    <p className="text-lg md:text-xl mb-4">
  Need a loan fast? GREENDOT makes it easy! Even with low or bad credit, you could get approved in as little as one business day. Just fill out a quick online application, and we’ll deposit your loan directly into your bank account—fast and hassle-free!  
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
      src="/tax-refund-win10k-mobile.svg"
      alt="Refer a Friend Mobile"
      className="w-full max-w-xl mx-auto rounded-xl shadow-lg md:hidden"
    />
    {/* Desktop Image */}
    <img
      src="/tax-refund-win10k-desktop.svg"
      alt="Refer a Friend Desktop"
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
          © 2025 Green Dot Corporation. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default TaxRefundPage;