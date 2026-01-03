import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const user = await login(email, password);
            if (user.role === 'admin') navigate('/admin/dashboard');
            else if (user.role === 'hr') navigate('/hr/dashboard');
            else if (user.role === 'employee') navigate('/employee/dashboard');
            else navigate('/login');
        } catch {
            alert('Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo Placeholder */}
                <div className="mx-auto h-16 w-16 flex items-center justify-center">
                    <img src="/logo.svg" alt="ecoHRMS Logo" className="h-full w-full" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    ecoHRMS
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Human Resource Management System
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-primary hover:text-blue-500">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full" isLoading={isLoading}>
                                Sign In
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Don't have an account? <Link to="/register" className="text-primary hover:text-blue-500 font-medium">Contact HR</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
