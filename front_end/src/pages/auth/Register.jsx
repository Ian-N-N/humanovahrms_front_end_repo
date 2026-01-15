
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
        role: 'admin',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const validate = () => {
        const newErrors = {};

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Password
        const password = formData.password;
        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Must contain an uppercase letter.";
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = "Must contain a lowercase letter.";
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = "Must contain a number.";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            newErrors.password = "Must contain a special character.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

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
                role: 'admin',
                password: formData.password
            });

            alert("Registration successful! Please login with your email and password.");
            navigate('/login');
        } catch (error) {
            console.error("Registration failed detail:", error);

            if (!error.response) {
                alert("Could not connect to the backend server.");
            } else {
                const serverError = error.response?.data?.message || error.response?.data?.error || "Registration failed.";
                if (serverError.toLowerCase().includes('email')) setErrors(p => ({ ...p, email: serverError }));
                else if (serverError.toLowerCase().includes('password')) setErrors(p => ({ ...p, password: serverError }));
                else alert(`Server Error: ${serverError}`);
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
                            Organization Admin Registration
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
                                error={errors.email}
                                required
                            />


                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    error={errors.password}
                                    required
                                />
                                <Input
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    error={errors.confirmPassword}
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
