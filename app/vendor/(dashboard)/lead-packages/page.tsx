"use client";
import React, { useEffect, useMemo } from 'react'
import Script from 'next/script'
import { useDispatch, useSelector } from 'react-redux'
import { leadpackageList } from '@/services/leadpackage-api'
import { createPaymentOrder, verifyPayment } from '@/services/payment-api'
import Package from '../../../../components/vendor/Package'
import { toast } from 'react-toastify'

const LeadPackages = () => {
  const dispatch = useDispatch();
  const vendorId = useSelector((state: any) => state?.vendorAuth?.vendorid);
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';

  useEffect(() => {
    (dispatch as any)(leadpackageList());
  }, [dispatch]);

  const { LeadPackages, loading } = useSelector((state: any) => state.leadpackage);
  const packages = useMemo(() => LeadPackages || [], [LeadPackages]);

  const handleSubscribe = async (pkg: any) => {
    if (!vendorId) {
      toast.error('Vendor ID not found. Please login again.');
      return;
    }
    if (!pkg?._id) {
      toast.error('Invalid package.');
      return;
    }

    try {
      const orderResponse = await createPaymentOrder({
        leadPackageId: pkg._id,
        vendorId,
      });

      if (!orderResponse?.status) {
        toast.error(orderResponse?.message || 'Unable to create payment order.');
        return;
      }

      const { order, amount, currency, packageName } = orderResponse.data || {};
      if (!order?.id) {
        toast.error('Payment order is missing.');
        return;
      }

      if (!window?.Razorpay) {
        toast.error('Razorpay SDK not loaded.');
        return;
      }

      const options = {
        key: razorpayKey,
        amount: amount,
        currency: currency || 'INR',
        name: 'Lead Packages',
        description: packageName || pkg?.packageName || 'Lead Package',
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verifyResponse = await verifyPayment({
              leadPackageId: pkg._id,
              vendorId,
              orderId: order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyResponse?.status) {
              toast.success(verifyResponse?.message || 'Payment successful.');
            } else {
              toast.error(verifyResponse?.message || 'Payment verification failed.');
            }
          } catch (error: any) {
            toast.error(error?.message || 'Payment verification failed.');
          }
        },
        theme: { color: '#f7701d' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast.error(error?.message || 'Unable to start payment.');
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="row mb-3 mb-md-0">
        <div className="col-12 col-md-12">
          <h2 className="page-title">Lead Packages</h2>
        </div>
      </div>
      <div className="row package-row">
        {loading ? (
          <p>Loading...</p>
        ) : packages.length > 0 ? (
          packages.map((pkg: any) => (
            <Package key={pkg._id} pkg={pkg} onSubscribe={handleSubscribe} />
          ))
        ) : (
          <p>No packages available.</p>
        )}
      </div>
    </>
  )
}

export default LeadPackages
