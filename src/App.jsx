import React, { useState } from 'react';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import LecturerDashboard from './components/LecturerDashboard';
import CourseDetail from './components/CourseDetail';
import LecturerCourseView from './components/LecturerCourseView';
import db from './api/db.json';

// Initial Mock Data
const INITIAL_NOTICES = [
    { id: 1, title: 'CS102 Lecture shifted', message: 'Moved to Hall C due to maintenance.', type: 'urgent', date: '2h ago' },
    { id: 2, title: 'Exam Registration', message: 'Closes on Friday. Please ensure you are enrolled.', type: 'info', date: '1d ago' },
];

function App() {
    const [user, setUser] = useState(null);
    const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'course-detail'
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState(db.courses); // Lifted state
    const [notices, setNotices] = useState(INITIAL_NOTICES);

    const handleLogin = (userData) => {
        setUser(userData);
        setActiveView('dashboard');
    };

    const handleLogout = () => {
        setUser(null);
        setSelectedCourse(null);
        setActiveView('dashboard');
    };

    const handlePostNotice = (newNotice) => {
        setNotices([newNotice, ...notices]);
    };

    const handleSelectCourse = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        setSelectedCourse(course);
        setActiveView('course-detail');
    };

    const handleBackToDashboard = () => {
        setSelectedCourse(null);
        setActiveView('dashboard');
    };

    // Lecturer Actions
    const handleAddAssignment = (courseId, newAssignment) => {
        setCourses(prevCourses => prevCourses.map(course => {
            if (course.id === courseId) {
                return {
                    ...course,
                    assignments: [newAssignment, ...course.assignments]
                };
            }
            return course;
        }));
    };

    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    // Student View Routing
    if (user.role === 'student' && activeView === 'course-detail' && selectedCourse) {
        // Find the latest version of the selected course from state
        const currentCourse = courses.find(c => c.id === selectedCourse.id);
        return <CourseDetail course={currentCourse} onBack={handleBackToDashboard} />;
    }

    // Lecturer View Routing
    if (user.role === 'lecturer' && activeView === 'course-detail' && selectedCourse) {
        // Find the latest version of the selected course from state
        const currentCourse = courses.find(c => c.id === selectedCourse.id);
        return (
            <LecturerCourseView
                course={currentCourse}
                onBack={handleBackToDashboard}
                onAddAssignment={handleAddAssignment}
            />
        );
    }

    return user.role === 'student'
        ? <StudentDashboard
            user={user.data}
            notices={notices}
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onLogout={handleLogout}
        />
        : <LecturerDashboard
            user={user}
            notices={notices}
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onPostNotice={handlePostNotice}
            onLogout={handleLogout}
        />;
}

export default App;
