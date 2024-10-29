/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#ffffff',
			black: '#000000',
			lightgrey: '#444245',
			grey: 'rgba(0, 0, 0, 0.55)',
			lightpink: '#F8F7F7',
			pink: '#DF6751',
			red: ' #cc0000',
			lightGreem: '#E0EFD8',
			green: '#548454',
			greenCheck: 'rgb(24 170 24)',
			orange100: 'rgb(255 237 213)',
			orange500: 'rgb(249 115 22)',
			orange700: 'rgb(194 65 12)',
			teal100: 'rgb(204 251 241)',
			teal500: 'rgb(20 184 166)',
			teal900: 'rgb(19 78 74)',
			bgpink: 'rgba(223, 103, 81, 0.15)',
			blue600: '#5046E5',
			blue400: 'rgb(37 99 235)',
			gray100: 'rgb(243 244 246)',
			darkpink: '#FEEDEA',
			lightblack: '#333333',
			textbl: '#363636',
			footerlinks: 'rgba(54, 54, 54, 0.9)',
			bordertop: 'rgba(105, 120, 131, 0.16)',
			darkgrey: 'rgba(44, 9, 11, 0.8)',
			slate100: 'rgb(241 245 249)', // bg-slate-100
			zinc800: 'rgb(39 39 42)', // text-zinc-800
			orange300: 'rgb(253 164 175)', // fill-orange-300
			orange100: 'rgb(255 237 213)', // via-orange-100
			orange200: 'rgb(254 215 170)', // border-orange-200
			red400: 'rgb(248 113 113)', // fill-red-400, bg-red-400
			violet400: 'rgb(139 92 246)', // border-violet-400
			violet100: 'rgb(237 233 254)', // hover:bg-violet-100
			blue100: 'rgb(219 234 254)', // from-blue-100
			purple100: 'rgb(237 233 254)', // to-purple-100
			zinc100: 'rgb(244 244 245)', // text-zinc-100
			silver: '#c4c4c4',
			gray600: 'rgb(75 85 99)',
			superLightBlue: '#F8FBFC',
		},
		fontSize: {
			xs: ['0.75rem', { lineHeight: '1rem' }],
			sm: ['0.875rem', { lineHeight: '1.25rem' }],
			base: ['1rem', { lineHeight: '1.5rem' }],
			lg: ['1.125rem', { lineHeight: '1.75rem' }],
			xl: ['1.25rem', { lineHeight: '1.75rem' }],
			'2xl': ['1.5rem', { lineHeight: '2rem' }],
			'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
			'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			'5xl': ['3rem', { lineHeight: '4.25rem' }],
			'6xl': ['3.75rem', { lineHeight: '1' }],
			'7xl': ['4.5rem', { lineHeight: '6.75rem' }],
			'8xl': ['6rem', { lineHeight: '1' }],
			'9xl': ['8rem', { lineHeight: '1' }],
		},
		extend: {},
	},
	plugins: [],
};
