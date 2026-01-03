
import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ImageUpload from '../../components/common/ImageUpload';

const Register = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mx-auto h-16 w-16 flex items-center justify-center">
                    <img src="/logo.svg" alt="ecoHRMS Logo" className="h-full w-full" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Join ecoHRMS
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter your details below to create your employee profile.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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

                    <div className="mt-6 text-center">
                        <Link to="/login" className="text-sm text-primary hover:text-blue-500 font-medium">Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
