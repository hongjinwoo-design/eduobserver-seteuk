export interface ObservationRecord {
  id: string;
  date: string; // YYYY-MM-DD
  content: string;
  authorId?: string;
}

export interface Student {
  id: string;
  name: string;
  studentNumber: string; // e.g., "10411"
  records: ObservationRecord[];
  generatedSummary?: string; // Cache for the AI summary
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
