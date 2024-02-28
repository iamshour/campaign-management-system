import { defaultNS } from "@/core/lib/i18n"

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS
		resources: {
			campaigns: typeof unknown
			common: typeof unknown
			contacts: typeof unknown
			exports: typeof unknown
			groups: typeof unknown
			industries: typeof unknown
			segments: typeof unknown
			"sms-senders": typeof unknown
			"sms-templates": typeof unknown
			ui: typeof unknown
		}
	}
}
