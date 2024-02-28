import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpBackend, { type HttpBackendOptions } from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

export const defaultNS = "common"

i18n
	// load translation using http -> see /public/locales
	// learn more: https://github.com/i18next/i18next-http-backend
	.use(HttpBackend)
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init<HttpBackendOptions>({
		// debug: true,

		defaultNS,
		fallbackLng: "en",

		interpolation: {
			// not needed for react as it escapes by default
			escapeValue: false,
			skipOnVariables: false,
		},
		load: "languageOnly",

		missingKeyHandler: function (lng, ns, key) {
			// eslint-disable-next-line no-console
			console.log("i18n Missing key handler fired: ", key)
		},
		// Example: so that an ar-EG (Egyptian Arabic) user will see the ar (Arabic) version of our app
		nonExplicitSupportedLngs: true,

		ns: [
			"common",
			"contacts",
			"groups",
			"exports",
			"segments",
			"campaigns",
			"ui",
			"sms-templates",
			"industries",
			"sms-senders",
		],

		preload: ["en", "ar"],

		saveMissing: true, // for missing key handler to fire

		supportedLngs: ["en", "ar"],
	})

// import { DateTime } from 'luxon';
// 	// new usage
// i18n.services.formatter.add('DATE_HUGE', (value, lng, options) => {
// 	return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
//   });

export default i18n
