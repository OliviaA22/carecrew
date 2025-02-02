/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '330px',
        sms: '386px',
        smm: '410px',
        sml: '500px',
        md: '667px',
        mdl: '768px',
        lg: '960px',
        lgl: '1024px',
        lgx: '1134px',
        xl: '1300px',
        xll: '1380px',
        xlx: '1400px',
        xxl: '1600px',
      },
      fontFamily: {
        barlow: ['Barlow Semi Condensed', 'sans-serif'],
        'poppins-bold': ['Poppins', 'sans-serif', '700'],
      },
      colors: {
        customGray: {
          500: '#4A5568',  // A dark gray color
          600: '#2D3748',  // An even darker shade for hover
          700: '#1A202C'   // Darkest shade for additional variation
        },
        borderc: 'rgba(178, 178, 178, 1);',
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
      },
      boxShadow: {
        custom: '0px 0px 20px 0px #1A31501A',
        customWhite: '0px 2px 6px 0px #FFFFFF40',
        customShadow: '0px 5px 10px 0px #1A31500D',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        10: '10',
        50: '50',
        100: '100',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      opacity: ['group-hover'],
      scale: ['group-hover'],
    }
  },
  plugins: [],
};
