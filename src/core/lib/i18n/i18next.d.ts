import { defaultNS, nameSpaces } from "@/core/lib/i18n"

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS
		resources: Record<(typeof nameSpaces)[number], typeof unknown>
	}
}
