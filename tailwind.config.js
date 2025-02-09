/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      
      },
    },
    extend: {
      colors: {
        'primary-500': '#7C3AED',
        'primary-600': '#5B21B6',
        'secondary-500': '#EC4899',
        'accent-500': '#8B5CF6',
        'accent-600': '#7C3AED',
        'off-white': '#F8FAFC',
        'red': '#EF4444',
        'dark-1': '#0F172A',
        'dark-2': '#1E293B',
        'dark-3': '#334155',
        'dark-4': '#475569',
        'light-1': '#F8FAFC',
        'light-2': '#E2E8F0',
        'light-3': '#CBD5E1',
        'light-4': '#94A3B8',
        'gradient-1': '#7C3AED',
        'gradient-2': '#EC4899',
        'gradient-3': '#8B5CF6',
      },
      screens: {
        'xs': '480px',
      
      },
      width: {
        '420': '420px',
        '465': '465px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],

      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-in-out',
        'scale': 'scale 0.2s ease-in-out',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'premium': '0 0 20px rgba(124, 58, 237, 0.1)',
        'premium-hover': '0 0 30px rgba(124, 58, 237, 0.2)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
