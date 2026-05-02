'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyCustomerOtpRequest, resendCustomerOtpRequest, verifyForgotPasswordOtpRequest } from '@/services/customer-api';
import { toast } from 'react-toastify';
import WithLayout from '@/hoc/WithLayout';

const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  // Get customer info from URL params
  const customerId = searchParams?.get('customerId') || '';
  const mobile = searchParams?.get('mobile') || '';
  const email = searchParams?.get('email') || '';
  const otpType = (searchParams?.get('type') || 'register').toLowerCase();

  useEffect(() => {
    if (!customerId) {
      toast.error('Invalid access. Please try again.');
      router.push(otpType === 'forgot' ? '/forgot-password' : '/register');
    }
  }, [customerId, otpType, router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      toast.error('Please enter complete OTP');
      return;
    }

    setLoading(true);
    try {
      const result = otpType === 'forgot'
        ? await verifyForgotPasswordOtpRequest({ customer_id: customerId, otp_code: otpCode })
        : await verifyCustomerOtpRequest({ customer_id: customerId, otp_code: otpCode });
      
      if (result.status) {
        if (otpType === 'forgot') {
          toast.success('OTP verified successfully! Redirecting to change password...');
          setTimeout(() => {
            router.push(`/change-password?customerId=${customerId}&type=forgot${email ? `&email=${encodeURIComponent(email)}` : ''}`);
          }, 1200);
        } else {
          toast.success('OTP verified successfully! Redirecting to login...');
          setTimeout(() => {
            router.push('/login');
          }, 1200);
        }
      } else {
        toast.error(result?.message || 'OTP verification failed');
      }
    } catch (error: unknown) {
      console.error('OTP verification error:', error);
      toast.error(error instanceof Error ? error.message : 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      const result = await resendCustomerOtpRequest({
        customer_id: customerId,
        purpose: otpType === 'forgot' ? 'forgot' : 'register'
      });
      if (result.status) {
        toast.success('OTP resent successfully!');
        setOtp(['', '', '', '']);
        inputRefs[0].current?.focus();
      } else {
        toast.error(result?.message || 'Failed to resend OTP');
      }
    } catch (error: unknown) {
      console.error('Resend OTP error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const maskMobile = (mobile: string) => {
    if (!mobile) return '****';
    return mobile.slice(0, 2) + '****' + mobile.slice(-2);
  };

  return (
    <section className="register-section py-5">
        <div className="container">
            <div className="row d-flex justify-content-center">
            <div className="col-md-9">
                <div className="form-sec">
                <div className="row">
                    <div className="col-md-6">
                    <div className="bg">
                        <div className="d-flex align-items-center">
                        <h2>India&apos;s Best Service Booking Platform</h2>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="content text-center pad-140">
                        <h3>OTP Verification</h3>
                        <p>
                          Enter OTP Code sent to {mobile ? `+91${maskMobile(mobile)}` : (email || 'your registered email')}
                        </p>
                        <form id="otp-form" className="mt-4" onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center justify-content-center gap-3">
                            {otp.map((digit, index) => (
                              <input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                className="text-center border border-transparent appearance-none rounded-5 p-3 outline-none"
                                pattern="\d*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                style={{ width: 60 }}
                                disabled={loading}
                              />
                            ))}
                        </div>
                        <div className="row d-flex align-items-center mt-4">
                            <div className="col-md-12">
                            <button
                                type="submit"
                                className="btn btn-secondary rounded-5 px-4"
                                disabled={loading}
                            >
                                {loading ? 'Verifying...' : 'Verify & Proceed'}
                            </button>
                            </div>
                        </div>
                        <p className="py-3">
                            Don&apos;t recieve OTP code?{" "}
                            <button
                              type="button"
                              className="btn btn-link p-0 text-success"
                              onClick={handleResend}
                              disabled={resendLoading || loading}
                              style={{ textDecoration: 'none' }}
                            >
                              {resendLoading ? 'Sending...' : 'Resend'}
                            </button>
                        </p>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default WithLayout(VerifyOtpPage, 'frontend')
