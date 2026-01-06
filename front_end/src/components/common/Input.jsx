import React, { useState } from 'react';

const Input = ({ type, id, placeholder, label, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type={isPassword && !showPassword ? 'password' : 'text'}
        id={id}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 pr-10"
        placeholder={placeholder}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
          style={{ top: label ? '24px' : '0' }}
        >
          <span className="material-icons-round text-lg">
            {showPassword ? 'visibility_off' : 'visibility'}
          </span>
        </button>
      )}
      {type === 'date' && (
        <div
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 pointer-events-none"
          style={{ top: label ? '24px' : '0' }}
        >
          <span className="material-icons-round text-lg">calendar_today</span>
        </div>
      )}
    </div>
  );
};

export default Input;
