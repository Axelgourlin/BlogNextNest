module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg': "url('/images/hero-bg.jpg')",
      },
  },
},
  variants: {
    
  },
  plugins: [],
};
