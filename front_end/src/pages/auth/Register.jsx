
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ImageUpload from '../../components/common/ImageUpload';
import authBg from '../../assets/auth-bg.png';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!formData.role) {
            alert("Please select a role!");
            return;
        }

        setLoading(true);
        try {
            console.log("Attempting registration with:", {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                role: formData.role
            });

            await register({
                name: formData.name,
                username: formData.username,
                email: formData.email.toLowerCase(),
                role: formData.role,
                password: formData.password
            });

            alert("Registration successful! Please login with your email and password.");
            navigate('/login');
        } catch (error) {
            console.error("Registration failed detail:", error);

            if (!error.response) {
                alert("Could not connect to the backend server. Please ensure your Flask app is running at http://127.0.0.1:5000");
            } else {
                const serverError = error.response?.data?.error || error.response?.data?.message || "Registration failed.";
                alert(`Server Error: ${serverError}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
                <img
                    src={authBg}
                    alt="Office Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-white max-w-lg">
                        <h1 className="text-5xl font-bold mb-6">Join the Team</h1>
                        <p className="text-xl text-gray-200">
                            Create your employee profile to get started with leaves, attendance, and payroll management.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:max-w-md">
                    <div className="text-left mb-10">
                        <div className="h-12 w-12 mb-6">
                            <img src="/logo.svg" alt="ecoHRMS" className="h-full w-full" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Create new account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account? <Link to="/login" className="font-medium text-primary hover:text-blue-500">Sign in here</Link>
                        </p>
                    </div>

                    <div className="bg-white py-2 px-0 shadow-none sm:rounded-lg">
                        <form className="space-y-6" onSubmit={handleSubmit}>

                            <ImageUpload label="Upload a new photo" />

                            <Input
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Jane Doe"
                                required
                            />

                            <Input
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="e.g. janedoe"
                                required
                            />

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="e.g. jane@ecoHRMS.com"
                                required
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                    required
                                >
                                    <option value="">Select your role</option>
                                    <option value="employee">Employee</option>
                                    <option value="hr">HR Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                                <Input
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="flex items-center">
                                <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" required />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                    I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                                </label>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    type="button"
                                    onClick={() => navigate('/login')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register Account'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
