/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-600': 'var(--color-primary-600)',
        surface: 'var(--color-surface)',
        bg: 'var(--color-bg)'
      },
      fontFamily: {
        'sf-pro': ['SF Pro', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
      },
      borderRadius: {
        lg: 'var(--radius-md)'
      },
      boxShadow: {
        card: 'var(--shadow-card)'
      }
    },
  },
  plugins: [],
}
