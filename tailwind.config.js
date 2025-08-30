/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legal/Government inspired color palette
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        secondary: {
          50: '#fffdf0',
          100: '#fef7c3',
          200: '#feee95',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        legal: {
          justice: '#1e40af',
          authority: '#7c2d12',
          trust: '#065f46',
          wisdom: '#581c87',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      backgroundImage: {
        'legal-gradient': 'linear-gradient(135deg, #102a43 0%, #334e68 50%, #486581 100%)',
        'gold-gradient': 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
        'card-gradient': 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
      },
      fontFamily: {
        'legal': ['Georgia', 'Times New Roman', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
