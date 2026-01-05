export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#60A5FA',
                    DEFAULT: '#2563EB', // Blue-600
                    dark: '#1E40AF',
                },
                secondary: {
                    DEFAULT: '#64748B', // Slate-500
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
