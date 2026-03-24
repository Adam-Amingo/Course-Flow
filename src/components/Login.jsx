import React, { useState } from 'react';
import { User, ArrowRight, AlertCircle, School } from 'lucide-react';
import { clsx } from 'clsx';
import db from '../api/db.json';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate network delay for "premium" feel
        setTimeout(() => {
            // Domain Logic
            // Domain Logic
            if (email.endsWith('@st.knust.edu.gh')) {
                const student = db.students.find(s => s.email === email);
                if (student) {
                    onLogin({ role: 'student', data: student });
                } else {
                    setError('Student not found. Try aabubakar@st.knust.edu.gh');
                }
            } else if (email.endsWith('@lc.knust.edu.gh')) {
                const lecturer = db.lecturers.find(l => l.email === email);
                if (lecturer) {
                    onLogin({ role: 'lecturer', data: lecturer });
                } else {
                    setError('Lecturer not found. Try linda@lc.knust.edu.gh');
                }
            } else {
                setError('Invalid domain. Use @st.knust.edu.gh for Students or @lc.knust.edu.gh for Lecturers.');
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-slate-200/30 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden z-10 relative">
                <div className="p-8 sm:p-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                            <School className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display tracking-tight">CourseFlow</h1>
                        <p className="text-slate-500 text-sm">Your Central Academic Source of Truth</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Institutional Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="e.g. aabubakar@st.knust.edu.gh"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 text-red-700 border border-red-100 text-sm animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={clsx(
                                "w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-semibold transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600",
                                loading ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5"
                            )}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Access Portal <ArrowRight className="w-5 h-5" />
                                </span>
                            )}
                        </button>
                    </form>
                </div>

                <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                    <span>v1.0.0 KNUST Edition</span>
                    <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium">Students</span>
                        <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded-md font-medium">Lecturers</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
