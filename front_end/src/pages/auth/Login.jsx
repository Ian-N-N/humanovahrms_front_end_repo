import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';

const BACKGROUND_IMAGE_URL = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(''); // Kept for future use if backend supports name on register
  const [role, setRole] = useState('employee'); // Kept for UI, but backend currently defaults/ignores this

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleView = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const user = await login(email, password);

        // Check role.name (backend returns object) or fallback
        const roleName = user.role?.name ? user.role.name.toLowerCase() : (user.role || 'employee');

        if (roleName === 'admin') {
          navigate('/dashboard');
        } else if (roleName === 'hr manager' || roleName === 'hr') {
          navigate('/hr/dashboard');
        } else {
          navigate('/employee/dashboard');
        }

      } else {
        // --- REGISTER LOGIC ---
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await register(name, email, password);
        alert("Registration successful! Please sign in.");
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      console.error("Auth failed", err);
      setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
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

            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {!isLogin && (
              <>
                <Input
                  type="text"
                  id="name"
                  label="Full Name"
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}

            <Input
              type="email"
              id="email"
              label="Email Address"
              placeholder={isLogin ? "you@example.com" : "e.g. jane@ecohrms.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {!isLogin && (
              <div className="flex flex-col">
                <label htmlFor="role" className="text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="relative">
                  <select
                    id="role"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-primary focus:border-primary appearance-none transition-colors"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="hr">HR Manager</option>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  id="confirm_password"
                  label="Confirm Password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mr-2 mt-0.5" required />
                  <span>
                    I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md transition-all transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (isLogin ? 'Signing In...' : 'Registering...') : (isLogin ? 'Sign In' : 'Register Account')}
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