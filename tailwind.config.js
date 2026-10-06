/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        celestial: {
          dark: '#080a14',
          night: '#0d1326',
          deep: '#141c3a',
          glow: '#3b82f6',
          pink: '#f472b6',
          rose: '#fb7185',
          gold: '#fbbf24',
          star: '#fef08a'
        }
      },
      fontFamily: {
        romantic: ['"Dancing Script"', 'cursive', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'floating 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'twinkle': 'twinkle 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        twinkle: {
          '0%': { opacity: '0.2', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
