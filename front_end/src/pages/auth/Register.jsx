
import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ImageUpload from '../../components/common/ImageUpload';
import authBg from '../../assets/auth-bg.png';

const Register = () => {
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
                        <form className="space-y-6">

                            <ImageUpload label="Upload a new photo" />

                            <Input
                                label="Full Name"
                                placeholder="e.g. Jane Doe"
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="e.g. jane@ecoHRMS.com"
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white">
                                    <option>Select your role</option>
                                    <option>Employee</option>
                                    <option>HR Manager</option>
                                    <option>Admin</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                />
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="flex items-center">
                                <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                    I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                                </label>
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" className="w-full">
                                    Cancel
                                </Button>
                                <Button type="submit" className="w-full">
                                    Register Account
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
