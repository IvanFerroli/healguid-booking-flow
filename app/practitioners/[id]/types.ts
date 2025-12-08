export interface PractitionerData {
  id: number;
  name: string;
  title: string | null;
  imageUrl: string;

  shortBio: string;
  longBio: string;

  // JSON em string (como vem do banco)
  tags: string;
  country: string;
  city: string | null;
  consultationType: string;

  // também JSON em string
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
