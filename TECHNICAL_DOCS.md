# CourseFlow Technical Documentation

This document provides a technical overview of the CourseFlow application. It covers the core architecture, data management, environment setup, and how to extend the application's functionality.

---

## 1. Tech Stack Overview

CourseFlow is a modern single-page application built around performance and visual excellence:
*   **Core:** React 18, utilizing modern function components and Hooks (`useState`, `useEffect`).
*   **Build Tool:** Vite, configured for blazing fast Hot Module Replacement (HMR) and optimized production builds.
*   **Styling:** Vanilla Tailwind CSS (`v3.4`) layered upon custom PostCSS configs stringing standard utility classes into complex interfaces (Glassmorphism, contextual blur, and gradient animations).
*   **Icons:** Lucide React (`lucide-react`) for consistent, scalable SVG iconography.
*   **Routing & State:** The application is entirely client-side. Global state currently orchestrates view rendering inside `App.jsx` dynamically, acting as a lightweight Router.

---

## 2. Global Architecture and Component Tree

The main entry point is `src/main.jsx` mapping to `index.html`. 

`App.jsx` handles global state orchestration:
```text
<App>
  ├─ <Login>
  ├─ <StudentDashboard> (Role === 'student')
  │    ├─ <CourseDetail> (activeView === 'course-detail')
  │    │    ├─ Kanban Board & Pomodoro Focus Timer
  │    └─ Dashboard Overview
  │
  └─ <LecturerDashboard> (Role === 'lecturer')
       ├─ <LecturerCourseView> (activeView === 'course-detail')
       │    ├─ Assignment Creation Form
       │    └─ Submission Tracking Data Table
       └─ <CreateNoticeModal>
```
*Routing is completely managed by `useState` hooks monitoring `user` roles and `activeView` states.*

---

## 3. Data Structure (src/api/db.json)

The application simulates a backend using a JSON static file (`db.json`) directly imported into components. It initializes state arrays that mimic a relational DB.

**Mock Relational Entities:**
1.  **Lecturers:** Defines the authentication accounts for teaching staff (`id`, `name`, `email`).
2.  **Courses:** Defines metadata for courses, but also importantly embeds sub-schemas for **Resources** (PDFs, images) and **Assignments**.
    *   *Note:* The `lecturer` field in a Course strictly binds to `lecturer.name` or `lecturer.email` to determine ownership.
3.  **Students:** Defines the authentication accounts for student bodies alongside their Index Numbers and exam scheduling metadata.

**Authentication Workflow:**
```javascript
// Located in Login.jsx
const lecturer = db.lecturers.find(l => l.email === email);
if(lecturer) onLogin({ role: 'lecturer', data: lecturer });
```

---

## 4. State Management and Hydration

Since there is no live API backend (e.g., Node.js or Django), global data mutation happens via React state lifting in `App.jsx`.

**Adding Assignments (Lifting State Up):**
When a Lecturer creates an assignment in `<LecturerCourseView>`, it calls `onAddAssignment`—a callback passed down from global context.
The callback finds the matched course by ID in the `courses` array state and spreads a new assignment object into its `assignments` array. 
*Note: Because this is held in ephemeral React State, resetting the page will wipe out new assignments back to the `db.json` defaults.*

**Submission Tracking Mock Logic:**
Currently, when a Lecturer expands an assignment card, the backend "submissions" are simulated deterministically using the hash seed of `student.id` + `assignment.id`. This provides a stable UI to test filtering and grading visuals before weaving in an actual database.

---

## 5. Deployment Basics

To deploy this statically (since data is bundled JSON):
1.  Run `npm run build` in the terminal to invoke Vite's optimizer.
2.  A `dist/` directory will be generated containing the optimized bundle, CSS, and asset mapping.
3.  Upload the `dist/` folder directly to services like Vercel, Netlify, Github Pages, or a standard Apache remote.

**Warning for Production:** 
For a complete system, `db.json` logic should be extracted and rewritten using a RESTful pattern across `fetc API` invoking a remote SQL/NoSQL Database. Then handle JWT Auth inside `Login.jsx`.
