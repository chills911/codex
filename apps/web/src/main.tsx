import React from "react";
import { createRoot } from "react-dom/client";
import { DEFAULT_HUMAN_TRAINER_ESCALATION, type Course, type SessionState } from "@learning-platform/shared";

const demoCourses: Course[] = [
  { id: "c1", title: "Australian Standards Essentials", track: "Australian Standards", moduleCount: 2 },
  { id: "c2", title: "Main Roads Style Fundamentals", track: "Main Roads style", moduleCount: 2 },
];

const demoSession: SessionState = {
  sessionId: "s1",
  lessonId: "l1",
  sourceExcerpt:
    "AS references require clear line hierarchy and annotation consistency to reduce interpretation risk.",
  tutorMessages: [
    { role: "tutor", text: "Start by summarising the key rule in your own words." },
    { role: "learner", text: "Use consistent line hierarchy and labels." },
  ],
  quizItems: [
    {
      id: "q1",
      prompt: "What is a key readability control?",
      choices: ["Consistent line hierarchy", "Random symbol variation", "Dense notes"],
    },
  ],
  humanTrainerEscalationEnabled: DEFAULT_HUMAN_TRAINER_ESCALATION,
};

function App() {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", padding: 20 }}>
      <h1>Standards Learning Workspace</h1>

      <section>
        <h2>Learner Authentication</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input placeholder="Email" />
          <input placeholder="Password" type="password" />
          <button>Sign in</button>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button>Continue with Google</button>
          <button>Continue with Microsoft</button>
          <button>Continue with SAML</button>
        </div>
      </section>

      <section>
        <h2>Course Library</h2>
        <ul>
          {demoCourses.map((course) => (
            <li key={course.id}>
              <strong>{course.title}</strong> — {course.track} ({course.moduleCount} modules)
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Learning Session</h2>
        <p>
          Human trainer escalation feature flag: <strong>{String(demoSession.humanTrainerEscalationEnabled)}</strong>
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <article style={{ border: "1px solid #ccc", padding: 12 }}>
            <h3>Source Excerpt</h3>
            <p>{demoSession.sourceExcerpt}</p>
          </article>
          <article style={{ border: "1px solid #ccc", padding: 12 }}>
            <h3>AI Tutor Chat</h3>
            {demoSession.tutorMessages.map((message, index) => (
              <p key={index}>
                <strong>{message.role}:</strong> {message.text}
              </p>
            ))}
          </article>
          <article style={{ border: "1px solid #ccc", padding: 12 }}>
            <h3>Quiz</h3>
            {demoSession.quizItems.map((item) => (
              <div key={item.id}>
                <p>{item.prompt}</p>
                <ul>
                  {item.choices.map((choice) => (
                    <li key={choice}>{choice}</li>
                  ))}
                </ul>
              </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
