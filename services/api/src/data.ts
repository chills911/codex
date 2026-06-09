import {
  DEFAULT_HUMAN_TRAINER_ESCALATION,
  type AssessmentResult,
  type Attempt,
  type Course,
  type FeatureFlags,
  type Lesson,
  type MasteryRecord,
  type Module,
  type ReviewScheduleItem,
  type SessionState,
  type UserProfile,
} from "@learning-platform/shared";

export interface PersistenceStore {
  featureFlags: FeatureFlags;
  users: UserProfile[];
  courses: Course[];
  modules: Module[];
  lessons: Lesson[];
  sessions: SessionState[];
  assessments: AssessmentResult[];
  attempts: Attempt[];
  mastery: MasteryRecord[];
  reviewSchedule: ReviewScheduleItem[];
}

const now = new Date().toISOString();

export const store: PersistenceStore = {
  featureFlags: {
    humanTrainerEscalation: DEFAULT_HUMAN_TRAINER_ESCALATION,
  },
  users: [
    {
      id: "u_1",
      email: "learner@example.com",
      fullName: "Casey Learner",
      role: "learner",
      escalationEnabled: DEFAULT_HUMAN_TRAINER_ESCALATION,
    },
  ],
  courses: [
    {
      id: "c_aus_1",
      title: "Australian Standards Essentials",
      track: "Australian Standards",
      description: "Core drafting and compliance interpretation aligned to Australian standards.",
    },
    {
      id: "c_mr_1",
      title: "Main Roads Style Fundamentals",
      track: "Main Roads style",
      description: "Road-design and annotation conventions based on Main Roads drafting style.",
    },
  ],
  modules: [
    {
      id: "m_1",
      courseId: "c_aus_1",
      title: "AS 1100 Foundations",
      learningObjectives: ["Interpret symbol conventions", "Apply line hierarchy"],
    },
    {
      id: "m_2",
      courseId: "c_mr_1",
      title: "Road Drawing Conventions",
      learningObjectives: ["Apply dimensioning rules", "Place annotations consistently"],
    },
  ],
  lessons: [
    {
      id: "l_1",
      moduleId: "m_1",
      title: "Linework & Symbols",
      sourceExcerpt:
        "AS guidance highlights consistent line weight, symbol legends, and drawing hierarchy for readability.",
    },
    {
      id: "l_2",
      moduleId: "m_2",
      title: "Main Roads Dimension Rules",
      sourceExcerpt: "Main Roads style focuses on unambiguous dimensions and annotation placement.",
    },
  ],
  sessions: [
    {
      sessionId: "s_1",
      learnerId: "u_1",
      lessonId: "l_1",
      sourceExcerpt:
        "AS guidance highlights consistent line weight, symbol legends, and drawing hierarchy for readability.",
      tutorMessages: [
        { role: "tutor", text: "Welcome! Identify one readability convention in this excerpt.", createdAt: now },
      ],
      quizItems: [
        {
          id: "q_1",
          prompt: "Which choice best aligns with the excerpt?",
          choices: ["Line hierarchy", "Random symbols", "No annotation standards"],
          answer: "Line hierarchy",
        },
      ],
      humanTrainerEscalationEnabled: DEFAULT_HUMAN_TRAINER_ESCALATION,
      updatedAt: now,
    },
  ],
  assessments: [
    {
      id: "a_1",
      sessionId: "s_1",
      learnerId: "u_1",
      score: 0.9,
      passed: true,
      submittedAt: now,
    },
  ],
  attempts: [
    {
      id: "at_1",
      userId: "u_1",
      lessonId: "l_1",
      sessionId: "s_1",
      quizScore: 0.9,
      submittedAt: now,
    },
  ],
  mastery: [
    {
      userId: "u_1",
      lessonId: "l_1",
      masteryLevel: 0.83,
      lastEvaluated: now,
    },
  ],
  reviewSchedule: [
    {
      userId: "u_1",
      lessonId: "l_1",
      dueAt: now,
      intervalDays: 3,
      easeFactor: 2.5,
    },
  ],
};
