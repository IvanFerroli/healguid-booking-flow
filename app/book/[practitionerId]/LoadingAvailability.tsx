"use client";

export function LoadingAvailability() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 w-32 bg-surface-soft rounded" />
      <div className="h-10 w-full bg-surface-soft rounded" />
      <div className="h-10 w-full bg-surface-soft rounded" />
      <div className="h-10 w-full bg-surface-soft rounded" />
    </div>
  );
}
