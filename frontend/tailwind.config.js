// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure this covers all your files
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        darkGray: '#1A1A1A',
        lightGray: '#E0E0E0',
        accent: '#BB86FC', // Accent color from gradient
        hoverAccent: '#9A67EA', // Darker accent for hover
      },
    },
  },
  plugins: [],
};

