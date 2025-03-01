/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Updated for App Router
import axios from "axios"; // Import Axios

const SignUpPage: React.FC = () => {
  const router = useRouter();

  // Consolidated state management
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validate inputs
  const validateForm = () => {
    const newErrors: Record<string, string> = {};


    if (!form.username.trim()) newErrors.username = "Username is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email address.";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear field error on change
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form before making the API call
    if (!validateForm()) return;

    setIsLoading(true);

    const requestBody = {
      username: form.username,
      email: form.email,
      password: form.password,
    };

    try {
      // Make the POST request to the API Gateway endpoint using Axios
      const response = await axios.post(
        'https://ymcq30o8c7.execute-api.us-east-1.amazonaws.com/signup',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle successful response
      const data = response.data;
      alert(`Success: ${data.message}`);
      router.push("/confirm");
    } catch (error: any) {
      console.error('Error signing up:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('An error occurred during sign up. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md border border-gray-300">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/logogreen.svg" alt="Logo" className="h-10" />
        </div>

        <h1 className="text-2xl font-bold uppercase">
          <span className="text-green-600">Create</span>
          <span className="text-gray-700"> Account</span>
        </h1>

        {/* Global Error Message */}
        {errors.global && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4 text-sm">
            {errors.global}
          </div>
        )}

        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">* Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
            {errors.username && <p className="text-red-600 text-xs">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">* Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
            {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">* Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
            {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">* Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
            {errors.confirmPassword && <p className="text-red-600 text-xs">{errors.confirmPassword}</p>}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 text-sm ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "SIGN UP"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6">
          By signing up, you agree to the terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
