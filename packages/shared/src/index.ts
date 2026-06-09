export type AuthProvider = "password" | "google" | "microsoft" | "saml";

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export interface SsoAuthRequest {
  email: string;
  provider: Exclude<AuthProvider, "password">;
  redirectUri: string;
}

export interface PasswordAuthRequest extends EmailPasswordCredentials {
  provider: "password";
}

export type AuthRequest = PasswordAuthRequest | SsoAuthRequest;

export interface AuthResponse {
  token: string;
  user: UserProfile;
  ssoReadyProviders: Array<Exclude<AuthProvider, "password">>;
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
  description: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  learningObjectives: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  sourceExcerpt: string;
}

export interface TutorMessage {
  role: "learner" | "tutor";
  text: string;
  createdAt: string;
}

export interface QuizItem {
  id: string;
  prompt: string;
  choices: string[];
  answer: string;
}

export interface SessionState {
  sessionId: string;
  learnerId: string;
  lessonId: string;
  sourceExcerpt: string;
  tutorMessages: TutorMessage[];
  quizItems: QuizItem[];
  humanTrainerEscalationEnabled: boolean;
  updatedAt: string;
}

export interface AssessmentResult {
  id: string;
  sessionId: string;
  learnerId: string;
  score: number;
  passed: boolean;
  submittedAt: string;
}

export interface Attempt {
  id: string;
  userId: string;
  lessonId: string;
  sessionId: string;
  quizScore: number;
  submittedAt: string;
}

export interface MasteryRecord {
  userId: string;
  lessonId: string;
  masteryLevel: number;
  lastEvaluated: string;
}

export interface ReviewScheduleItem {
  userId: string;
  lessonId: string;
  dueAt: string;
  intervalDays: number;
  easeFactor: number;
}

export interface FeatureFlags {
  humanTrainerEscalation: boolean;
}

export const DEFAULT_HUMAN_TRAINER_ESCALATION = false;
