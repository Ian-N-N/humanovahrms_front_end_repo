import { useState } from 'react';
import axios from 'axios';

/**
 * useCloudinary Hook
 * Handles uploading images to Cloudinary via unsigned upload.
 */
const useCloudinary = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    // Default values if not provided via environment or props
    const CLOUD_NAME = "dxkmtf6m3"; // Placeholder - User should replace with their own
    const UPLOAD_PRESET = "ml_default"; // Placeholder - User should replace with their own

    const uploadImage = async (file) => {
        if (!file) return null;

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            return response.data.secure_url;
        } catch (err) {
            console.error('Cloudinary Upload Error:', err);
            setError(err.response?.data?.error?.message || 'Failed to upload image');
            throw err;
        } finally {
            setUploading(false);
        }
    };

    return { uploadImage, uploading, error };
};

export default useCloudinary;
