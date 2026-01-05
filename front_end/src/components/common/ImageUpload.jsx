
import React, { useState } from 'react';

const ImageUpload = ({ onImageChange, label = "Upload Photo" }) => {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            if (onImageChange) onImageChange(file);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-2 self-start">{label}</label>}
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden">
                {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs text-gray-500">Upload</p>
                    </div>
                )}
                <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
        </div>
    );
};

export default ImageUpload;
