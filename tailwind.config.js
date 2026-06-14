/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navyDark: 'var(--color-bg)',
        pageBg: 'var(--color-bg)',
        cardBg: 'var(--color-card)',
        cardBorder: 'var(--color-card-border)',
        headingText: 'var(--color-heading)',
        bodyText: 'var(--color-text)',
        greenAccent: 'var(--color-tertiary)',
        orangeAccent: 'var(--color-quaternary)',
        yellowAccent: '#F59E0B',
        blueAccent: 'var(--color-primary)',
        redAccent: '#EF4444',
        
        // Backward compatibility mappings if needed
        background: 'var(--color-bg)',
        card: 'var(--color-card)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        quaternary: 'var(--color-quaternary)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 1px 4px rgba(0,0,0,0.06)',
        cardHover: '0 4px 16px rgba(0,0,0,0.10)',
      }
    },
  },
  plugins: [],
}
