"use client";
import React, { useEffect, useState } from 'react';
import styles from '../../public/assets/frontend/RequestCallbackModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createInquiry, verifyInquiryOtp } from '@/services/inquiry-api';
import { toast } from 'react-toastify';

const RequestCallbackModal = ({ isOpen, onClose, serviceId }) => {
  const dispatch = useDispatch();
  const customerAuth = useSelector((state) => state.customerAuth);
  const [formStep, setFormStep] = useState('form'); // 'form' or 'otp'
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    eventDate: '',
  });
  const [inquiryId, setInquiryId] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [maskedMobile, setMaskedMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (customerAuth?.isAuthenticated && customerAuth?.details) {
      let details = customerAuth.details;
      if (typeof details === 'string') {
        try {
          details = JSON.parse(details);
        } catch (parseError) {
          details = null;
        }
      }

      if (details) {
        setFormData((prev) => ({
          ...prev,
          name: details.name || prev.name,
          mobile: details.mobile_number || prev.mobile
        }));
      }
    }
  }, [customerAuth?.details, customerAuth?.isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.mobile.trim()) {
      setError('Mobile number is required');
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.mobile.trim())) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!formData.eventDate) {
      setError('Event date is required');
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Call API to create inquiry
      const response = await dispatch(createInquiry({
        name: formData.name,
        mobile_number: formData.mobile,
        city: formData.city || '',
        event_date: formData.eventDate,
        enquiry_type: 'enquiry',
        service_id: serviceId || undefined
      }));

      // Check the response from the async thunk
      const payload = response.payload;
      
      if (response.type.endsWith('/fulfilled')) {
        // Check if the API response indicates success
        if (payload?.status === true) {
          setInquiryId(payload.data._id);
          //toast.success(payload.message || 'Inquiry created successfully!');
          toast.info('OTP sent successfully!');
          const maskedNum = `+91${formData.mobile.slice(0, 4)}****${formData.mobile.slice(-2)}`;
          setMaskedMobile(maskedNum);
          setFormStep('otp');
          setOtp(['', '', '', '']);
        } else {
          // API returned status: false
          console.log('Inquiry creation failed:', payload);
          setError(payload?.message || 'Failed to create inquiry');
        }
      } else if (response.type.endsWith('/rejected')) {
        // Request was rejected (network error, etc.)
        console.log('Request rejected:', response);
        setError(payload?.message || 'Mobile number is existed or failed to create inquiry. Please try again.');
        }
    } catch (err) { 
      console.error('Error creating inquiry:', err);
      setError(err?.message || 'Failed to create inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.querySelector(
        `input[data-otp-index="${index + 1}"]`
      );
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[data-otp-index="${index - 1}"]`
      );
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      setError('Please enter all 4 digits of OTP');
      return;
    }

    setLoading(true);
    try {
      // Call API to verify OTP
      const response = await dispatch(verifyInquiryOtp({
        inquiry_id: inquiryId,
        otp_code: otpCode
      }));

      const payload = response.payload;
      
      if (response.type.endsWith('/fulfilled')) {
        // Check if the API response indicates success
        if (payload?.status === true) {
          toast.success('Your inquiry has been submitted.');

          // Reset and close modal
          setTimeout(() => {
            onClose();
            setFormStep('form');
            setFormData({ name: '', mobile: '', city: '', eventDate: '' });
            setOtp(['', '', '', '']);
            setInquiryId(null);
            setMaskedMobile('');
          }, 1500);
        } else {
          // API returned status: false
          console.log('OTP verification failed:', payload);
          setError(payload?.message || 'Failed to verify OTP');
        }
      } else if (response.type.endsWith('/rejected')) {
        // Request was rejected (network error, etc.)
        console.log('OTP verification rejected:', response);
        setError(payload?.message || 'Failed to verify OTP. Please try again.');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      // Call API to resend OTP
      setOtp(['', '', '', '']);
      setError('');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalDialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <button 
            type="button" 
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

          {formStep === 'form' ? (
            <>
              <h4 className={styles.modalTitle}>
                <b>Request for Callback</b>
              </h4>
              <form onSubmit={handleSubmitForm} className={styles.formContent}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Name*</label>
                  <input
                    type="text"
                    name="name"
                    className={styles.formControl}
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Mobile*</label>
                  <input
                    type="tel"
                    name="mobile"
                    className={styles.formControl}
                    placeholder="Enter Mobile Number"
                    maxLength="10"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>City</label>
                  <input
                    type="text"
                    name="city"
                    className={styles.formControl}
                    placeholder="Enter Your City"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Event Date*</label>
                  <input
                    type="date"
                    name="eventDate"
                    className={styles.formControl}
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <button 
                  type="submit" 
                  className="btn btn-secondary rounded-5 px-4"
                  disabled={loading}
                >
                  {loading ? 'Sending OTP...' : 'Next'}
                </button>
              </form>
            </>
          ) : (
            <div className={styles.otpContainer}>
              <h3 className={styles.otpTitle}>OTP Verification</h3>
              <p className={styles.otpSubtitle}>
                Enter OTP Code sent to {maskedMobile}
              </p>

              <form onSubmit={handleSubmitOtp}>
                <div className={styles.otpInputContainer}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      data-otp-index={index}
                      className={styles.otpInput}
                      maxLength="1"
                      pattern="\d*"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      disabled={loading}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <button 
                  type="submit" 
                  className="btn btn-secondary rounded-5 px-4"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify & Submit'}
                </button>

                <p className={styles.resendText}>
                  Don't receive OTP code?{' '}
                  <button
                    type="button"
                    className={styles.resendLink}
                    onClick={handleResendOtp}
                    disabled={loading}
                  >
                    Resend
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCallbackModal;
