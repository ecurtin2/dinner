module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

    },
    colors: {
      primary: '#14B8A6',
      primary_muted: "#F3F4F6",
      secondary: '#F97316',
      error: '#EF4444',
      black: "#262626",
      white: "#FAFAFA",
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
