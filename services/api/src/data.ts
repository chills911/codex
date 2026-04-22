import {
  DEFAULT_HUMAN_TRAINER_ESCALATION,
  type AssessmentResult,
  type Course,
  type Lesson,
  type Module,
  type SessionState,
  type UserProfile,
} from "@learning-platform/shared";

export const userProfile: UserProfile = {
  id: "u_1",
  email: "learner@example.com",
  fullName: "Casey Learner",
  role: "learner",
  escalationEnabled: DEFAULT_HUMAN_TRAINER_ESCALATION,
};

export const courses: Course[] = [
  {
    id: "c_aus_1",
    title: "Australian Standards Essentials",
    track: "Australian Standards",
    moduleCount: 2,
  },
  {
    id: "c_mr_1",
    title: "Main Roads Style Fundamentals",
    track: "Main Roads style",
    moduleCount: 2,
  },
];

export const modules: Module[] = [
  { id: "m_1", courseId: "c_aus_1", title: "AS 1100 Foundations", lessonCount: 2 },
  { id: "m_2", courseId: "c_aus_1", title: "Specification Reading", lessonCount: 2 },
  { id: "m_3", courseId: "c_mr_1", title: "Road Drawing Conventions", lessonCount: 2 },
  { id: "m_4", courseId: "c_mr_1", title: "Project Sheet Quality", lessonCount: 2 },
];

export const lessons: Lesson[] = [
  {
    id: "l_1",
    moduleId: "m_1",
    title: "Linework & Symbols",
    sourceExcerpt:
      "AS guidance highlights consistent line weight, symbol legends, and drawing hierarchy for readability.",
  },
  {
    id: "l_2",
    moduleId: "m_3",
    title: "Main Roads Dimension Rules",
    sourceExcerpt: "Main Roads style focuses on unambiguous dimensions and annotation placement.",
  },
];

export const sessionState: SessionState = {
  sessionId: "s_1",
  lessonId: "l_1",
  sourceExcerpt: lessons[0].sourceExcerpt,
  tutorMessages: [
    { role: "tutor", text: "Welcome! Let’s analyse the excerpt and identify key conventions." },
  ],
  quizItems: [
    {
      id: "q_1",
      prompt: "Which factor most improves drawing readability per the excerpt?",
      choices: ["Line hierarchy", "Font color", "Sheet orientation"],
    },
  ],
  humanTrainerEscalationEnabled: DEFAULT_HUMAN_TRAINER_ESCALATION,
};

export const assessmentResults: AssessmentResult[] = [
  {
    sessionId: "s_1",
    learnerId: "u_1",
    score: 0.9,
    passed: true,
    submittedAt: new Date().toISOString(),
  },
];
