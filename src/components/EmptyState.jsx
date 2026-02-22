import React from 'react';

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => (
    <div className="flex items-center justify-center py-16">
        <div className="text-center max-w-sm">
            {Icon && (
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-blue-400" />
                </div>
            )}
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-gray-500 mb-6">{description}</p>
            )}
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-colors shadow-sm"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    </div>
);

export default EmptyState;
