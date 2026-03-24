# CourseFlow (KNUST Edition) - Project Submission Report

## 1. Project Overview
**CourseFlow** is a modern, high-performance web application prototype designed to streamline academic management for both students and lecturers at the Kwame Nkrumah University of Science and Technology (KNUST). The objective of this project was to move away from clunky, outdated university portals and establish a fast, dynamic, and visually engaging Single Page Application (SPA).

## 2. Core Objectives Achieved
1. **Role-Based Access Control:** Implemented domain-level routing that automatically detects whether a user is a student (`@st.knust.edu.gh`) or a lecturer (`@lc.knust.edu.gh`) at the point of login, ensuring secure routing to entirely different dashboard experiences.
2. **Modern User Experience (UX):** Eliminated slow loading times by utilizing React state to handle complex page routing. Engineered a UI utilizing *Glassmorphism* (frosted glass aesthetics, contextual blur) and smooth micro-animations.
3. **Productivity Tooling:** Integrated a native Academic Kanban Board and a Pomodoro Focus Timer directly into the interface to actively assist students in managing their coursework rather than just passively displaying it.

## 3. Key Features Demonstrated

### For Lecturers / Managers:
* **Dashboard Analytics:** A high-level view of all assigned courses, total enrolled students, and overall class performance metrics.
* **Assignment Creation & Tracking:** A full suite to publish assignments (Exam or Project format) instantly to students.
* **Submission Monitoring:** An interactive grading table tracking which students are pending, late, or have submitted their work, complete with simulated grading and reminder dispatches.
* **Broadcast Notices:** The ability to globally publish alerts/notices to all students' feeds.
* **Exam Locator Automation:** A simulated file-upload engine where lecturers can upload a roster (CSV/Excel) to instantly bind students to their exact exam venues and seats.

### For Students:
* **Academic Hub:** A consolidated workflow showing next classes, urgent notices, and completion progress.
* **Interactive Kanban Board:** Students can drag and drop assignments from "To Do" to "In Progress" to "Done", managing both university-assigned tasks and their own custom personal tasks.
* **Focus Mode (Pomodoro):** A distraction-free, full-screen study timer engineered to enhance academic focus.

## 4. Technical Stack & Engineering
The architecture was chosen to prioritize speed, component reusability, and maintainability:

* **Frontend Framework:** React 18 (Hooks, Strict Functional Patterns)
* **Build Engine:** Vite (Chosen for optimized ESBuild compilation delivering sub-second hot module replacement)
* **Styling:** Tailwind CSS v3.4 (Utility-first CSS, custom config mapping, responsive design without writing heavy external CSS files)
* **Data State Management:** The application state is lifted to the root `App.jsx` component acting as a Single Source of Truth, utilizing a JSON structure (`db.json`) as a mock NoSQL document database to simulate network fetching and relational joins between users and courses.

## 5. Future Scalability (Next Steps)
While this prototype perfectly demonstrates the frontend capabilities and structural logic of the application, the architecture is primed for a backend handover. Moving forward, the `db.json` pseudo-database can be swapped out for a Live SQL/NoSQL Database (e.g., PostgreSQL, MongoDB) paired with an Express.js or Django REST JSON API, alongside secure JWT-based authentication.

---
*Developed as a comprehensive Academic Management System Prototype.*
