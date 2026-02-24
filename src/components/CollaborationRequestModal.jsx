import React, { useMemo, useState } from 'react';
import { DollarSign, X } from 'lucide-react';

const CollaborationRequestModal = ({
    onClose,
    onSubmit,
    contextTitle,
    intentOptions = [],
    defaultIntent = '',
    submitLabel = 'Send Request'
}) => {
    const resolvedIntentOptions = useMemo(() => {
        if (intentOptions.length > 0) return intentOptions;
        return [{ value: 'help', label: 'Offer help' }];
    }, [intentOptions]);

    const initialIntent = defaultIntent || resolvedIntentOptions[0]?.value || 'help';

    const [formData, setFormData] = useState({
        intent: initialIntent,
        compensationType: 'unpaid',
        amount: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            amount: formData.compensationType === 'paid' ? formData.amount : ''
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Send Collaboration Request</h2>
                        {contextTitle && (
                            <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">{contextTitle}</p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
                        aria-label="Close request modal"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Request Type</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {resolvedIntentOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, intent: option.value }))}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${formData.intent === option.value
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Compensation</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, compensationType: 'unpaid', amount: '' }))}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${formData.compensationType === 'unpaid'
                                        ? 'bg-emerald-600 border-emerald-600 text-white'
                                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Unpaid
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, compensationType: 'paid' }))}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center gap-1.5 ${formData.compensationType === 'paid'
                                        ? 'bg-amber-500 border-amber-500 text-white'
                                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <DollarSign className="w-4 h-4" />
                                Paid
                            </button>
                        </div>
                    </div>

                    {formData.compensationType === 'paid' && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Budget / Offer</label>
                            <input
                                type="text"
                                value={formData.amount}
                                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                                placeholder="e.g., $300 fixed or $25/hr"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            placeholder="Tell them how you can contribute"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                        >
                            {submitLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CollaborationRequestModal;
