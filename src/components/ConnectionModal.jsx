import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { useData } from '../context/DataContext';

const ConnectionModal = ({ isOpen, onClose, founderName, startupName, founderId, currentUserId }) => {
    if (!isOpen) return null;

    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);
    const { sendConnectionRequest } = useData();

    const connectionTypes = [
        { id: 'partnership', label: 'Partnership', desc: 'Explore mutual growth' },
        { id: 'integration', label: 'Integration', desc: 'Tech/Product synergy' },
        { id: 'marketing', label: 'Co-marketing', desc: 'Content/Event collab' },
        { id: 'hiring', label: 'Hiring', desc: 'Discuss a role' },
        { id: 'feedback', label: 'Product Feedback', desc: 'Beta testing / Review' },
        { id: 'general', label: 'General Connect', desc: 'Just saying hi' },
    ];

    const handleSend = async () => {
        if (!type || !founderId || !currentUserId) return;
        try {
            sendConnectionRequest(currentUserId, founderId, type, message.trim());
            setSent(true);
            setTimeout(() => {
                setSent(false);
                onClose();
                setType('');
                setMessage('');
            }, 2000);
        } catch (error) {
            console.error('Error sending connection request:', error);
            alert('Failed to send connection request. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                {sent ? (
                    <div className="p-12 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                        <p className="text-gray-500">
                            {founderName} will be notified of your request.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Connect with {founderName}</h3>
                                <p className="text-xs text-gray-500">{startupName}</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Warning */}
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex gap-3">
                                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                <div className="text-xs text-blue-800">
                                    <span className="font-bold block mb-0.5">Keep it high-signal</span>
                                    Select a specific reason for connecting to increase acceptance rate.
                                </div>
                            </div>

                            {/* Type Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-gray-900 mb-3">Connection Type <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-2 gap-2">
                                    {connectionTypes.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setType(t.id)}
                                            className={`p-3 rounded-xl border text-left transition-all ${type === t.id
                                                    ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                                                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="font-bold text-xs mb-0.5">{t.label}</div>
                                            <div className={`text-[10px] ${type === t.id ? 'text-gray-400' : 'text-gray-400'}`}>{t.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    maxLength={300}
                                    rows={4}
                                    placeholder={`Hi ${founderName}, I'd love to discuss...`}
                                    className="w-full rounded-xl border-gray-200 focus:border-gray-900 focus:ring-0 text-sm p-3 resize-none bg-gray-50 focus:bg-white transition-colors"
                                />
                                <div className="flex justify-between mt-1">
                                    <span className="text-[10px] text-gray-400">Be concise and relevant.</span>
                                    <span className={`text-[10px] ${message.length > 280 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                                        {message.length}/300
                                    </span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3">
                                <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                    Cancel
                                </button>
                                <button
                                    disabled={!type}
                                    onClick={handleSend}
                                    className={`px-6 py-2.5 text-sm font-bold text-white rounded-lg shadow-lg flex items-center gap-2 transition-all ${type
                                            ? 'bg-gray-900 hover:bg-black transform hover:-translate-y-0.5'
                                            : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    <Send className="w-4 h-4" /> Send Request
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ConnectionModal;
