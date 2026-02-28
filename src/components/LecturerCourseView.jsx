import React, { useState } from 'react';
import { ArrowLeft, Plus, Calendar, CheckCircle, FileText, AlertCircle, X, Save } from 'lucide-react';
import { clsx } from 'clsx';
import db from '../api/db.json';

const LecturerCourseView = ({ course, onBack, onAddAssignment }) => {
    const [isAddingMode, setIsAddingMode] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newType, setNewType] = useState('project'); // project | exam
    const [newDueDate, setNewDueDate] = useState('');

    const handleSaveAssignment = (e) => {
        e.preventDefault();
        if (!newTitle || !newDueDate) return;

        const newAssignment = {
            id: Date.now(),
            title: newTitle,
            due: newDueDate,
            type: newType,
            status: 'pending' // Default for students
        };

        onAddAssignment(course.id, newAssignment);

        // Reset and close
        setNewTitle('');
        setNewDueDate('');
        setIsAddingMode(false);
    };
    if (!course) return null;

    return (
        <div className="min-h-screen bg-slate-900 font-sans text-slate-100">
            {/* Context Header */}
            <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold font-display text-white">{course.title}</h1>
                        <div className="flex gap-2 text-xs text-slate-500">
                            <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">{course.code}</span>
                            <span>Manager View</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-8 space-y-8">

                {/* Actions Bar */}
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-display font-bold text-white mb-2">Assignment Management</h2>
                        <p className="text-slate-400">Create tasks for students. These will appear on their Kanban boards.</p>
                    </div>
                    <button
                        onClick={() => setIsAddingMode(true)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Create Assignment
                    </button>
                </div>

                {/* Add Assignment Form (Inline) */}
                {isAddingMode && (
                    <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6 animate-in slide-in-from-top-4 fade-in duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                New Assignment Details
                            </h3>
                            <button onClick={() => setIsAddingMode(false)} className="text-slate-500 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveAssignment} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Assignment Title</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., Final Project Proposal"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Due Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                        value={newDueDate}
                                        onChange={(e) => setNewDueDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Assignment Type</label>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setNewType('project')}
                                        className={clsx(
                                            "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2",
                                            newType === 'project'
                                                ? "bg-indigo-600 border-indigo-500 text-white"
                                                : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                                        )}
                                    >
                                        <FileText className="w-4 h-4" /> Project / Homework
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewType('exam')}
                                        className={clsx(
                                            "flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2",
                                            newType === 'exam'
                                                ? "bg-purple-600 border-purple-500 text-white"
                                                : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                                        )}
                                    >
                                        <AlertCircle className="w-4 h-4" /> Exam / Quiz
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-slate-700/50">
                                <button
                                    type="button"
                                    onClick={() => setIsAddingMode(false)}
                                    className="px-6 py-2.5 text-slate-400 hover:text-white mr-4 text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all hover:translate-y-[-1px]"
                                >
                                    <Save className="w-4 h-4" />
                                    Publish Assignment
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Existing Assignments List */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        Active Assignments
                        <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full text-xs">{course.assignments.length}</span>
                    </h3>

                    <div className="grid gap-4">
                        {course.assignments.length === 0 ? (
                            <div className="p-12 border-2 border-dashed border-slate-800 rounded-2xl text-center">
                                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-slate-600" />
                                </div>
                                <h4 className="text-slate-300 font-medium">No assignments yet</h4>
                                <p className="text-slate-500 text-sm mt-1">Create one to get started.</p>
                            </div>
                        ) : (
                            course.assignments.map(assignment => (
                                <AssignmentCard key={assignment.id} assignment={assignment} />
                            ))
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
};

// Sub-component for individual assignment card with submission details
const AssignmentCard = ({ assignment }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Dynamic submission data based on real students
    const mockSubmissions = db.students.map((student, index) => {
        // Deterministic pseudo-random status based on student ID + assignment ID
        // This ensures the same student always has the same "status" for a given assignment without real backend
        const statuses = ['submitted', 'pending', 'late', 'submitted', 'submitted'];
        const seed = student.id.charCodeAt(0) + assignment.id.toString().charCodeAt(0) + index;
        const status = statuses[seed % statuses.length];

        return {
            student: student.name,
            status: status,
            grade: status === 'submitted' ? `${85 + (seed % 15)}%` : '-',
            submittedDate: status === 'submitted' ? 'Mar 14' : '-'
        };
    });

    // Calculate Stats
    const totalStudents = mockSubmissions.length;
    const submittedCount = mockSubmissions.filter(s => s.status === 'submitted').length;
    const progressPercentage = Math.round((submittedCount / totalStudents) * 100);

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden transition-all hover:border-indigo-500/30 group">
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-700/30 transition-colors"
            >
                <div className="flex items-center gap-5">
                    {/* Icon & Progress Circle */}
                    <div className="relative">
                        <svg className="w-14 h-14 -rotate-90 transform text-slate-700" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke={assignment.type === 'exam' ? '#a855f7' : '#6366f1'} strokeWidth="8" strokeDasharray={`${progressPercentage * 2.8} 280`} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            {assignment.type === 'exam' ? <AlertCircle className="w-5 h-5 text-purple-400" /> : <FileText className="w-5 h-5 text-indigo-400" />}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white text-lg">{assignment.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                            <div className="flex items-center gap-1.5 bg-slate-900/50 px-2 py-1 rounded">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Due: {assignment.due}</span>
                            </div>
                            <div className="text-slate-500">
                                <span className={clsx("font-bold", progressPercentage === 100 ? "text-emerald-400" : "text-slate-300")}>{submittedCount}</span>/{totalStudents} Submitted
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Mini Avatars Mock */}
                    <div className="flex -space-x-2">
                        {mockSubmissions.slice(0, 3).map((s, i) => (
                            <div key={i} className={clsx("w-8 h-8 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold text-white", ["bg-indigo-500", "bg-purple-500", "bg-emerald-500"][i])}>
                                {s.student.charAt(0)}
                            </div>
                        ))}
                        {totalStudents > 3 && (
                            <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-xs text-white">
                                +{totalStudents - 3}
                            </div>
                        )}
                    </div>

                    <div className="text-right">
                        <span className={clsx(
                            "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-1",
                            assignment.type === 'exam' ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        )}>
                            {assignment.type}
                        </span>
                    </div>
                </div>
            </div>

            {/* Expanded Submissions View */}
            {isExpanded && (
                <div className="border-t border-slate-700 bg-slate-900/50 p-6 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Student Progress</h5>
                        <div className="flex gap-2 text-xs">
                            <span className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> On Track
                            </span>
                            <span className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Needs Attention
                            </span>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-700 shadow-xl">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-800/80 text-slate-400 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Student Name</th>
                                    <th className="px-6 py-4">Submission Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Grade</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                                {mockSubmissions.map((sub, idx) => (
                                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-slate-200 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                                {sub.student.charAt(0)}
                                            </div>
                                            {sub.student}
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 font-mono text-xs">{sub.submittedDate}</td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                "px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit",
                                                sub.status === 'submitted' && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                                                sub.status === 'pending' && "bg-slate-500/10 text-slate-400 border-slate-500/20",
                                                sub.status === 'late' && "bg-rose-500/10 text-rose-400 border-rose-500/20",
                                            )}>
                                                {sub.status === 'submitted' && <CheckCircle className="w-3 h-3" />}
                                                {sub.status === 'late' && <AlertCircle className="w-3 h-3" />}
                                                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-slate-300 font-bold">
                                            {sub.grade !== '-' ? <span className="text-emerald-400">{sub.grade}</span> : <span className="text-slate-600">-</span>}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {sub.status === 'submitted' ? (
                                                <button className="text-xs font-medium text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-all">
                                                    Grade Report
                                                </button>
                                            ) : (
                                                <button className="text-xs font-medium text-slate-500 hover:text-slate-300 px-3 py-1.5 transition-colors">
                                                    Remind
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LecturerCourseView;
