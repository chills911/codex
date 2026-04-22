import { useMemo, useState } from "react";
import {
  DEFAULT_HUMAN_TRAINER_ESCALATION,
  type Course,
  type SessionState,
  type TutorMessage,
} from "@learning-platform/shared";

const courses: Course[] = [
  {
    id: "c_aus_1",
    title: "Australian Standards Essentials",
    track: "Australian Standards",
    description: "Read standards, apply symbols, and maintain line hierarchy across drawings.",
  },
  {
    id: "c_mr_1",
    title: "Main Roads Style Fundamentals",
    track: "Main Roads style",
    description: "Interpret Main Roads drafting style with consistent dimensions and annotation patterns.",
  },
];

const initialSession: SessionState = {
  sessionId: "s_1",
  learnerId: "u_1",
  lessonId: "l_1",
  sourceExcerpt:
    "AS references require clear line hierarchy and annotation consistency to reduce interpretation risk.",
  tutorMessages: [
    {
      role: "tutor",
      text: "Read the excerpt and explain why line hierarchy matters to a reviewer.",
      createdAt: new Date().toISOString(),
    },
  ],
  quizItems: [
    {
      id: "q_1",
      prompt: "Which control most improves readability in this context?",
      choices: ["Line hierarchy", "Arbitrary symbols", "No annotations"],
      answer: "Line hierarchy",
    },
  ],
  humanTrainerEscalationEnabled: DEFAULT_HUMAN_TRAINER_ESCALATION,
  updatedAt: new Date().toISOString(),
};

export function App() {
  const [email, setEmail] = useState("learner@example.com");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<TutorMessage[]>(initialSession.tutorMessages);
  const [draftMessage, setDraftMessage] = useState("");

  const groupedCourses = useMemo(
    () =>
      courses.reduce<Record<string, Course[]>>((acc, course) => {
        acc[course.track] = acc[course.track] ?? [];
        acc[course.track].push(course);
        return acc;
      }, {}),
    [],
  );

  const sendMessage = () => {
    if (!draftMessage.trim()) {
      return;
    }

    setMessages((current) => [
      ...current,
      { role: "learner", text: draftMessage.trim(), createdAt: new Date().toISOString() },
    ]);
    setDraftMessage("");
  };

  return (
    <main style={{ fontFamily: "Inter, Arial, sans-serif", margin: "0 auto", maxWidth: 1200, padding: 20 }}>
      <h1>Standards Learning Workspace</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Learner authentication</h2>
        <p>Email/password with an SSO-ready interface.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input aria-label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input
            aria-label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="button">Sign in</button>
          <button type="button">Continue with Google</button>
          <button type="button">Continue with Microsoft</button>
          <button type="button">Continue with SAML</button>
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Course library</h2>
        {Object.entries(groupedCourses).map(([track, trackCourses]) => (
          <article key={track}>
            <h3>{track}</h3>
            <ul>
              {trackCourses.map((course) => (
                <li key={course.id}>
                  <strong>{course.title}</strong>: {course.description}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section>
        <h2>Learning session</h2>
        <p>
          Human trainer escalation flag: <strong>{String(initialSession.humanTrainerEscalationEnabled)}</strong>
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <article style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12 }}>
            <h3>Source excerpt</h3>
            <p>{initialSession.sourceExcerpt}</p>
          </article>

          <article style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12 }}>
            <h3>AI tutor chat</h3>
            {messages.map((message, index) => (
              <p key={`${message.createdAt}-${index}`}>
                <strong>{message.role}:</strong> {message.text}
              </p>
            ))}
            <div style={{ display: "flex", gap: 8 }}>
              <input
                aria-label="Chat message"
                placeholder="Ask the tutor..."
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
              />
              <button type="button" onClick={sendMessage}>
                Send
              </button>
            </div>
          </article>

          <article style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12 }}>
            <h3>Quiz</h3>
            {initialSession.quizItems.map((item) => (
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
    </main>
  );
}
