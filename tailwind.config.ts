import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blush: '#f6e9e6',
        plum: '#5b4158',
        mist: '#f8f7fb',
        ink: '#1d1b22',
        sage: '#dce5df',
        lilac: '#dcd4ef',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(62, 43, 80, 0.12)',
      },
      backgroundImage: {
        'soft-grid': 'radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(248,247,251,0.75) 40%, rgba(220,212,239,0.35) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
