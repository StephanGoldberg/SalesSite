// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Scans all JavaScript and TypeScript files in src folder
    './public/index.html',         // Includes index.html for Tailwind processing
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        darkGray: '#1A1A1A',
        lightGray: '#E0E0E0',
        accent: '#BB86FC',         // Accent color for hover states
        hoverAccent: '#9A67EA',    // Accent color for hover
      },
    },
  },
  plugins: [],
};


