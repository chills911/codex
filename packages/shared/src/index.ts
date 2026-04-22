export type AuthProvider = "password" | "google" | "microsoft" | "saml";

export interface AuthRequest {
  email: string;
  password: string;
  provider: AuthProvider;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: "learner" | "trainer" | "admin";
  escalationEnabled: boolean;
}

export type CourseTrack = "Australian Standards" | "Main Roads style";

export interface Course {
  id: string;
  title: string;
  track: CourseTrack;
  moduleCount: number;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  lessonCount: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  sourceExcerpt: string;
}

export interface SessionState {
  sessionId: string;
  lessonId: string;
  sourceExcerpt: string;
  tutorMessages: Array<{ role: "learner" | "tutor"; text: string }>;
  quizItems: Array<{ id: string; prompt: string; choices: string[] }>;
  humanTrainerEscalationEnabled: boolean;
}

export interface AssessmentResult {
  sessionId: string;
  learnerId: string;
  score: number;
  passed: boolean;
  submittedAt: string;
}

export const DEFAULT_HUMAN_TRAINER_ESCALATION = false;
