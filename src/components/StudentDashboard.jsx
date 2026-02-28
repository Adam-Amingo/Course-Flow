import React from 'react';
import { Search, MapPin, Calendar, Clock, BarChart3, LogOut, BookOpen, AlertCircle, ArrowRight, FileText } from 'lucide-react';
import { clsx } from 'clsx';

const StudentDashboard = ({ user, notices, courses, onSelectCourse, onLogout }) => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold font-display shadow-md">
                                CF
                            </div>
                            <span className="font-display font-bold text-xl text-slate-800 tracking-tight">CourseFlow</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                                <p className="text-xs text-slate-500 font-mono">{user.indexNumber}</p>
                            </div>
                            <button
                                onClick={onLogout}
                                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-red-600 transition-colors"
                                title="Log Out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Welcome Section */}
                <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-12 text-white shadow-xl">
                    <div className="relative z-10">
                        <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3">Welcome back, {user.name.split(' ')[0]}</h1>
                        <p className="text-blue-100 text-lg max-w-xl">You have <span className="font-semibold text-white">2 upcoming exams</span> this week. Stay focused.</p>
                    </div>

                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
                </header>

                {/* Productivity & Notices Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Upcoming Deadlines Widget */}
                    <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                Upcoming Deadlines
                            </h2>
                            <span className="text-sm font-medium text-slate-500">Next 7 Days</span>
                        </div>

                        <div className="space-y-4">
                            {courses.flatMap(c => c.assignments.map(a => ({ ...a, courseCode: c.code, courseColor: 'bg-blue-600' })))
                                .filter(a => a.status === 'pending' || a.status === 'upcoming')
                                .sort((a, b) => new Date(a.due) - new Date(b.due))
                                .slice(0, 3)
                                .map((assignment, idx) => (
                                    <div key={idx} className="flex items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 transition-all group">
                                        <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center text-xs font-bold shadow-sm mr-4 group-hover:border-blue-400 group-hover:text-blue-600 transition-colors">
                                            <span className="uppercase text-slate-400 text-[10px] group-hover:text-blue-400">{assignment.due.split('-')[1]}</span>
                                            <span className="text-lg">{assignment.due.split('-')[2]}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{assignment.title}</h3>
                                                <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">{assignment.courseCode}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                                {assignment.type === 'exam' ? <AlertCircle className="w-3 h-3 text-purple-500" /> : <FileText className="w-3 h-3" />}
                                                {assignment.type === 'exam' ? 'Exam' : 'Assignment'} • Due at 11:59 PM
                                            </p>
                                        </div>
                                        <button className="ml-4 p-2 text-slate-300 hover:text-blue-600 transition-colors">
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}

                            {courses.flatMap(c => c.assignments).filter(a => a.status === 'pending').length === 0 && (
                                <div className="text-center py-8 text-slate-400">
                                    <p>No upcoming deadlines! 🎉</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notices / Alerts */}
                    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-amber-400" />
                                Notice Board
                            </h2>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {(!notices || notices.length === 0) ? (
                                    <p className="text-slate-500 text-sm text-center py-4">No recent notices.</p>
                                ) : (
                                    notices.map((notice) => (
                                        <div
                                            key={notice.id}
                                            className={clsx(
                                                "p-4 rounded-xl backdrop-blur-sm border transition-colors cursor-pointer",
                                                notice.type === 'urgent'
                                                    ? "bg-amber-900/20 border-amber-500/30 hover:bg-amber-900/30"
                                                    : "bg-white/5 border-white/5 hover:bg-white/10"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-1 h-fit">
                                                <span className={clsx(
                                                    "text-xs font-bold uppercase tracking-wider",
                                                    notice.type === 'urgent' ? "text-amber-400" : "text-blue-300"
                                                )}>
                                                    {notice.type === 'urgent' ? 'Urgent' : 'Info'}
                                                </span>
                                                <span className="text-xs text-slate-400">{notice.date}</span>
                                            </div>
                                            <h3 className="font-semibold text-sm mb-1">{notice.title}</h3>
                                            <p className="text-sm text-slate-300 line-clamp-2">{notice.message}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* My Courses Grid */}
                <section>
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-2xl font-display font-bold text-slate-800 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-slate-400" />
                            My Courses
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses && courses.map((course) => (
                            <div
                                key={course.id}
                                onClick={() => onSelectCourse(course.id)}
                                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>

                                <div className="relative z-10">
                                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {course.code}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{course.title}</h3>
                                    <p className="text-sm text-slate-500 mb-6">{course.lecturer}</p>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-semibold">
                                            <span className="text-slate-400">Progress</span>
                                            <span className="text-blue-600">{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                            <div
                                                style={{ width: `${course.progress}%` }}
                                                className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Exam Locator Section */}
                <section>
                    <h2 className="text-2xl font-display font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Search className="w-6 h-6 text-slate-400" />
                        Exam Locator
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {user.exams && user.exams.map((exam, idx) => (
                            <div key={idx} className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <BookOpen className="w-24 h-24 text-blue-600" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{exam.code}</h3>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                End of Semester
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-display font-bold text-blue-600">{exam.seat}</p>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Seat No</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-semibold uppercase">Venue</p>
                                                <p className="text-sm font-medium text-slate-900">{exam.venue}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                                <Clock className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-semibold uppercase">Time</p>
                                                <p className="text-sm font-medium text-slate-900">{exam.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default StudentDashboard;
