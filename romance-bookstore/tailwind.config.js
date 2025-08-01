/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        rose: {
          25: '#fef7f7',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        cream: {
          25: '#fffefb',
          50: '#fffdf7',
          100: '#fefcf0',
          200: '#fef7e0',
          300: '#fdf2cc',
          400: '#fce7a6',
          500: '#facc15',
          600: '#eab308',
          700: '#ca8a04',
          800: '#a16207',
          900: '#854d0e',
        }
      },
      animation: {
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        }
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'romantic': '0 10px 40px -10px rgba(239, 68, 68, 0.15)',
      }
    },
  },
  plugins: [],
  // Optimize for production
  corePlugins: {
    // Disable unused features to reduce bundle size
    container: false,
  },
  // Safelist important classes that might be dynamically generated
  safelist: [
    'animate-pulse',
    'animate-spin',
    'opacity-0',
    'opacity-100',
    'transform',
    'transition-opacity',
    'duration-300',
    'duration-500',
    'duration-700',
    'scale-105',
    'scale-110',
    '-translate-y-2',
    '-translate-y-8',
    'translate-x-1',
    'blur',
    'backdrop-blur-sm',
    'backdrop-blur-lg',
    'backdrop-blur-xl',
  ]
}