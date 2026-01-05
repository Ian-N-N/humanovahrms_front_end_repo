
import React from 'react';

const Card = ({ children, className = '', title, action }) => {
    return (
        <div className={`bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl p-6 border border-gray-100 ${className}`}>
            {(title || action) && (
                <div className="flex justify-between items-center mb-4">
                    {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
