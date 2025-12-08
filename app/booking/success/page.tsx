/**
 * @file SuccessPage component
 *
 * Displays booking status after Stripe checkout. Performs an initial fetch to
 * retrieve booking details and auto-polls while payment remains pending.
 */

"use client";

import React, { useEffect, useState } from "react";

interface BookingData {
  id: number;
  status: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
  practitioner: {
    id: number;
    name: string;
    title: string;
  };
}

type SuccessPageProps = {
  searchParams: Promise<{ bookingId?: string }>;
};

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const { bookingId } = React.use(searchParams);

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initial fetch: load booking details and detect error states

  useEffect(() => {
    if (!bookingId) {
      setError("Missing booking ID.");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Unable to load booking.");
          setLoading(false);
          return;
        }

        setBooking(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch booking details.");
        setLoading(false);
      }
    }

    load();
  }, [bookingId]);

  // Auto-poll booking status while pending (stops when confirmed or after ~45s)

  useEffect(() => {
    if (!bookingId) return;

    let interval: any;
    let attempts = 0;

    interval = setInterval(async () => {
      attempts++;

      const res = await fetch(`/api/bookings/${bookingId}`);
      const data = await res.json();

      if (data?.status === "confirmed") {
        setBooking(data);
        clearInterval(interval);
      }

      // timeout ~45s
      if (attempts > 15) {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [bookingId]);

  if (loading) {
    return (
      <div className="hg-page hg-default-page flex items-center justify-center p-10">
        <div className="hg-card text-center max-w-md">
          <h2 className="hg-h2 mb-3">Loading your booking...</h2>
          <p className="hg-body">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="hg-page flex items-center justify-center p-10">
        <div className="hg-card text-center max-w-md border-red-300 bg-red-50">
          <h2 className="hg-h2 text-red-600 mb-3">Something went wrong</h2>
          <p className="hg-body mb-6">
            {error || "Booking not found or invalid."}
          </p>

          <a href="/" className="hg-btn mt-4">
            Back to homepage
          </a>
        </div>
      </div>
    );
  }

  const slot = new Date(booking.slot).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const status = booking.status;
  const isConfirmed = status === "confirmed";
  const isPending = status === "pending";
  const isFailed = status === "failed";

  if (isFailed) {
    return (
      <div className="hg-page flex items-center justify-center p-10">
        <div className="hg-card max-w-xl mx-auto text-center border-red-300 bg-red-50">
          <h1 className="hg-h2 mb-2 text-red-600">Payment failed ❌</h1>

          <p className="hg-body mb-6">
            We could not process your payment. No charges were made.
          </p>

          <div className="bg-hg-bg-section rounded-xl p-5 mb-6 text-left">
            <h3 className="hg-h3 mb-3 text-hg-teal">Attempt summary</h3>

            <p className="hg-body">
              <strong>Practitioner:</strong> {booking.practitioner.name}
            </p>
            <p className="hg-body">
              <strong>Specialty:</strong> {booking.practitioner.title}
            </p>
            <p className="hg-body">
              <strong>Time:</strong> {slot}
            </p>
            <p className="hg-body">
              <strong>Status:</strong>{" "}
              <span className="text-red-600 font-semibold">
                {booking.status}
              </span>
            </p>

            <p className="hg-caption mt-1">
              Booking reference:{" "}
              <span className="font-semibold">{booking.id}</span>
            </p>
          </div>

          <p className="hg-body text-gray-700 mb-6">
            You can try booking again with another payment method or at
            a different time.
          </p>

          <a href={`/book/${booking.practitioner.id}`} className="hg-btn mt-4">
            Try again
          </a>

          <a href="/" className="hg-body mt-4 block text-gray-600">
            Back to homepage
          </a>
        </div>
      </div>
    );
  }

  const statusClass =
    isConfirmed
      ? "text-green-600 font-semibold"
      : isPending
        ? "text-yellow-600 font-semibold"
        : isFailed
          ? "text-red-600 font-semibold"
          : "text-gray-600 font-semibold"; // e.g. cancelled

  return (
    <div className="hg-page hg-default-page flex items-center justify-center p-10">
      <div className="hg-card max-w-xl mx-auto text-center">


        <h1 className="hg-h2 mb-2 text-hg-teal">
          {isConfirmed
            ? "Booking confirmed! 🎉"
            : "Processing payment…"}
        </h1>

        <p className="hg-body mb-6">
          {isConfirmed
            ? "Your consultation has been successfully scheduled."
            : "We are waiting for your payment confirmation. This may take a few seconds."}
        </p>

        <div className="bg-hg-bg-section rounded-xl p-5 mb-6 text-left">
          <h3 className="hg-h3 mb-3 text-hg-teal">Booking Summary</h3>

          <p className="hg-body">
            <strong>Practitioner:</strong> {booking.practitioner.name}
          </p>
          <p className="hg-body">
            <strong>Specialty:</strong> {booking.practitioner.title}
          </p>
          <p className="hg-body">
            <strong>Time:</strong> {slot}
          </p>
          <p className="hg-body">
            <strong>Client:</strong> {booking.name}
          </p>
          <p className="hg-body">
            <strong>Status:</strong>{" "}
            <span className={statusClass}>{booking.status}</span>
          </p>

          <p className="hg-caption mt-1">
            Booking reference:{" "}
            <span className="font-semibold">{booking.id}</span>
          </p>

        </div>

        {/* breadcrumb + cancel pill dentro do card */}
        <div className="flex items-center justify-between mb-4">
          <a
            href="/"
            className="text-sm text-brand-teal underline-offset-2 hover:underline"
          >
            ← Back to homepage
          </a>

          {isConfirmed && (
            <button
              onClick={async () => {
                try {
                  const res = await fetch(
                    `/api/bookings/${bookingId}/cancel`,
                    {
                      method: "POST",
                    }
                  );

                  if (res.ok) {
                    setBooking((prev) =>
                      prev ? { ...prev, status: "cancelled" } : prev
                    );
                  }
                } catch (err) {
                  console.error("Failed to cancel booking", err);
                }
              }}
              className="
                px-4 py-1.5 rounded-full border text-sm
                text-gray-600 bg-gray-100
                hover:bg-red-100 hover:text-red-700
                transition-all font-medium
              "
            >
              Cancel
            </button>
          )}
        </div>

        {isPending && (
          <p className="hg-body text-gray-600 mb-2">
            You may refresh this page in a few seconds to check for confirmation.
          </p>
        )}
      </div>
    </div>
  );
}
