import React, { useState } from 'react';

const Input = ({ type, id, placeholder, label, error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      {label && <label htmlFor={id} className={`block text-sm font-medium mb-1 ${error ? 'text-red-600' : 'text-gray-700'}`}>{label}</label>}
      <div className="relative">
        <input
          type={isPassword && !showPassword ? 'password' : 'text'}
          id={id}
          className={`w-full px-4 py-3 rounded-lg border focus:ring-2 placeholder-gray-400 pr-10 transition-all ${error
              ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900'
            }`}
          placeholder={placeholder}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
          >
            <span className="material-icons-round text-lg">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
        {type === 'date' && (
          <div className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 pointer-events-none">
            <span className="material-icons-round text-lg">calendar_today</span>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600 animate-fade-in">{error}</p>}
    </div>
  );
};

export default Input;
