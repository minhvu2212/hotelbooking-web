/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#A91D3A',
                'primary-800': '#2779bd',
                secondary: '#FF5F00',
                flex: '#C73659',
                footer: '#F78CA2',
            },
        },
    },
    plugins: [],
};
