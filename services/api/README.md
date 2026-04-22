# API service (`services/api`)

Express API for learner auth, course graph, active sessions, assessments, and learner progress state.

## Endpoints

- `POST /auth/login` (email/password and provider-aware login)
- `POST /auth/sso/init` (SSO-ready auth handoff)
- `GET /feature-flags` (human trainer escalation defaults OFF)
- `GET /users/:userId/profile`
- `GET /courses`
- `GET /courses/:courseId/modules`
- `GET /modules/:moduleId/lessons`
- `GET /sessions/:sessionId`
- `PUT /sessions/:sessionId`
- `GET /users/:userId/assessments`
- `POST /assessments`
- `GET /users/:userId/mastery`
- `GET /users/:userId/review-schedule`
