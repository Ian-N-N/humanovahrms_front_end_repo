import React, { useState } from 'react';
import Input from '../../components/common/Input';
const BACKGROUND_IMAGE_URL = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => setIsLogin(!isLogin);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side - Image Section (Hidden on small screens) */}
      <div 
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
      >
        <div className="absolute bottom-10 left-10 text-white p-4">
          <h2 className="text-4xl font-bold font-serif">Welcome to HumaNova</h2>
          <p className="text-lg mt-2 opacity-90">Streamlining your workforce management.</p>
        </div>
        <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:w-1/2 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          {/* HumaNova Brand */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 font-serif">HumaNova</h1>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? 'Sign in to access your dashboard.' : 'Create your account to get started.'}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {!isLogin && (
              <Input
                type="text"
                id="name"
                label="Full Name"
                placeholder="John Doe"
              />
            )}

            <Input
              type="email"
              id="email"
              label="Email Address"
              placeholder="you@example.com"
            />

            <Input
              type="password"
              id="password"
              label="Password"
              placeholder="••••••••"
            />

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-700">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" />
                  Remember me
                </label>
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">Forgot Password?</a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle View Link */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              {isLogin ? "New to HumaNova? " : "Already have an account? "}
              <button onClick={toggleView} className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
                {isLogin ? 'Sign Up Now' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;