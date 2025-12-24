import React, { useState } from 'react';
import Input from '../../components/common/Input'; // Assuming this component handles standard inputs

// Using the Unsplash image BUT WILL HAVE TO DOWNLOAD IT LATER FOR SECURITY REASONS
const BACKGROUND_IMAGE_URL = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => setIsLogin(!isLogin);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Left Side - Image Section (Fixed layout as requested) */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40 mix-blend-multiply"></div>
        <div className="absolute bottom-10 left-10 text-white p-4 z-10">
          <h2 className="text-4xl font-bold font-serif">Welcome to ecoHRMS</h2>
          <p className="text-lg mt-2 opacity-90">Streamlining your workforce management.</p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 h-screen overflow-y-auto">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 my-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-serif">ecoHRMS</h1>
            <h2 className="text-xl font-semibold text-gray-800 mt-2">
              {isLogin ? 'Login' : 'Join ecoHRMS'}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {isLogin 
                ? 'Login to your account.' 
                : 'Enter your details below to create your employee profile.'}
            </p>
          </div>

          <form className="space-y-5">
            
            {/* --- REGISTRATION ONLY FIELDS --- */}
            {!isLogin && (
              <>
                {/* Photo Upload Area */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group cursor-pointer">
                    <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-blue-500 transition-colors">
                      <span className="material-icons-round text-gray-400 text-3xl">person</span>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full shadow-md">
                       <span className="material-icons-round text-xs block">camera_alt</span>
                    </div>
                  </div>
                  <p className="text-blue-600 text-sm font-medium mt-2 cursor-pointer">Upload a new photo</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, GIF or PNG. Max size 800K</p>
                </div>

                {/* Full Name */}
                <Input
                  type="text"
                  id="name"
                  label="Full Name"
                  placeholder="e.g. Jane Doe"
                />
              </>
            )}

            {/* --- SHARED FIELDS --- */}
            
            {/* Email Address */}
            <Input
              type="email"
              id="email"
              label="Email Address"
              placeholder={isLogin ? "you@example.com" : "e.g. jane@ecohrms.com"}
            />

            {/* Role Selection (Registration Only) */}
            {!isLogin && (
              <div className="flex flex-col">
                <label htmlFor="role" className="text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="relative">
                  <select 
                    id="role"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-colors"
                  >
                    <option value="" disabled selected>Select your role</option>
                    <option value="hr">HR Manager</option>
                    <option value="employee">Employee</option>
                    <option value="candidate">Candidate</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <span className="material-icons-round text-gray-500">expand_more</span>
                  </div>
                </div>
              </div>
            )}

            {/* Password Fields */}
            {isLogin ? (
              // Login: Single Password Field
              <Input
                type="password"
                id="password"
                label="Password"
                placeholder="••••••••"
              />
            ) : (
              // Registration: Split Password Fields (Grid)
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="••••••••"
                />
                <Input
                  type="password"
                  id="confirm_password"
                  label="Confirm Password"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Checkboxes & Links */}
            <div className="flex items-center justify-between text-sm">
              {isLogin ? (
                // Login Options
                <>
                  <label className="flex items-center text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2" />
                    Remember me
                  </label>
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Reset Password?</a>
                </>
              ) : (
                // Registration Options
                <label className="flex items-start text-gray-600 cursor-pointer mt-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2 mt-0.5" />
                  <span>
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                  </span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? 'Sign In' : 'Register Account'}
            </button>
          </form>

          {/* Cancel / Toggle Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
             {isLogin ? (
               <p className="text-sm text-gray-600">
                 Don't have an account?{' '}
                 <button onClick={toggleView} className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
                   Sign Up
                 </button>
               </p>
             ) : (
               <button 
                 onClick={toggleView} 
                 className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
               >
                 Cancel
               </button>
             )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AuthPage;