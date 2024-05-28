/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-blue':'#00204a',
        'app-royal-blue':'#2b4353',
        'app-orange':'#ff5335',
        'app-red':'#d51912'
      },
    },
  },
  plugins: [],
}

