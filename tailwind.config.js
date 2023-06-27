/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4D4DFF',
        secondary: '#B3E920',
        accent: '#ff9900',
        neutral: '#ffffff',
        success: '#00cc66',
        warning: '#ffcc00',
        error: '#ff3333',
        link: '#4D4DFF',
        'link-hover': '#0000CC',
        'link-visited': '#663399',
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-out': 'slide-out 0.3s ease-in',
        'fade-in': 'fade-in 0.3s ease-in',
        'scale-in': 'scale-in 0.5s ease-in',
        'rotate-in': 'rotate-in 0.3s ease-in',
        'enlarge': 'enlarge 0.3s ease-in-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-out': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        'rotate-in': {
          '0%': { transform: 'rotate(-180deg)' },
          '100%': { transform: 'rotate(0)' },
        },
        'enlarge': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
