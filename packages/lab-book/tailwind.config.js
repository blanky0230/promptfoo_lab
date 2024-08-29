/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    // Toggle dark-mode based on .dark class or data-mode="dark"
    darkMode: ['class', '[data-mode="dark"]'],
    theme: {
        extend: {},
    },
    plugins: [],
};
