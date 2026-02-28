import React, { useState } from 'react';
import { LogOut, Users, FileText, Bell, Plus, Settings, Search } from 'lucide-react';
import CreateNoticeModal from './CreateNoticeModal';
import { clsx } from 'clsx';

const LecturerDashboard = ({ user, notices, courses, onSelectCourse, onPostNotice, onLogout }) => {
    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-900 font-sans text-slate-100 selection:bg-indigo-500 selection:text-white">
            <div className="flex h-screen overflow-hidden">

                {/* Sidebar */}
                <aside className="w-64 bg-slate-950 border-r border-slate-800 hidden md:flex flex-col">
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-white mb-8">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold font-display shadow-lg shadow-indigo-500/20">
                                CF
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight">Lecturer</span>
                        </div>

                        <nav className="space-y-1">
                            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors">
                                <Users className="w-4 h-4 text-indigo-400" />
                                Overview
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-900 hover:text-white rounded-lg text-sm font-medium transition-colors">
                                <FileText className="w-4 h-4" />
                                Coursework
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-900 hover:text-white rounded-lg text-sm font-medium transition-colors">
                                <Bell className="w-4 h-4" />
                                Announcements
                            </a>
                        </nav>
                    </div>

                    <div className="mt-auto p-6 border-t border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-900/50 flex items-center justify-center border border-indigo-500/30">
                                <span className="font-semibold text-xs text-indigo-300">EC</span>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{user.data.name}</p>
                                <p className="text-xs text-slate-500 truncate">{user.data.department}</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    {/* Header */}
                    <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-20 px-8 py-4 flex justify-between items-center">
                        <h1 className="text-lg font-display font-semibold text-white">Dashboard Overview</h1>
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-slate-400 hover:text-white transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border border-slate-900"></span>
                            </button>
                            <div className="h-6 w-px bg-slate-800 mx-2"></div>
                            <button
                                onClick={onLogout}
                                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    </header>

                    <div className="p-8 max-w-7xl mx-auto space-y-8">

                        {/* Teaching Courses Grid */}
                        <section>
                            <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
                                <Users className="w-6 h-6 text-indigo-400" />
                                My Teaching Courses
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Dynamic Course Cards */}
                                {courses && courses.filter(c => c.lecturer === user.data.name).map(course => (
                                    <div
                                        key={course.id}
                                        onClick={() => onSelectCourse(course.id)}
                                        className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800 hover:border-indigo-500/30 transition-all cursor-pointer group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors"></div>

                                        <div className="relative z-10">
                                            <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-xs font-semibold mb-4">
                                                {course.code}
                                            </span>
                                            <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                                            <p className="text-sm text-slate-400 mb-6 flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                {course.progress}% Course Completion
                                            </p>

                                            <div className="flex items-center gap-4 border-t border-slate-700/50 pt-4 mt-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-500">Next Class</span>
                                                    <span className="text-sm font-medium text-slate-300">{course.nextClass?.split(' @')[0] || 'TBA'}</span>
                                                </div>
                                                <div className="h-8 w-px bg-slate-700/50"></div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-500">Students</span>
                                                    <span className="text-sm font-medium text-slate-300">142</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Post Notice Action Card */}
                                <button
                                    onClick={() => setIsNoticeModalOpen(true)}
                                    className="p-6 border border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:bg-slate-800/50 hover:text-indigo-400 hover:border-indigo-500/50 transition-all group min-h-[240px]"
                                >
                                    <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-indigo-500/10 transition-colors shadow-lg">
                                        <Bell className="w-6 h-6" />
                                    </div>
                                    <span className="font-semibold text-lg">Broadcast Notice</span>
                                    <span className="text-sm opacity-70 mt-1">Send alerts to all students</span>
                                </button>
                            </div>
                        </section>

                        {/* Class Progress */}
                        <section>
                            <h2 className="text-lg font-display font-semibold text-white mb-6">Class Performance</h2>
                            <div className="bg-slate-800/50 border border-slate-800/50 rounded-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-slate-400">
                                        <thead className="bg-slate-900/50 uppercase tracking-wider text-xs font-semibold text-slate-500">
                                            <tr>
                                                <th className="px-6 py-4">Student Name</th>
                                                <th className="px-6 py-4">Index No</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 text-right">Progress</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            <tr className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-4 font-medium text-white">Alex Carter</td>
                                                <td className="px-6 py-4 font-mono text-slate-500">INDEX-2024-001</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                        On Track
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-medium text-white">92%</td>
                                            </tr>
                                            <tr className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-4 font-medium text-white">Sarah Miller</td>
                                                <td className="px-6 py-4 font-mono text-slate-500">INDEX-2024-002</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                        Review Needed
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-medium text-white">74%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                <CreateNoticeModal
                    isOpen={isNoticeModalOpen}
                    onClose={() => setIsNoticeModalOpen(false)}
                    onPost={onPostNotice}
                />
            </div>
        </div>
    );
};

export default LecturerDashboard;
