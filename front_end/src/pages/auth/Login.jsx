import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';

// Using the Unsplash image BUT WILL HAVE TO DOWNLOAD IT LATER FOR SECURITY REASONS
const BACKGROUND_IMAGE_URL = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const toggleView = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value;

    if (isLogin) {
      try {
        const user = await login({ email, password });
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'hr') {
          navigate('/hr/dashboard');
        } else {
          navigate('/employee/dashboard');
        }
      } catch (error) {
        console.error("Login failed", error);
        alert(error.response?.data?.error || "Login failed. Please check your credentials.");
      }
    } else {
      const name = document.getElementById('name').value;
      const role = document.getElementById('role').value;
      const confirmPassword = document.getElementById('confirm_password').value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        console.log("Attempting registration with:", { name, email, role });
        const user = await register({ name, email, role, password });
        alert("Registration successful! You are now logged in.");
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'hr') {
          navigate('/hr/dashboard');
        } else {
          navigate('/employee/dashboard');
        }
      } catch (error) {
        console.error("Registration failed detail:", error);

        // Check if it's a connection error (backend not running)
        if (!error.response) {
          alert("Could not connect to the backend server. Please ensure your Flask app is running at http://127.0.0.1:5000");
        } else {
          const serverError = error.response?.data?.error || error.response?.data?.message || "Registration failed.";
          alert(`Server Error: ${serverError}`);
        }
      }
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
              {isLogin ? 'Login' : 'Join ecoHRMS'}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {isLogin
                ? 'Login to your account.'
                : 'Enter your details below to create your employee profile.'}
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
                  <p className="text-xs text-gray-400 mt-1">JPG, GIF or PNG. Max size 800K</p>
                </div>

                <Input
                  type="text"
                  id="name"
                  label="Full Name"
                  placeholder="e.g. Jane Doe"
                />
              </>
            )}

            <Input
              type="email"
              id="email"
              label="Email Address"
              placeholder={isLogin ? "you@example.com" : "e.g. jane@ecohrms.com"}
            />

            {!isLogin && (
              <div className="flex flex-col">
                <label htmlFor="role" className="text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="relative">
                  <select
                    id="role"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-primary focus:border-primary appearance-none transition-colors"
                  >
                    <option value="" disabled selected>Select your role</option>
                    <option value="admin">Admin</option>
                    <option value="hr">HR</option>
                    <option value="employee">Employee</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <span className="material-icons-round text-gray-500">expand_more</span>
                  </div>
                </div>
              </div>
            )}

            {isLogin ? (
              <Input
                type="password"
                id="password"
                label="Password"
                placeholder="••••••••"
              />
            ) : (
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
                    I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md transition-all transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isLogin ? 'Sign In' : 'Register Account'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
            {isLogin ? (
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button onClick={toggleView} className="font-semibold text-primary hover:text-primary-dark hover:underline transition-colors">
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