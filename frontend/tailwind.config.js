module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

    },
    colors: {
      primary: '#14B8A6',
      primary_muted: "#2DD4BF",
      secondary: '#F97316',
      bg_primary: '#F4F4F5',
      bg_primary_muted: '#E4E4E7',
      error: '#EF4444',
      error_muted: '#F87171',
      black: "#262626",
      white: "#FAFAFA",
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
