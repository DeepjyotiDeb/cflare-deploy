import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				varela: ['Varela Round'],
				mplus: ['M PLUS Rounded 1c']
			},
			colors: {
				primary: {
					50: '#fefce8',
					100: '#fef9c3',
					200: '#fef08a',
					300: '#fde047',
					400: '#facc15',
					500: '#eab308',
					600: '#ca8a04',
					700: '#a16207',
					800: '#854d0e',
					900: '#713f12',
					950: '#422006'
				}
			}
		},
		fontFamily: {
			body: [
				'Inter',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'system-ui',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji'
			],
			sans: [
				'Inter',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'system-ui',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji'
			]
		}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#EF9F3E',
					'primary-content': '#140901',
					secondary: '#F4BE7B',
					'secondary-content': '#140d05',
					accent: '#fc3400',
					'accent-content': '#160100',
					neutral: '#dcdcdc',
					'neutral-content': '#c5c5c7',
					'base-100': '#f5f5f4',
					'base-200': '#d5d5d4',
					'base-300': '#b6b6b5',
					'base-content': '#151514',
					info: '#0075e5',
					'info-content': '#000512',
					success: '#00f8cb',
					'success-content': '#00150f',
					warning: '#f99000',
					'warning-content': '#150700',
					error: '#ff005b',
					'error-content': '#160003'
				}
			}
			// 'light'
		]
	},
	plugins: [typography, daisyui]
};
