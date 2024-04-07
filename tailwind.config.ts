//#region Import
import type { Config } from "tailwindcss"

import FormPlugin from "@tailwindcss/forms"
import TypographyPlugin from "@tailwindcss/typography"
import ScrollbarPlugin from "tailwind-scrollbar"
import AnimatePlugin from "tailwindcss-animate"
import plugin from "tailwindcss/plugin"
//#endregion

const customUtilities = plugin(function ({ addUtilities }) {
	addUtilities({
		".backface-hidden": { "backface-visibility": "hidden" },
		".backface-visible": { "backface-visibility": "visible" },
		".flex-center": { alignItems: "center", display: "flex", justifyContent: "center" },
		".inline-flex-center": { alignItems: "center", display: "inline-flex", justifyContent: "center" },
		".prevent-selection": {
			MozUserSelect: "none",
			MsUserSelect: "none",
			"user-select": "none",
			WebkitTouchCallout: "none",
			WebkitUserDrag: "none",
			WebkitUserSelect: "none",
		},
		".transition-basic": {
			transitionDuration: "300ms",
			transitionProperty: "all",
			transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
		},
	})
})

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"],
	darkMode: ["class"],
	plugins: [customUtilities, ScrollbarPlugin({ nocompatible: true }), FormPlugin, AnimatePlugin, TypographyPlugin],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: { "2xl": "1400px" },
		},
		extend: {
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",

				"collapse-down": "collapse-down 300ms ease-out",
				"collapse-up": "collapse-up 300ms ease-out",

				"collapse-x-close": "collapse-x-close 300ms ease-out",
				"collapse-x-open": "collapse-x-open 300ms ease-out",
			},
			colors: {
				primary: {
					100: "#B5DEF5",
					200: "#A6D7F2",
					300: "#97D1F0",
					400: "#88CAEE",
					50: "#C3E5F7",
					500: "#79C4EC",
					600: "#4CB0E6",
					700: "#2EA3E2",
					800: "#1D92D1",
					900: "#197DB3",
					950: "#054060",
					DEFAULT: "#6ABDEA",
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0px" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0px" },
				},

				"collapse-down": {
					from: { height: 0 as any },
					to: { height: "var(--radix-collapsible-content-height)" },
				},

				"collapse-up": {
					from: { height: "var(--radix-collapsible-content-height)" },
					to: { height: 0 as any },
				},

				"collapse-x-close": {
					from: { width: "var(--radix-collapsible-content-width)" },
					to: { width: 0 as any },
				},

				"collapse-x-open": {
					from: { width: 0 as any },
					to: { width: "var(--radix-collapsible-content-width)" },
				},
			},
			screens: {
				"2xs": "400px",
				"3xl": "2000px",
				xs: "576px",
			},
		},
	},
}

export default config
