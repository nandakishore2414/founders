import React from 'react';
import { Lock } from 'lucide-react';

const AccessRestricted = ({
    role = "founder",
    message = "Access Restricted",
    description = "You do not have permission to view this content."
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-lg mx-auto mt-10">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-5 ring-1 ring-gray-100">
                <Lock className="w-8 h-8 text-gray-400" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">{message}</h2>

            <p className="text-gray-500 mb-6 leading-relaxed">
                {description}
            </p>

            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-gray-200">
                Upgrade to {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
        </div>
    );
};

export default AccessRestricted;
