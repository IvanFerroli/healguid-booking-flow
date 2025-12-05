"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Phone is required"),
  primaryHealthGoal: z.string().min(1, "Please select your main concern"),
  consultationPreference: z.enum(["either", "in_person", "virtual"], {
    required_error: "Consultation preference is required",
  }),
  preferredPractitioner: z.string().optional(),
  bestTimes: z.array(z.string()).optional(),
  startTimeline: z.string().optional(),
  extraNotes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

type BookingFormProps = {
  practitionerId: number;
};

const HEALTH_GOALS = [
  "Digestive & gut health",
  "Chronic fatigue & energy",
  "Hormonal issues",
  "Anxiety & stress",
  "Autoimmune conditions",
  "Sleep issues",
  "Long COVID",
  "Other / not sure",
];

const TIME_OPTIONS = [
  { value: "afternoon", label: "Afternoon (12pm–5pm)" },
  { value: "evening", label: "Evening (after 5pm)" },
  { value: "morning", label: "Morning (before 12pm)" },
  { value: "weekends", label: "Weekends" },
];

const START_TIMELINE_OPTIONS = [
  "ASAP (this week)",
  "Within 2 weeks",
  "Within the next month",
  "Just exploring options",
];

export function BookingForm({ practitionerId }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      consultationPreference: undefined,
      bestTimes: [],
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const nowIso = new Date().toISOString();

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practitionerId,
          slot: nowIso,
          name: data.name,
          email: data.email,
          phone: data.phone,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || "Failed to create booking");
      }

      const body = await response.json();

      if (body.checkoutUrl) {
        window.location.href = body.checkoutUrl;
      } else {
        throw new Error("Missing checkout URL from server");
      }
    } catch (err: any) {
      console.error("[BookingForm] submit error:", err);
      setSubmitError(
        err?.message ||
          "Something went wrong while creating your booking."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Request Your Consultation</h3>
        <p className="text-sm text-text-muted">
          Tell us about your health goals and we&apos;ll connect you with a
          practitioner who specialises in your needs.
        </p>
        <p className="text-xs text-text-soft">
          Takes only 2 minutes · Step 1 of 2: Basic Info (required)
        </p>
      </div>

      {/* Name */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Name<span className="text-brand-orange">*</span>
        </label>
        <input
          type="text"
          className={`hg-input ${errors.name ? "border-red-400" : ""}`}
          placeholder="Your name"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-xs text-red-500 mt-1 block">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Email<span className="text-brand-orange">*</span>
        </label>
        <input
          type="email"
          className={`hg-input ${errors.email ? "border-red-400" : ""}`}
          placeholder="name@example.com"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-xs text-red-500 mt-1 block">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Phone<span className="text-brand-orange">*</span>
        </label>
        <input
          type="tel"
          className={`hg-input ${errors.phone ? "border-red-400" : ""}`}
          placeholder="+44 7xxx xxx xxx"
          {...register("phone")}
        />
        {errors.phone && (
          <span className="text-xs text-red-500 mt-1 block">
            {errors.phone.message}
          </span>
        )}
      </div>

      {/* Primary health goal */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          What&apos;s your primary health goal?
          <span className="text-brand-orange">*</span>
        </label>

        <select
          className={`hg-input ${errors.primaryHealthGoal ? "border-red-400" : ""}`}
          defaultValue=""
          {...register("primaryHealthGoal")}
        >
          <option value="" disabled>
            Select your main concern
          </option>
          {HEALTH_GOALS.map((goal) => (
            <option key={goal} value={goal}>
              {goal}
            </option>
          ))}
        </select>

        {errors.primaryHealthGoal && (
          <span className="text-xs text-red-500 mt-1 block">
            {errors.primaryHealthGoal.message}
          </span>
        )}
      </div>

      {/* Consultation preference */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Consultation Preference
          <span className="text-brand-orange">*</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {[
            { value: "either", label: "Either works" },
            { value: "in_person", label: "In-person" },
            { value: "virtual", label: "Virtual" },
          ].map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input
                type="radio"
                value={opt.value}
                className="peer hidden"
                {...register("consultationPreference")}
              />

              <span
                className="
                  hg-pill bg-surface-soft text-text-main
                  peer-checked:bg-brand-orange-soft 
                  peer-checked:text-brand-orange
                  transition
                "
              >
                {opt.label}
              </span>
            </label>
          ))}
        </div>

        {errors.consultationPreference && (
          <span className="text-xs text-red-500 mt-1 block">
            {errors.consultationPreference.message}
          </span>
        )}
      </div>

      {/* Step 2 */}
      <div className="pt-4 border-t border-border-soft">
        <p className="mb-3 text-sm font-medium text-text-main">
          Step 2 of 2 (optional): Preferences
        </p>

        {/* Preferred practitioner */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">
            Which practitioner would you like to see?
          </label>
          <input
            type="text"
            className="hg-input"
            placeholder="Leave blank if you're not sure"
            {...register("preferredPractitioner")}
          />
        </div>

        {/* Best times */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            What times work best?
          </label>

          <div className="flex flex-wrap gap-2">
            {TIME_OPTIONS.map((opt) => (
              <label key={opt.value} className="cursor-pointer">
                <input
                  type="checkbox"
                  value={opt.value}
                  className="peer hidden"
                  {...register("bestTimes")}
                />

                <span
                  className="
                    hg-pill bg-surface-soft text-text-main
                    peer-checked:bg-brand-orange-soft 
                    peer-checked:text-brand-orange
                    transition
                  "
                >
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Start timeline */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">
            When would you like to have your first appointment?
          </label>

          <select
            className="hg-input"
            defaultValue=""
            {...register("startTimeline")}
          >
            <option value="" disabled>
              Select an option
            </option>
            {START_TIMELINE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Extra notes */}
        <div className="mb-2">
          <label className="mb-1 block text-sm font-medium">
            Anything else to help tailor your support?
          </label>
          <textarea
            rows={4}
            className="hg-input resize-none"
            placeholder="Please let us know anything that would help us support you better."
            {...register("extraNotes")}
          />
        </div>
      </div>

      {/* Security + error */}
      <div className="space-y-2 text-xs text-text-soft">
        <p>🔒 Your information is secure and will only be shared with your practitioner.</p>
        <p>
          By clicking &quot;Request Consultation&quot;, you consent to HealGuid processing the health
          information you provide (see Privacy Policy).
        </p>

        {submitError && (
          <p className="text-xs text-red-500">{submitError}</p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          className="hg-btn-primary w-full justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Redirecting to checkout..." : "Request Consultation"}
        </button>
      </div>
    </form>
  );
}
