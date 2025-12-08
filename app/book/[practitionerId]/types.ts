/**
 * Represents a single availability slot returned from the server.
 * `start` is an ISO datetime string.
 */

export type Slot = {
  start: string;
};

export type GroupedSlots = Record<string, Slot[]>;
