import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/content/**/*.{mdx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
