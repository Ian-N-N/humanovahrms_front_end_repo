import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';

// Using the Unsplash image
const BACKGROUND_IMAGE_URL = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const toggleView = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.toLowerCase();
    
    if (isLogin) {
      // --- LOGIN LOGIC ---
      try {
        const user = await login(email);
        if (user.role === 'admin') navigate('/dashboard');
        else if (user.role === 'hr') navigate('/hr/dashboard');
        else navigate('/employee/dashboard');
      } catch (error) {
        console.error("Login failed", error);
        alert("Login simulation failed.");
      }
    } else {
      // --- REGISTER LOGIC (FORCED ADMIN) ---
      // Here we assume the backend handles the default role, 
      // or we send role: 'admin' explicitly.
      const formData = {
        email: email,
        name: document.getElementById('name').value,
        role: 'admin' // Forced Admin Role
      };
      
      console.log("Registering as Default Admin:", formData);
      alert("Admin Account Registered successfully! Please sign in.");
      setIsLogin(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Left Side - Image Section */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
      >
        <div className="absolute inset-0 bg-primary-dark bg-opacity-40 mix-blend-multiply"></div>
        <div className="absolute bottom-10 left-10 text-white p-4 z-10">
          <h2 className="text-4xl font-bold font-serif">Welcome to ecoHRMS</h2>
          <p className="text-lg mt-2 opacity-90">Streamlining your workforce management.</p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 h-screen overflow-y-auto">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 my-auto border border-gray-100">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-serif">ecoHRMS</h1>
            <h2 className="text-xl font-semibold text-gray-800 mt-2">
              {isLogin ? 'Login' : 'Create Admin Account'}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {isLogin
                ? 'Login to your account.'
                : 'Get full access to the platform as an Administrator.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {!isLogin && (
              <>
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-primary transition-colors">
                      <span className="material-icons-round text-gray-400 text-4xl">person</span>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md hover:bg-primary-dark transition-colors">
                      <span className="material-icons-round text-xs block">camera_alt</span>
                    </div>
                  </div>
                  <p className="text-primary text-sm font-medium mt-2 cursor-pointer hover:text-primary-dark">Upload a new photo</p>
                </div>

                <Input type="text" id="name" label="Full Name" placeholder="e.g. Jane Doe" />
              </>
            )}

            <Input
              type="email"
              id="email"
              label="Email Address"
              placeholder={isLogin ? "you@example.com" : "e.g. jane@ecohrms.com"}
            />

            {/* ROLE SELECTION REMOVED - DEFAULTS TO ADMIN IN LOGIC */}

            {isLogin ? (
              <Input type="password" id="password" label="Password" placeholder="••••••••" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="password" id="password" label="Password" placeholder="••••••••" />
                <Input type="password" id="confirm_password" label="Confirm Password" placeholder="••••••••" />
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              {isLogin ? (
                <>
                  <label className="flex items-center text-gray-600 cursor-pointer hover:text-gray-900">
                    <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mr-2" />
                    Remember me
                  </label>
                  <a href="#" className="font-medium text-primary hover:text-primary-dark hover:underline">Reset Password?</a>
                </>
              ) : (
                <label className="flex items-start text-gray-600 cursor-pointer mt-2">
                  <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mr-2 mt-0.5" />
                  <span>
                    I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md transition-all transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isLogin ? 'Sign In' : 'Register as Admin'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center space-y-4">
            {isLogin ? (
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button onClick={toggleView} className="font-semibold text-primary hover:text-primary-dark hover:underline transition-colors">
                  Sign Up Organisation
                </button>
              </p>
            ) : (
              <button
                onClick={toggleView}
                className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
              >
                Back to Login
              </button>
            )}

            {/* Link to the Trial Mode Component */}
            <Link to="/trial-register" className="text-xs text-gray-400 hover:text-primary transition-colors">
              Looking for Trial Mode?
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;