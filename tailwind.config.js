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
        secondary: '#2d3748',
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
      },
    },
  },
  plugins: [],
}
