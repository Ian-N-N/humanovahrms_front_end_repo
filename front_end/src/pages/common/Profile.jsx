
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { user, logout, updateUser } = useAuth(); // Destructure updateUser

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || 'User',
        email: user?.email || 'user@humanova.co.ke',
        phone: user?.phone || '+254 712 345 678',
        address: user?.address || 'P.O. Box 7894, Nairobi',
        emergencyContact: user?.emergency_contact || 'Jane Doe (+254 722 000 111)'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await updateUser(formData);
            setIsEditing(false);
            alert('Profile Updated Successfully!');
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Col: Photo & Main Info */}
                <Card className="md:col-span-1 flex flex-col items-center text-center">
                    <div className="h-32 w-32 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-white mb-4">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
                    <p className="text-gray-500 capitalize">
                        {typeof user?.role === 'object' ? user.role.name || 'Employee' : user?.role || 'Employee'}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">{user?.id}</p>

                    <div className="mt-6 w-full space-y-2">
                        <Button variant="outline" className="w-full" onClick={logout}>Sign Out</Button>
                    </div>
                </Card>

                {/* Right Col: Details Form */}
                <Card className="md:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Personal Details</h3>
                        {!isEditing ? (
                            <Button variant="ghost" className="text-primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button onClick={handleSave}>Save Changes</Button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            disabled={!isEditing}
                            onChange={handleChange}
                        />
                        <Input
                            label="Email"
                            name="email"
                            value={formData.email}
                            disabled={true} // Email usually immutable
                            className="bg-gray-50"
                        />
                        <Input
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            disabled={!isEditing}
                            onChange={handleChange}
                        />
                        <Input
                            label="Address"
                            name="address"
                            value={formData.address}
                            disabled={!isEditing}
                            onChange={handleChange}
                        />
                        <div className="md:col-span-2">
                            <Input
                                label="Emergency Contact"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <h4 className="text-sm font-bold text-gray-900 mb-4">Change Password</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input type="password" label="New Password" placeholder="********" />
                                <Input type="password" label="Confirm Password" placeholder="********" />
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Profile;
