// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    data: {
      disabled: 'disabled~="true"',
      primary: 'variant~="primary"',
      secondary: 'variant~="secondary"',
      outline: 'variant~="outline"',
      'variant-text': 'variant~="text"',
    },
    extend: {
      zIndex: {
        base: '0',
        dropdown: '80',
        overlay: '90',
        popover: '100',
      },
      screens: {
        desktop: '1440px',
      },
      animation: {
        'ping-slow': 'ping 4s cubic-bezier(0.04, 1.04, 0.16, 1) infinite',
        'fade-in': 'fade-in 0.15s ease-in-out',
        'modal-up': 'modal-up 0.15s ease-in-out',
        'accordion-down': 'accordion-down 0.15s ease-out',
        'accordion-up': 'accordion-up 0.15s ease-out',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'modal-up': {
          from: { transform: 'translate(-50%, 100%)' },
          to: { transform: 'translate(-50%, 0)' },
        },
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      dropShadow: {
        DEFAULT: '0px 4px 24px rgba(13, 16, 23, 0.5)',
      },
      fontWeight: {
        book: 350,
      },
      fontFamily: {
        sans: ['var(--inter-font)', ...fontFamily.sans],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '2rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        'display-xs': ['1.5rem', { lineHeight: '2rem' }],
        'display-sm': ['1.875rem', { lineHeight: '2.5rem' }],
        'display-md': ['2.25rem', { lineHeight: '2.75rem' }],
        'display-lg': ['3rem', { lineHeight: '3.75rem' }],
        'display-xl': ['3.75rem', { lineHeight: '4.5rem', letterSpacing: '-1%' }],
        'display-2xl': ['4.5rem', { lineHeight: '5.75rem', letterSpacing: '-1%' }],
      },
      colors: {
        primary: 'var(--primary-color)',
        verified: 'var(--verified-color)',
        stroke: 'theme(colors.gray.350)',
        success: {
          DEFAULT: 'theme(colors.green.250)',
          dark: 'theme(colors.green.900)',
        },
        warning: {
          DEFAULT: 'theme(colors.orange.250)',
          dark: 'theme(colors.orange.900)',
        },
        fail: {
          DEFAULT: 'theme(colors.red.250)',
          dark: 'theme(colors.red.900)',
        },
        tw: {
          green: '#22c55e',
          yellow: '#facc15',
          orange: '#f97316',
          red: '#ef4444',
        },
        gold: {
          DEFAULT: '#FACC15',
        },
        green: {
          50: 'rgba(153, 255, 221, 1)',
          100: 'rgba(132, 252, 211, 1)',
          150: 'rgba(108, 246, 199, 1)',
          200: 'rgba(85, 237, 184, 1)',
          250: 'rgba(64, 225, 167, 1)',
          300: 'rgba(48, 208, 149, 1)',
          350: 'rgba(34, 187, 127, 1)',
          400: 'rgba(24, 159, 104, 1)',
          500: 'rgba(16, 126, 78, 1)',
          600: 'rgba(13, 108, 65, 1)',
          700: 'rgba(10, 89, 52, 1)',
          800: 'rgba(7, 70, 40, 1)',
          900: 'rgba(5, 51, 28, 1)',
        },
        red: {
          50: 'rgba(255, 217, 217, 1)',
          100: 'rgba(255, 188, 192, 1)',
          150: 'rgba(252, 156, 168, 1)',
          200: 'rgba(247, 123, 146, 1)',
          250: 'rgba(238, 94, 129, 1)',
          300: 'rgba(225, 69, 116, 1)',
          350: 'rgba(203, 50, 94, 1)',
          400: 'rgba(175, 36, 74, 1)',
          500: 'rgba(142, 25, 55, 1)',
          600: 'rgba(123, 20, 45, 1)',
          700: 'rgba(103, 16, 35, 1)',
          800: 'rgba(84, 13, 26, 1)',
          900: 'rgba(64, 10, 19, 1)',
        },
        blue: {
          50: 'rgba(219, 228, 255, 1)',
          100: 'rgba(187, 204, 252, 1)',
          150: 'rgba(152, 177, 246, 1)',
          200: 'rgba(118, 151, 238, 1)',
          250: 'rgba(87, 128, 227, 1)',
          300: 'rgba(62, 109, 211, 1)',
          350: 'rgba(43, 94, 191, 1)',
          400: 'rgba(29, 81, 165, 1)',
          500: 'rgba(19, 68, 134, 1)',
          600: 'rgba(15, 61, 117, 1)',
          700: 'rgba(12, 54, 100, 1)',
          800: 'rgba(9, 46, 82, 1)',
          900: 'rgba(6, 37, 64, 1)',
        },
        orange: {
          50: 'rgba(255, 222, 179, 1)',
          100: 'rgba(251, 200, 149, 1)',
          150: 'rgba(244, 171, 117, 1)',
          200: 'rgba(234, 139, 86, 1)',
          250: 'rgba(222, 114, 59, 1)',
          300: 'rgba(206, 91, 38, 1)',
          350: 'rgba(185, 72, 22, 1)',
          400: 'rgba(158, 56, 11, 1)',
          500: 'rgba(125, 41, 5, 1)',
          600: 'rgba(107, 35, 3, 1)',
          700: 'rgba(88, 29, 1, 1)',
          800: 'rgba(70, 23, 1, 1)',
          900: 'rgba(51, 17, 0, 1)',
        },
        yellow: {
          50: 'rgba(242, 255, 179, 1)',
          100: 'rgba(218, 233, 138, 1)',
          150: 'rgba(194, 212, 101, 1)',
          200: 'rgba(172, 190, 69, 1)',
          250: 'rgba(152, 168, 44, 1)',
          300: 'rgba(133, 147, 26, 1)',
          350: 'rgba(116, 125, 15, 1)',
          400: 'rgba(99, 103, 7, 1)',
          500: 'rgba(81, 82, 3, 1)',
          600: 'rgba(71, 70, 2, 1)',
          700: 'rgba(60, 58, 1, 1)',
          800: 'rgba(49, 46, 0, 1)',
          900: 'rgba(38, 35, 0, 1)',
        },
        gray: {
          50: 'rgba(240, 246, 252, 1)',
          100: 'rgba(193, 205, 217, 1)',
          150: 'rgba(148, 163, 179, 1)',
          200: 'rgba(117, 129, 149, 1)',
          250: 'rgba(77, 92, 109, 1)',
          300: 'rgba(55, 67, 82, 1)',
          350: 'rgba(39, 48, 61, 1)',
          400: 'rgba(28, 35, 46, 1)',
          450: 'rgba(24, 30, 40, 1)',
          500: 'rgba(21, 26, 35, 1)',
          600: 'rgba(18, 22, 31, 1)',
          700: 'rgba(16, 19, 28, 1)',
          800: 'rgba(15, 17, 25, 1)',
          900: 'rgba(13, 16, 23, 1)',
        },
      },
      data: {
        disabled: 'disabled~="true"',
        primary: 'variant~="primary"',
        secondary: 'variant~="secondary"',
        outline: 'variant~="outline"',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('tailwindcss-percentage-width'),
  ],
};
