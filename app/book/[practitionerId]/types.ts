/**
 * Represents a single availability slot returned from the server.
 * `start` is an ISO datetime string.
 * `end` and `duration` are optional and set during normalization.
 */

export type Slot = {
  start: string;
  end?: string;
  duration?: number;
  time?: string; // fallback from Cal.com if start is missing
};

export type GroupedSlots = Record<string, Slot[]>;
