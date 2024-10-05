/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/common/pages/*.{js,ts,jsx,tsx,mdx}',
    './src/common/components/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'app-primary': '#8839DD',
        'app-secondary': '#3D3D3D',
        'app-tertiary': '#01458A',
        'app-success': '#85DE66',
        'app-danger': '#fa004f'
      },
    },
  },
  plugins: [],
}

