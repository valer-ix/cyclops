module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'spectral': ['Spectral']
      }
    },
    colors: {
      'substack': '#C0BAB2',
      'black': '#000000',
    },
    fontFamily: {
      'serif': ['spectral']
    }
  },
  screens: {},
  variants: {
    extend: {}
  },
  plugins: []
};
