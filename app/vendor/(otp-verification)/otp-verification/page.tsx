"use client";
import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { verifyVendorOtp, generateVendorOTP } from '@/services/vendor-api';
import { toast } from 'react-toastify';
import Link from 'next/link';

type RootState = {
  vendorAuth: {
    registeredVendor?: { _id?: string; mobile_number?: string; email?: string } | null;
    otpVerificationLoading?: boolean;
  };
};

type OtpActionResponse = {
  status?: boolean;
  message?: string;
  data?: {
    vendor_id?: string;
  };
};

type ActionResult = {
  type?: string;
  payload?: OtpActionResponse;
};

const OtpVerificationPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { registeredVendor, otpVerificationLoading } = useSelector((state: RootState) => state.vendorAuth);
  const flowType = (searchParams?.get('type') || 'register').toLowerCase();
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const [maskedMobile, setMaskedMobile] = useState('');
  const [vendorData, setVendorData] = useState<{ _id?: string; mobile_number?: string; email?: string } | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    // Check if vendor data exists in Redux (from registration) or localStorage
    let vendorDataTemp = registeredVendor;
    
    if (!vendorDataTemp) {
      // Try to get vendor data from localStorage
      const storedVendorData = localStorage.getItem('vendorData');
      if (storedVendorData) {
        try {
          vendorDataTemp = JSON.parse(storedVendorData);
        } catch (error) {
          console.error('Error parsing vendorData from localStorage:', error);
        }
      }
    }

    const vendorIdFromQuery = searchParams?.get('vendorId') || searchParams?.get('vendor_id');
    const mobileFromQuery = searchParams?.get('mobile') || '';
    const emailFromQuery = searchParams?.get('email') || '';

    if (!vendorDataTemp && vendorIdFromQuery) {
      vendorDataTemp = {
        _id: vendorIdFromQuery,
        mobile_number: mobileFromQuery,
        email: emailFromQuery,
      };
    }

    if (!vendorDataTemp) {
      toast.error('Please complete registration first');
      router.push(flowType === 'forgot' ? '/vendor/forgot-password' : '/vendor/register');
      return;
    }

    // Store vendor data in state
    setVendorData(vendorDataTemp);
    console.log('Vendor Data:', vendorDataTemp);
    
    // Mask the mobile number
    if (vendorDataTemp.mobile_number && vendorDataTemp.mobile_number.length >= 4) {
      const mobile = vendorDataTemp.mobile_number;
      const masked = mobile.substring(0, 2) + '*'.repeat(mobile.length - 4) + mobile.substring(mobile.length - 2);
      setMaskedMobile(masked);
    } else {
      console.error('Invalid mobile number:', vendorDataTemp.mobile_number);
      setMaskedMobile('');
    }
  }, [registeredVendor, router, searchParams, flowType]);

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleOtpInput = (index: number, value: string) => {
    // Only accept numbers
    if (!/^\d*$/.test(value)) return;

    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to next input if digit is entered
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      toast.error('Please enter all 4 digits');
      return;
    }

    if (!vendorData || !vendorData._id) {
      toast.error('Vendor data not found. Please register again.');
      return;
    }

    try {
      const verifyVendorOtpThunk = verifyVendorOtp as unknown as (payload: {
        vendor_id: string;
        otp_code: string;
        type: string;
      }) => unknown;
      const dispatchAction = dispatch as unknown as (action: unknown) => Promise<ActionResult>;
      const result = await dispatchAction(verifyVendorOtpThunk({
        vendor_id: vendorData._id,
        otp_code: otpCode,
        type: flowType
      }));

      if (result.type === 'vendorauth/verifyOtp/fulfilled') {
        const response = result.payload;
        if (response?.status) {
          toast.success('OTP verified successfully!');
          localStorage.removeItem('vendorData');
          if (flowType === 'forgot') {
            const vendorId = response?.data?.vendor_id || vendorData?._id;
            setTimeout(() => {
              router.push(`/vendor/change-password?vendorId=${vendorId}&type=forgot`);
            }, 600);
          } else {
            setTimeout(() => {
              router.push('/vendor/business-profile');
            }, 600);
          }
        } else {
          toast.error(response?.message || 'OTP verification failed');
        }
      } else if (result.type === 'vendorauth/verifyOtp/rejected') {
        const error = result.payload;
        toast.error(error?.message || 'Invalid OTP. Please try again.');
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Error verifying OTP');
      console.error('OTP verification error:', error);
    }
  };

  const handleResendOtp = async () => {
    if (!vendorData || !vendorData._id) {
      toast.error('Vendor data not found. Please register again.');
      return;
    }

    if (resendCountdown > 0) {
      toast.info(`Please wait ${resendCountdown} seconds before resending OTP`);
      return;
    }

    setResendLoading(true);
    try {
    const generateVendorOtpThunk = generateVendorOTP as unknown as (payload: { vendor_id: string; purpose: string }) => unknown;
    const dispatchAction = dispatch as unknown as (action: unknown) => Promise<ActionResult>;
    const result = await dispatchAction(generateVendorOtpThunk({ vendor_id: vendorData._id, purpose: flowType }));

      if (result.type === 'vendorauth/generateOTP/fulfilled') {
        const response = result.payload;
        if (response?.status) {
          toast.success('OTP sent successfully!');
          setResendCountdown(30); // 30 second cooldown
          setOtp(['', '', '', '']); // Clear OTP inputs
          inputRefs[0].current?.focus(); // Focus on first input
        } else {
          toast.error(response?.message || 'Failed to resend OTP');
        }
      } else if (result.type === 'vendorauth/generateOTP/rejected') {
        const error = result.payload;
        toast.error(error?.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Error resending OTP');
      console.error('Resend OTP error:', error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <section className="register-section py-5 d-flex align-items-center">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-5">
            <div className="form-sec">
              <div className="content text-center">
                <Link href="/vendor">
                  <center>
                    <Image
                      src="/assets/images/common/logo.png"
                      alt="logo"
                      width={160}
                      height={56}
                      className="logo pb-4"
                      style={{ height: 'auto' }}
                    />
                  </center>
                </Link>
                <h3 className="secondary-color text-center">OTP Verification</h3>
                <p>
                  Enter OTP Code sent to {flowType === 'forgot' ? (vendorData?.email || '') : `+91 ${maskedMobile}`}
                </p>
                <div className="row mb-3 pt-4 otp-box">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      className="form-control py-2 px-4"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpInput(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      placeholder="0"
                      inputMode="numeric"
                    />
                  ))}
                </div>

                <p className="py-3">
                  Don&apos;t receive OTP Code?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-success"
                    onClick={handleResendOtp}
                    disabled={resendLoading || resendCountdown > 0}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: resendLoading || resendCountdown > 0 ? 'not-allowed' : 'pointer',
                      textDecoration: 'none',
                      color: resendLoading || resendCountdown > 0 ? '#ccc' : '#28a745'
                    }}
                  >
                    {resendLoading ? 'Sending...' : resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend'}
                  </button>
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={handleVerifyOtp}
                  disabled={otpVerificationLoading}
                >
                  {otpVerificationLoading ? 'Verifying...' : (flowType === 'forgot' ? 'Verify OTP' : "Let's Build Business")}
                </button>
              </div>
            </div>
            <p className="text-center py-3 text-white">
              Copyrights 2024 Bsfye. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OtpVerificationPage
