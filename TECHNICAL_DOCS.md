# CourseFlow - Comprehensive Technical Documentation

This document serves as the complete technical blueprint for the **CourseFlow** architecture. It is written for developers, maintainers, and platform engineers tasked with understanding, maintaining, scaling, or migrating the system.

---

## 1. Technology Stack

CourseFlow adopts a modern, lightweight, and highly dynamic frontend architecture:

*   **Framework:** React 18+ (Strict functional component patterns, Hooks)
*   **Module Bundler:** Vite (Chosen for sub-second hot-module replacement and optimized ESBuild compilation)
*   **Styling Engine:** Tailwind CSS `v3.4`
    *   *Design System:* Utilizes glassmorphism, native color palettes (`slate`, `indigo`, `emerald`), and robust pseudo-class implementations (`group-hover`, `peer-checked`) for deep interactivity without JavaScript overhead.
*   **Iconography:** `lucide-react` (Scalable, tree-shakeable SVG icon components mapped to UI states)
*   **State Management:** Native React hook context lifting (no Redux required for current scope)

---

## 2. Global Architecture & Project Structure

The project conforms to a feature-based separation of concerns:

```text
html/
├── package.json               # Defines dependencies and NPM scripts (dev, build, lint)
├── tailwind.config.js         # Tailwind system tokens (fonts, custom animations)
├── postcss.config.js          # Directs Tailwind plugin compiling
├── vite.config.js             # Bundler configuration
├── index.html                 # Application entry point/mounting DOM node
└── src/
    ├── main.jsx               # React DOM root render
    ├── App.jsx                # Global State Controller & Authentication Router
    ├── index.css              # Global styles and Tailwind directives
    ├── api/
    │   └── db.json            # The Simulated Backend (Entity mappings)
    └── components/
        ├── Login.jsx              # Authentication Gateway
        ├── StudentDashboard.jsx   # Root view for @st.knust students
        ├── CourseDetail.jsx       # Student's Kanban, Resources, and Focus UI
        ├── LecturerDashboard.jsx  # Root view for @lc.knust lecturers
        ├── LecturerCourseView.jsx # Lecturer's coursework and grading manager
        └── CreateNoticeModal.jsx  # Reusable modal for alerts
```

---

## 3. Data Structure & Simulated Backend

The entire application relies on `src/api/db.json` masking as a NoSQL database. 

**3.1. Entity Relationships**
*   **Lecturers:** Master user table (`id`, `name`, `email`, `department`). Bound strictly by email domains (`@lc.knust.edu.gh`).
*   **Students:** Master user table with metadata (`indexNumber`, `program`, `exams`).
*   **Courses:** The central hub holding relational arrays:
    *   `resources[]`: Study materials.
    *   `assignments[]`: Global coursework.
    *   *Foreign Key map:* The `course.lecturer` string acts as a foreign key mapping to the exact `lecturer.name` to orchestrate course ownership.

**3.2. Authentication Check logic (`Login.jsx`)**
Authentication utilizes simulated network lag (`setTimeout`). It performs a RegEx/String check on domain extensions:
*   If `@st.knust.edu.gh`: Reads `db.students`. 
*   If `@lc.knust.edu.gh`: Reads `db.lecturers`. 

---

## 4. State Management and Data Flow

Because this is a standalone frontend prototype, **App.jsx** serves as the Single Source of Truth for mutable data.

### Component Routing
`activeView` state toggles view rendering without triggering hard browser reloads or utilizing `react-router-dom`:
```javascript
// App.jsx Pseudo-logic
if (!user) return <Login onLogin={handleLogin} />
if (user.role === 'student' && activeView === 'course-detail') return <CourseDetail/>
if (user.role === 'lecturer' && activeView === 'course-detail') return <LecturerCourseView/>
```

### Lifting State via Callbacks
When a lecturer creates a new assignment, it is pushed to the central `courses` array hosted in `App.jsx`, immediately pushing the update down to the `StudentDashboard.jsx` components where it appears sequentially as a "Pending" Kanban task.

```javascript
// App.jsx Assignment Handler
const handleAddAssignment = (courseId, newAssignment) => {
    setCourses(prev => prev.map(course => {
        if (course.id === courseId) {
            return { ...course, assignments: [newAssignment, ...course.assignments] };
        }
        return course;
    }));
};
```

---

## 5. UI/UX Features of Note

1. **Academic Kanban Board:** Converts flat arrays of assignments into dynamic lane statuses using a fast array filtering loop (`getAssignmentsByStatus('in-progress')`). Task state mutations are locally managed maps simulating drag-and-drop triggers.
2. **Focus Mode (Pomodoro Engine):** Uses `setInterval` hooks bound to `timerSeconds` state inside an absolute screen overlay logic, providing an isolated, full-screen HUD for studying.
3. **Exam Locator Orchestrator:** Simulated via local File Input handlers and progressive `setTimeout` timeouts dictating upload progress bars in the `LecturerDashboard.jsx`.

---

## 6. Going to Production (Backend Integration Scale-Up)

When transitioning to a real backend architecture (Node/Express, Django, or Supabase), the following surgical changes must occur:

1. **Remove `db.json` Imports:** 
   Strip out `import db from './api/db.json';` completely.
2. **Implement Fetch/Axios Actions:**
   Convert initialization states passing via props into asynchronous API invocations.
   ```javascript
   // Replace initial state
   // const [courses, setCourses] = useState(db.courses);
   
   // With Effect hook
   const [courses, setCourses] = useState([]);
   useEffect(() => {
     axios.get('/api/v1/courses').then(res => setCourses(res.data));
   }, [])
   ```
3. **Handle JWT Authentication:** Refactor `Login.jsx` to dispatch credentials via POST, securing an encrypted Bearer token to local browser storage, and deriving the user role securely from the verified token payload.

---

## 7. Developer Scripts

To utilize this environment locally, the standard commands apply:

*   **`npm run dev`**: Spawns the Vite local developer server (Default Port `3001` or `5173`) with HMR.
*   **`npm run build`**: Compiles absolute production-ready output files inside `/dist`, minifying React into vanilla chunks mapping to `index.html`.
*   **`npm run lint`**: Analyzes the codebase against React hook compliance standards.
