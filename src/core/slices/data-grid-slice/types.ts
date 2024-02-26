//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type {
	IndustryFilter,
	IndustryType,
	PrebuiltTemplateFilter,
	SmsIndustryTemplateType,
} from "@/features/industries/types"
import type {
	Contact,
	ContactTableAdvancedFiltersType,
	ContactTableFiltersType,
} from "@/features/people/contacts/types"
import type { ContactExportFilter, ContactExports } from "@/features/people/exports/types"
import type { ContactGroupFilter, Group } from "@/features/people/groups/types"
import type { Segment } from "@/features/people/segments/types"
import type { SmsTemplateType, TemplateFilter } from "@/features/templates/sms-templates/types"
import type { DateRange } from "@/ui"
//#endregion

export type DataGridView = "GRID" | "LIST"

// export enum DataGridKey {
// 	"contacts" = "contacts",
// 	"contacts-in-group" = "contacts-in-group",
// 	"add-contacts-to-group" = "add-contacts-to-group",
// 	"groups" = "groups",
// 	"contacts-exports" = "contacts-exports",
// 	"segments" = "segments",
// 	"sms-templates" = "sms-templates",
// 	"sms-prebuilt-templates" = "sms-prebuilt-templates",
// 	"sms-prebuilt-templates-dialog" = "sms-prebuilt-templates-dialog",
// 	"sms-industry-templates" = "sms-industry-templates",
// 	"industries" = "industries",
// }

export type DataGridKey =
	| "add-contacts-to-group"
	| "contacts-exports"
	| "contacts-in-group"
	| "contacts"
	| "groups"
	| "industries"
	| "segments"
	| "sms-industry-templates"
	| "sms-prebuilt-templates-dialog"
	| "sms-prebuilt-templates"
	| "sms-templates"

type DataGridEntryType = {
	"add-contacts-to-group": Contact
	contacts: Contact
	"contacts-exports": ContactExports
	"contacts-in-group": Contact
	groups: Group
	industries: IndustryType
	segments: Segment
	"sms-industry-templates": SmsIndustryTemplateType
	"sms-prebuilt-templates": SmsIndustryTemplateType
	"sms-prebuilt-templates-dialog": SmsIndustryTemplateType
	"sms-templates": SmsTemplateType
}

export type DataGridFilterType = {
	"add-contacts-to-group": ContactTableFiltersType
	contacts: ContactTableFiltersType & ContactTableAdvancedFiltersType
	"contacts-exports": ContactExportFilter
	"contacts-in-group": Omit<ContactTableFiltersType, "groups">
	groups: ContactGroupFilter
	industries: IndustryFilter
	segments: DateRange
	"sms-industry-templates": PrebuiltTemplateFilter
	"sms-prebuilt-templates": PrebuiltTemplateFilter
	"sms-prebuilt-templates-dialog": PrebuiltTemplateFilter
	"sms-templates": TemplateFilter
}

export type DataGridState<K extends DataGridKey> = {
	appliedFiltersCount?: number

	filters?: DataGridFilterType[K]

	paginationAndSorting: PaginationAndSorting<DataGridEntryType[K]>

	searchTerm?: string

	selection?: "ALL" | string[]

	view?: DataGridView
}
