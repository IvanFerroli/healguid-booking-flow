/**
 * @file CancelPage component
 *
 * Displays booking status after a canceled or abandoned Stripe checkout session.
 * Fetches the booking to determine whether payment actually failed, was canceled,
 * or was completed despite user abandonment.
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type CancelPageProps = {
  searchParams: Promise<{ bookingId?: string }>;
};

export default function CancelPage({ searchParams }: CancelPageProps) {
  const { bookingId } = React.use(searchParams);

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch booking status to determine final payment outcome (confirmed, pending, failed)

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`);
        const data = await res.json();
        if (res.ok) setBooking(data);
      } catch { }
      finally {
        setLoading(false);
      }
    }

    load();
  }, [bookingId]);

  const status = booking?.status;

  const isConfirmed = status === "confirmed";
  const isPending = status === "pending";
  const isFailed = status === "failed";

  return (
    <div className="hg-page hg-default-page flex items-center justify-center p-10">
      <div className="hg-card max-w-xl mx-auto text-center">

        {/* Loading state */}
        {loading && (
          <>
            <h1 className="hg-h2 mb-2">Loading…</h1>
            <p className="hg-body">Please wait a moment.</p>
          </>
        )}

        {/* No bookingId provided */}
        {!loading && !bookingId && (
          <>
            <h1 className="hg-h2 mb-2 text-hg-teal">Payment canceled</h1>
            <p className="hg-body mb-6">
              Your payment session was canceled. No charges were made.
            </p>
          </>
        )}

        {/* Booking found */}
        {!loading && bookingId && (
          <>
            {/* CASE 1 — Payment actually succeeded */}
            {isConfirmed && (
              <>
                <h1 className="hg-h2 mb-2 text-hg-teal">Payment completed ✔️</h1>
                <p className="hg-body mb-4">
                  Although you left the checkout, your payment was successfully processed.
                </p>
              </>
            )}

            {/* CASE 2 — User abandoned/canceled */}
            {isPending && (
              <>
                <h1 className="hg-h2 mb-2 text-hg-teal">Payment canceled</h1>
                <p className="hg-body mb-4">
                  No charges were made. Your payment attempt was canceled.
                </p>
              </>
            )}

            {/* CASE 3 — Payment failed */}
            {isFailed && (
              <>
                <h1 className="hg-h2 mb-2 text-red-600">Payment failed ❌</h1>
                <p className="hg-body mb-4">
                  Your payment attempt could not be completed.
                </p>
              </>
            )}

            <p className="hg-caption mb-4">
              Booking reference: <strong>{bookingId}</strong>
            </p>
          </>
        )}

        {/* CTA Buttons */}
        <Link
          href="/book"
          className="hg-header-cta bg-brand-orange text-white hover:bg-brand-orange-soft"
        >
          {/* Mobile: até sm */}
          <span className="sm:hidden">Match</span>

          {/* Desktop: de sm pra cima */}
          <span className="hidden sm:inline ">Find a Specialist</span>
        </Link>


        <a href="/" className="hg-body mt-4 block text-gray-600">
          Back to homepage
        </a>
      </div>
    </div>
  );
}
