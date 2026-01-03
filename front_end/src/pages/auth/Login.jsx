import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authBg from '../../assets/auth-bg.png';

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
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <img
                    src={authBg}
                    alt="Office Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900 bg-opacity-40 flex items-center justify-center p-12">
                    <div className="text-white max-w-lg">
                        <h1 className="text-5xl font-bold mb-6">Welcome to ecoHRMS</h1>
                        <p className="text-xl text-blue-100">
                            Streamline your workforce management with our modern, eco-friendly HR solution.
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
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Or <Link to="/register" className="font-medium text-primary hover:text-blue-500">contact HR to create an account</Link>
                        </p>
                    </div>

                    <div className="bg-white py-2 px-0 shadow-none sm:rounded-lg">
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
                                <div className="flex items-center justify-between mt-2">
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
                                <Button type="submit" className="w-full flex justify-center py-3" isLoading={isLoading}>
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
