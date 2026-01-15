import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';

const BACKGROUND_IMAGE_URL = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

const TrialRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = document.getElementById('role').value;
    
    // Logic for Trial Mode Registration
    console.log(`Registering user in Trial Mode with role: ${role}`);
    alert(`Trial account created as ${role}! Redirecting to login...`);
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Left Side - Image Section (Slightly different image or overlay to distinguish) */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60 mix-blend-multiply"></div>
        <div className="absolute bottom-10 left-10 text-white p-4 z-10">
          <h2 className="text-4xl font-bold font-serif">Trial Mode</h2>
          <p className="text-lg mt-2 opacity-90">Experience ecoHRMS with flexible role selection.</p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 h-screen overflow-y-auto">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 my-auto border border-gray-100 border-t-4 border-t-orange-500">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-serif">ecoHRMS</h1>
            <h2 className="text-xl font-semibold text-gray-800 mt-2">
              Create Trial Account
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Select your preferred role to explore the platform.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>

            <div className="flex flex-col items-center mb-6">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-orange-500 transition-colors">
                  <span className="material-icons-round text-gray-400 text-4xl">person</span>
                </div>
                <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-1.5 rounded-full shadow-md hover:bg-orange-600 transition-colors">
                  <span className="material-icons-round text-xs block">camera_alt</span>
                </div>
              </div>
              <p className="text-orange-600 text-sm font-medium mt-2 cursor-pointer">Upload photo</p>
            </div>

            <Input type="text" id="name" label="Full Name" placeholder="e.g. John Doe" />
            <Input type="email" id="email" label="Email Address" placeholder="e.g. john@example.com" />

            {/* ROLE SELECTION (KEPT FOR TRIAL MODE) */}
            <div className="flex flex-col">
              <label htmlFor="role" className="text-sm font-medium text-gray-700 mb-1">Select Role</label>
              <div className="relative">
                <select
                  id="role"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-colors"
                >
                  <option value="" disabled selected>Choose a role...</option>
                  <option value="admin">Admin</option>
                  <option value="hr">HR Manager</option>
                  <option value="employee">Employee</option>
                  <option value="candidate">Candidate</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <span className="material-icons-round text-gray-500">expand_more</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input type="password" id="password" label="Password" placeholder="••••••••" />
              <Input type="password" id="confirm_password" label="Confirm Password" placeholder="••••••••" />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-start text-gray-600 cursor-pointer mt-2">
                <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mr-2 mt-0.5" />
                <span>
                  I agree to the <a href="#" className="text-orange-600 hover:underline">Trial Terms</a>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-md transition-all transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Start Trial
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              Back to Standard Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrialRegister;