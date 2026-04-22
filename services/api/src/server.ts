import cors from "cors";
import express from "express";
import type { AssessmentResult, AuthRequest, AuthResponse, SsoAuthRequest } from "@learning-platform/shared";
import { store } from "./data";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/login", (req, res) => {
  const payload = req.body as AuthRequest;

  if (!payload.email || !payload.provider) {
    res.status(400).json({ error: "email and provider are required" });
    return;
  }

  if (payload.provider === "password" && !payload.password) {
    res.status(400).json({ error: "password is required for password auth" });
    return;
  }

  const user = store.users.find((item) => item.email === payload.email) ?? store.users[0];
  const response: AuthResponse = {
    token: `demo-token-${user.id}`,
    user,
    ssoReadyProviders: ["google", "microsoft", "saml"],
  };

  res.json(response);
});

app.post("/auth/sso/init", (req, res) => {
  const payload = req.body as SsoAuthRequest;
  if (!payload.email || !payload.provider || !payload.redirectUri) {
    res.status(400).json({ error: "email, provider, and redirectUri are required" });
    return;
  }

  res.json({
    provider: payload.provider,
    authorizationUrl: `${payload.redirectUri}?provider=${payload.provider}`,
    state: `state-${payload.email}`,
  });
});

app.get("/feature-flags", (_req, res) => {
  res.json(store.featureFlags);
});

app.get("/users/:userId/profile", (req, res) => {
  const profile = store.users.find((item) => item.id === req.params.userId);
  if (!profile) {
    res.status(404).json({ error: "user profile not found" });
    return;
  }

  res.json(profile);
});

app.get("/courses", (_req, res) => {
  const payload = store.courses.map((course) => ({
    ...course,
    modules: store.modules.filter((module) => module.courseId === course.id),
  }));
  res.json(payload);
});

app.get("/courses/:courseId/modules", (req, res) => {
  res.json(store.modules.filter((item) => item.courseId === req.params.courseId));
});

app.get("/modules/:moduleId/lessons", (req, res) => {
  res.json(store.lessons.filter((item) => item.moduleId === req.params.moduleId));
});

app.get("/sessions/:sessionId", (req, res) => {
  const session = store.sessions.find((item) => item.sessionId === req.params.sessionId);
  if (!session) {
    res.status(404).json({ error: "session not found" });
    return;
  }

  res.json(session);
});

app.put("/sessions/:sessionId", (req, res) => {
  const session = store.sessions.find((item) => item.sessionId === req.params.sessionId);
  if (!session) {
    res.status(404).json({ error: "session not found" });
    return;
  }

  session.tutorMessages = req.body.tutorMessages ?? session.tutorMessages;
  session.updatedAt = new Date().toISOString();
  res.json(session);
});

app.get("/users/:userId/assessments", (req, res) => {
  res.json(store.assessments.filter((item) => item.learnerId === req.params.userId));
});

app.post("/assessments", (req, res) => {
  const payload = req.body as AssessmentResult;

  const next: AssessmentResult = {
    ...payload,
    id: payload.id ?? `a_${store.assessments.length + 1}`,
    submittedAt: payload.submittedAt ?? new Date().toISOString(),
  };

  store.assessments.push(next);
  store.attempts.push({
    id: `at_${store.attempts.length + 1}`,
    userId: next.learnerId,
    lessonId: store.sessions.find((session) => session.sessionId === next.sessionId)?.lessonId ?? "unknown",
    sessionId: next.sessionId,
    quizScore: next.score,
    submittedAt: next.submittedAt,
  });

  res.status(201).json(next);
});

app.get("/users/:userId/mastery", (req, res) => {
  res.json(store.mastery.filter((item) => item.userId === req.params.userId));
});

app.get("/users/:userId/review-schedule", (req, res) => {
  res.json(store.reviewSchedule.filter((item) => item.userId === req.params.userId));
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
