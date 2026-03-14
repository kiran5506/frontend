'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createFeedback } from '@/services/feedback-api';
import { viewVendorById } from '@/services/vendor-api';

interface FeedbackFormProps {
  vendorId?: string;
}

const Feedback = ({ vendorId }: FeedbackFormProps) => {
  const dispatch = useDispatch();
  const { vendorAuth } = useSelector((state: any) => state);

  const validationSchema = Yup.object().shape({
    mobile_number: Yup.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
    feedback: Yup.string()
      .required("Feedback is required")
      .min(5, "Feedback must be at least 5 characters")
      .max(500, "Feedback must not exceed 500 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [mobileNumber, setMobileNumber] = useState("");
  const [vendorID, setVendorID] = useState("");

  // Auto-populate mobile number and vendor ID
  useEffect(() => {
    if (vendorAuth?.vendorid) {
      setVendorID(vendorAuth.vendorid);
      
      // Fetch vendor details using viewVendorById
      (dispatch as any)(viewVendorById(vendorAuth.vendorid))
        .then((response: any) => {
          if (response?.payload?.status && response?.payload?.data?.mobile_number) {
            const mobileNum = response.payload.data.mobile_number;
            setMobileNumber(mobileNum);
            setValue('mobile_number', mobileNum);
          }
        })
        .catch((error: any) => {
          console.error('Error fetching vendor details:', error);
          toast.error('Failed to load vendor details');
        });
    }
  }, [vendorAuth?.vendorid, setValue, dispatch]);

  const onSubmit = async (data: any) => {
    try {
      const feedbackData = {
        vendor_id: vendorID,
        type: 'vendor',
        mobile_number: data.mobile_number,
        feedback: data.feedback,
      };

      // @ts-ignore
      const response = await (dispatch as any)(createFeedback(feedbackData)).unwrap();
      
      if (response?.status) {
        toast.success('Feedback submitted successfully!');
        reset();
        // Keep mobile number populated
        setValue('mobile_number', mobileNumber);
      } else {
        toast.error('Failed to submit feedback: ' + (response?.message || 'Unknown error'));
      }
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      toast.error('Error: ' + (error?.message || 'An error occurred while submitting feedback'));
    }
  };

  return (
    <>
      <h2 className="page-title">Feedback</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="form-sec">
            <form
              className="row g-3"
              role="form"
              id="feedbackForm"
              name="feedbackForm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-12">
                <label htmlFor="mobile_number" className="form-label">
                  Mobile Number*
                </label>
                <input
                  type="text"
                  className="form-control py-2 px-4 rounded-5"
                  id="mobile_number"
                  placeholder="Enter Mobile Number"
                  {...register('mobile_number')}
                  readOnly
                />
                <small className="text-muted">
                  Auto-populated from your profile
                </small>
                {errors.mobile_number && (
                  <p className="text-danger">{errors.mobile_number.message}</p>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="feedback" className="form-label">
                  Write your feedback*
                </label>
                <textarea
                  className="form-control py-2 px-4 rounded-5"
                  id="feedback"
                  rows={4}
                  placeholder="Write your feedback here (5-500 characters)"
                  {...register('feedback')}
                />
                {errors.feedback && (
                  <p className="text-danger">{errors.feedback.message}</p>
                )}
              </div>

              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="btn orange-btn rounded-5 px-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary rounded-5 px-4 ms-2"
                  disabled={isSubmitting}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
