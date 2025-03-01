"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type AccountStatus = "yes" | "no" | null;

const LoanQuotePage = () => {
  const [hasAccount, setHasAccount] = useState<AccountStatus>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAccount) {
      setError("Please select an option to continue");
      return;
    }
    setIsLoading(true);
    router.push(hasAccount === "yes" ? "/login" : "/register");
  };

  useEffect(() => {
    if (hasAccount) setError("");
  }, [hasAccount]);

  return (
    <div className="min-h-screen bg-greenDot-bg bg-cover font-sans">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Brand Header */}
        <header className="mb-10 text-center">
          <div className="relative h-12 w-48 mx-auto mb-6">
            <Image
              src="/logogreen.svg"
              alt="GreenDot Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="border-b border-greenDot-primary/20 pb-6">
            <h1 className="text-3xl font-bold text-greenDot-dark mb-3">
              Get Your Personalized Loan Quote
            </h1>
            <p className="text-greenDot-gray text-lg">
              Smart borrowing solutions tailored to your needs
            </p>
          </div>
        </header>

        {/* Main Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <div className="mb-8">
            <div className="h-2 bg-greenDot-light rounded-full">
              <div
                className="h-full bg-greenDot-primary rounded-full transition-all duration-300"
                style={{ width: "33%" }}
              />
            </div>
            <span className="text-sm text-greenDot-primary mt-2 block">
              Step 1 of 3
            </span>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-greenDot-dark mb-6">
              <span className="text-greenDot-primary">Q1.</span> Do you have an existing GreenDot account?
            </h2>

            <div className="space-y-4 mb-6">
              {(["yes", "no"] as const).map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    hasAccount === option
                      ? "border-greenDot-primary bg-greenDot-light/20"
                      : "border-greenDot-light hover:border-greenDot-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="accountStatus"
                    value={option}
                    checked={hasAccount === option}
                    onChange={() => setHasAccount(option)}
                    className="w-5 h-5 text-greenDot-primary focus:ring-greenDot-primary"
                    aria-describedby={error ? "error-message" : undefined}
                  />
                  <span className="ml-4 text-lg font-medium text-greenDot-dark">
                    {option === "yes"
                      ? "Yes, I have an account"
                      : "No, I need to create one"}
                  </span>
                </label>
              ))}
            </div>

            {error && (
              <p id="error-message" className="text-red-500 mb-4 animate-shake">
                {error}
              </p>
            )}

            <div className="border-t border-greenDot-light pt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 text-lg font-semibold bg-greenDot-primary text-white hover:bg-greenDot-primary-dark rounded-xl disabled:opacity-75 disabled:cursor-not-allowed transition-opacity"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-3">🌀</span>
                    Loading...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </section>
        </form>

        {/* Footer */}
        <footer className="mt-8 text-center space-y-3">
          <nav aria-label="Legal navigation">
            <div className="text-sm text-greenDot-gray">
              <a
                href="/privacy"
                className="hover:text-greenDot-primary transition-colors"
              >
                Privacy & Security
              </a>
              <span className="mx-3" aria-hidden="true">
                |
              </span>
              <a
                href="/terms"
                className="hover:text-greenDot-primary transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </nav>
          <p className="text-sm text-greenDot-gray">
            Available in{" "}
            <button className="text-greenDot-primary hover:underline focus:outline-none focus:ring-2 focus:ring-greenDot-primary">
              Français
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LoanQuotePage;