import cors from "cors";
import express from "express";
import { DEFAULT_HUMAN_TRAINER_ESCALATION, type AuthRequest } from "@learning-platform/shared";
import { assessmentResults, courses, lessons, modules, sessionState, userProfile } from "./data";

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

  res.json({
    token: "demo-token",
    user: userProfile,
    ssoReadyProviders: ["google", "microsoft", "saml"],
  });
});

app.get("/feature-flags", (_req, res) => {
  res.json({ humanTrainerEscalation: DEFAULT_HUMAN_TRAINER_ESCALATION });
});

app.get("/profile", (_req, res) => {
  res.json(userProfile);
});

app.get("/courses", (_req, res) => {
  res.json(courses);
});

app.get("/modules", (req, res) => {
  const courseId = req.query.courseId as string | undefined;
  res.json(courseId ? modules.filter((item) => item.courseId === courseId) : modules);
});

app.get("/lessons", (req, res) => {
  const moduleId = req.query.moduleId as string | undefined;
  res.json(moduleId ? lessons.filter((item) => item.moduleId === moduleId) : lessons);
});

app.get("/sessions/:sessionId", (_req, res) => {
  res.json(sessionState);
});

app.put("/sessions/:sessionId", (req, res) => {
  sessionState.tutorMessages = req.body.tutorMessages ?? sessionState.tutorMessages;
  res.json(sessionState);
});

app.get("/assessments", (_req, res) => {
  res.json(assessmentResults);
});

app.post("/assessments", (req, res) => {
  assessmentResults.push(req.body);
  res.status(201).json(req.body);
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
