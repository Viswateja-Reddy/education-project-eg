/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        backgroundDark: '#0b0f1a',
        backgroundMid: '#121826',
        textPrimary: '#e5e7eb',
        textSecondary: '#9ca3af',
        accentPrimary: '#38bdf8',
        glassBg: 'rgba(255, 255, 255, 0.08)',
        glassBgLight: 'rgba(255, 255, 255, 0.15)',
      
        neonPrimary: '#38bdf8',
        neonSuccess: '#22c55e',
        neonWarning: '#facc15',
        neonDanger: '#ef4444',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};