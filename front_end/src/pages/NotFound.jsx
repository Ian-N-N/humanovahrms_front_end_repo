
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <p className="text-xl text-gray-600 mt-4">Page not found</p>
            <Link to="/" className="mt-8">
                <Button>Go Back Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;
