import { defaultNS } from "@/core/lib/i18n"

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS
		resources: {
			common: typeof unknown
			contacts: typeof unknown
			groups: typeof unknown
			exports: typeof unknown
			segments: typeof unknown
			campaigns: typeof unknown
			ui: typeof unknown
		}
	}
}
