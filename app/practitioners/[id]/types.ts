/**
 * Shape of a practitioner record as returned from Prisma for
 * the public-facing practitioner pages.
 *
 * Notes:
 * - `tags` and `languages` come as JSON strings from the database → components
 *   must `JSON.parse()` before use.
 * - `memberSince` may be Date (server) or string (client) due to serialization.
 * - All fields correspond directly to the Practitioner model in the database.
 *
 * This interface is intentionally “raw” (matches DB output) — UI components
 * should adapt/format as needed rather than mutating this shape.
 */

export interface PractitionerData {
  id: number;
  name: string;
  title: string | null;
  imageUrl: string;

  shortBio: string;
  longBio: string;

  tags: string;
  country: string;
  city: string | null;
  consultationType: string;

  languages: string;

  experienceYears: number;
  hourlyRate: number;

  satisfactionScore: number;
  successfulSessions: string;
  memberSince: Date | string;

  professionalAssociations: string;

  eventTypeId: string;
  basePrice: number;
}
