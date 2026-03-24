import React, { useState } from 'react';
import { X, AlertCircle, Info, Check, Send } from 'lucide-react';
import { clsx } from 'clsx';

const CreateNoticeModal = ({ isOpen, onClose, onPost }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('info'); // 'urgent' | 'info'
    const [target, setTarget] = useState('all');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onPost({
            id: Date.now(), // Mock ID
            title,
            message,
            type,
            target,
            date: 'Just now',
        });
        // Reset form
        setTitle('');
        setMessage('');
        setType('info');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h2 className="text-xl font-display font-bold text-slate-800">Post New Notice</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Priority Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setType('info')}
                            className={clsx(
                                "flex items-center justify-center gap-2 p-3 rounded-xl border transition-all",
                                type === 'info'
                                    ? "bg-blue-50 border-blue-200 text-blue-700 ring-2 ring-blue-500/20"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            <Info className="w-4 h-4" />
                            <span className="font-medium">General Info</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('urgent')}
                            className={clsx(
                                "flex items-center justify-center gap-2 p-3 rounded-xl border transition-all",
                                type === 'urgent'
                                    ? "bg-amber-50 border-amber-200 text-amber-700 ring-2 ring-amber-500/20"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            <AlertCircle className="w-4 h-4" />
                            <span className="font-medium">Urgent Alert</span>
                        </button>
                    </div>

                    {/* Title Input */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Class 101 Cancellation"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900"
                            required
                        />
                    </div>

                    {/* Message Input */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Details about the announcement..."
                            rows={4}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 resize-none"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                        >
                            <Send className="w-4 h-4" />
                            Broadcast Notice
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateNoticeModal;
