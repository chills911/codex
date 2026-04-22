# API service (`services/api`)

Express API that provides learner auth, profile, courses/modules/lessons, session state, and assessment endpoints.

## Endpoints

- `POST /auth/login`
- `GET /feature-flags`
- `GET /profile`
- `GET /courses`
- `GET /modules?courseId=...`
- `GET /lessons?moduleId=...`
- `GET /sessions/:sessionId`
- `PUT /sessions/:sessionId`
- `GET /assessments`
- `POST /assessments`
