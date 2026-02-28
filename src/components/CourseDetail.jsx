import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, FileText, Download, Clock, CheckCircle, AlertCircle, Calendar, User, Plus, Zap, X, RotateCcw } from 'lucide-react';
import { clsx } from 'clsx';

const CourseDetail = ({ course, onBack }) => {
    const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'assignments' | 'kanban'
    const [assignments, setAssignments] = useState(course.assignments);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    // Focus Mode State
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(25 * 60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isTimerRunning && timerSeconds > 0) {
            interval = setInterval(() => {
                setTimerSeconds(prev => prev - 1);
            }, 1000);
        } else if (timerSeconds === 0) {
            setIsTimerRunning(false);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timerSeconds]);

    const moveTask = (taskId, newStatus) => {
        setAssignments(prev => prev.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        const newTask = {
            id: Date.now(),
            title: newTaskTitle,
            due: 'Personal',
            status: 'pending',
            type: 'personal'
        };

        setAssignments([newTask, ...assignments]);
        setNewTaskTitle('');
        setIsAddingTask(false);
    };

    const getAssignmentsByStatus = (status) => {
        if (status === 'pending') return assignments.filter(a => a.status === 'pending' || a.status === 'upcoming');
        return assignments.filter(a => a.status === status);
    };

    if (!course) return null;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 animation-fade-in">
            {/* Header / Hero */}
            <header className="bg-slate-900 text-white relative overflow-hidden pb-12">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Dashboard</span>
                        </button>

                        <button
                            onClick={() => setIsFocusMode(true)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all hover:scale-105"
                        >
                            <Zap className="w-4 h-4" />
                            Focus Mode
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
                                {course.code}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">{course.title}</h1>
                            <div className="flex items-center gap-4 text-slate-300">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{course.lecturer}</span>
                                </div>
                                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{course.nextClass}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-xl min-w-[200px]">
                            <p className="text-xs text-slate-400 font-semibold uppercase mb-2">Your Progress</p>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-3xl font-bold">{course.progress}%</span>
                                <span className="text-sm text-slate-400 mb-1">completed</span>
                            </div>
                            <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                                <div style={{ width: `${course.progress}%` }} className="bg-indigo-500 h-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('resources')}
                            className={clsx(
                                "py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                                activeTab === 'resources'
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-slate-500 hover:text-slate-800"
                            )}
                        >
                            <BookOpen className="w-4 h-4" />
                            Resources
                        </button>
                        <button
                            onClick={() => setActiveTab('assignments')}
                            className={clsx(
                                "py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                                activeTab === 'assignments'
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-slate-500 hover:text-slate-800"
                            )}
                        >
                            <FileText className="w-4 h-4" />
                            Assignments
                        </button>
                        <button
                            onClick={() => setActiveTab('kanban')}
                            className={clsx(
                                "py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                                activeTab === 'kanban'
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-slate-500 hover:text-slate-800"
                            )}
                        >
                            <div className="flex items-center gap-1.5 align-middle">
                                <div className="flex gap-0.5">
                                    <div className="w-1 h-3 bg-current opacity-40 rounded-sm"></div>
                                    <div className="w-1 h-3 bg-current opacity-70 rounded-sm"></div>
                                    <div className="w-1 h-3 bg-current rounded-sm"></div>
                                </div>
                                Kanban Board
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* RESOURCES TAB */}
                {activeTab === 'resources' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-display font-semibold">Course Materials</h2>
                            <button className="text-sm text-blue-600 font-medium hover:underline">Download All</button>
                        </div>

                        <div className="grid gap-4">
                            {course.resources.map((resource) => (
                                <div key={resource.id} className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={clsx(
                                            "w-12 h-12 rounded-lg flex items-center justify-center",
                                            resource.type === 'pdf' ? "bg-red-50 text-red-600" :
                                                resource.type === 'image' ? "bg-purple-50 text-purple-600" :
                                                    "bg-slate-100 text-slate-600"
                                        )}>
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{resource.title}</h3>
                                            <p className="text-sm text-slate-500">{resource.date} • {resource.size}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ASSIGNMENTS TAB */}
                {activeTab === 'assignments' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-display font-semibold">Upcoming Tasks</h2>
                        </div>

                        <div className="grid gap-4">
                            {course.assignments.map((assignment) => (
                                <div key={assignment.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-slate-900">{assignment.title}</h3>
                                                <span className={clsx(
                                                    "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                                    assignment.status === 'pending' ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                        assignment.status === 'submitted' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                            "bg-slate-100 text-slate-700 border-slate-200"
                                                )}>
                                                    {assignment.status === 'pending' ? 'Due Soon' :
                                                        assignment.status === 'submitted' ? 'Submitted' : 'Upcoming'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Due {assignment.due}</span>
                                                </div>
                                                {assignment.type === 'exam' && (
                                                    <div className="flex items-center gap-1.5 text-purple-600">
                                                        <AlertCircle className="w-4 h-4" />
                                                        <span>High Priority</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <button className={clsx(
                                            "px-4 py-2 rounded-lg font-medium text-sm transition-colors",
                                            assignment.status === 'pending'
                                                ? "bg-slate-900 text-white hover:bg-slate-800"
                                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                        )}>
                                            {assignment.status === 'pending' ? 'Submit Work' : 'View Submission'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* KANBAN BOARD TAB */}
                {activeTab === 'kanban' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-display font-semibold">Academic Kanban Board</h2>
                            <div className="flex gap-2">
                                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">To-Do</span>
                                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Doing</span>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Done</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* To Do Column */}
                            <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200/60 min-h-[300px]">
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-400"></div> To Do
                                    </div>
                                    <button
                                        onClick={() => setIsAddingTask(!isAddingTask)}
                                        className="text-slate-400 hover:text-blue-600 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </h3>

                                <div className="space-y-3">
                                    {/* Add Task Input */}
                                    {isAddingTask && (
                                        <form onSubmit={handleAddTask} className="bg-white p-3 rounded-lg shadow-sm border border-blue-200 animate-in fade-in zoom-in-95">
                                            <input
                                                autoFocus
                                                type="text"
                                                placeholder="Enter task title..."
                                                className="w-full text-sm border-none focus:ring-0 p-0 placeholder:text-slate-300 font-medium text-slate-700 mb-2"
                                                value={newTaskTitle}
                                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsAddingTask(false)}
                                                    className="text-xs text-slate-400 hover:text-slate-600"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={!newTaskTitle.trim()}
                                                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {getAssignmentsByStatus('pending').map(task => (
                                        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all group">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Pending</span>
                                                <button
                                                    onClick={() => moveTask(task.id, 'in-progress')}
                                                    className="text-slate-400 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-blue-50 p-1.5 rounded-md"
                                                    title="Start Task"
                                                >
                                                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase">
                                                        Start <ArrowLeft className="w-3 h-3 rotate-180" />
                                                    </div>
                                                </button>
                                            </div>
                                            <h4 className="font-semibold text-slate-800 text-sm mb-2">{task.title}</h4>
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <Calendar className="w-3 h-3" />
                                                <span>{task.due}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {getAssignmentsByStatus('pending').length === 0 && (
                                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                                            <p className="text-xs text-slate-400">All caught up!</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Doing Column */}
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/60 min-h-[300px]">
                                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> In Progress
                                </h3>
                                <div className="space-y-3">
                                    {getAssignmentsByStatus('in-progress').map(task => (
                                        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-blue-200 hover:shadow-md transition-all">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
                                                <button
                                                    onClick={() => moveTask(task.id, 'submitted')}
                                                    className="text-slate-400 hover:text-emerald-600 transition-colors bg-slate-50 hover:bg-emerald-50 p-1.5 rounded-md"
                                                    title="Mark as Done"
                                                >
                                                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase">
                                                        Finish <CheckCircle className="w-3 h-3" />
                                                    </div>
                                                </button>
                                            </div>
                                            <h4 className="font-semibold text-slate-800 text-sm mb-2">{task.title}</h4>
                                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                                                <div className="bg-blue-500 w-[60%] h-full animate-pulse"></div>
                                            </div>
                                        </div>
                                    ))}
                                    {getAssignmentsByStatus('in-progress').length === 0 && (
                                        <div className="border-2 border-dashed border-blue-200/50 rounded-lg p-8 text-center">
                                            <p className="text-xs text-blue-400/70">Drag a task here to start</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Done Column */}
                            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/60 min-h-[300px]">
                                <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Completed
                                </h3>
                                <div className="space-y-3">
                                    {getAssignmentsByStatus('submitted').map(task => (
                                        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100 opacity-75 hover:opacity-100 transition-opacity">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" /> Done
                                                </span>
                                            </div>
                                            <h4 className="font-semibold text-slate-800 text-sm mb-1 line-through text-slate-400">{task.title}</h4>
                                        </div>
                                    ))}
                                    {getAssignmentsByStatus('submitted').length === 0 && (
                                        <div className="border-2 border-dashed border-emerald-200/50 rounded-lg p-8 text-center">
                                            <p className="text-xs text-emerald-600/50">Nothing completed yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </main>
            {/* Focus Mode Overlay */}
            {isFocusMode && (
                <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center text-white animate-in fade-in duration-500">
                    <button
                        onClick={() => setIsFocusMode(false)}
                        className="absolute top-8 right-8 p-4 text-slate-500 hover:text-white transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="text-center space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-medium text-slate-400">Focus Mode</h2>
                            <p className="text-lg text-indigo-400 font-display">{course.title}</p>
                        </div>

                        <div className="text-9xl font-bold font-mono tracking-tighter tabular-nums">
                            {String(Math.floor(timerSeconds / 60)).padStart(2, '0')}
                            <span className="text-slate-600">:</span>
                            {String(timerSeconds % 60).padStart(2, '0')}
                        </div>

                        <div className="flex items-center justify-center gap-6">
                            <button
                                onClick={() => setIsTimerRunning(!isTimerRunning)}
                                className={clsx(
                                    "px-8 py-4 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 active:scale-95",
                                    isTimerRunning
                                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                        : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
                                )}
                            >
                                {isTimerRunning ? 'Pause' : 'Start Focus'}
                            </button>
                            <button
                                onClick={() => {
                                    setTimerSeconds(25 * 60);
                                    setIsTimerRunning(false);
                                }}
                                className="p-4 rounded-2xl bg-slate-900 text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                                <RotateCcw className="w-6 h-6" />
                            </button>
                        </div>

                        <p className="text-slate-600 max-w-md mx-auto">
                            "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus."
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CourseDetail;
