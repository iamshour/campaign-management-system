//#region Import
import type {
	IndustryType,
	SmsIndustryTemplateType,
	SmsIndustryTemplatesTableFiltersType,
} from "@/features/industries/types"
import type { Contact, ContactTableFiltersType } from "@/features/people/contacts/types"
import type { ContactExports, ContactExportsTableFiltersType } from "@/features/people/exports/types"
import type { Group } from "@/features/people/groups/types"
import type { Segment, SegmentConditionType } from "@/features/people/segments/types"
import type { SmsTemplateType, SmsTemplatesTableFiltersType } from "@/features/templates/sms-templates/types"
import type { DateRange, OptionType, TableState } from "@/ui"
//#endregion

export type DataGridView = "LIST" | "GRID"

export type DataGridKey =
	| "contacts"
	| "contacts-in-group"
	| "add-contacts-to-group"
	| "groups"
	| "contacts-exports"
	| "segments"
	| "sms-templates"
	| "sms-prebuilt-templates"
	| "sms-industry-templates"
	| "industries"

type TableDataMappingType = {
	contacts: Contact
	"contacts-in-group": Contact
	"add-contacts-to-group": Contact
	groups: Group
	"contacts-exports": ContactExports
	segments: Segment
	"sms-templates": SmsTemplateType
	"sms-prebuilt-templates": SmsIndustryTemplateType
	"sms-industry-templates": SmsIndustryTemplateType
	industries: IndustryType
}

export type FiltersFieldMappingType = {
	contacts: ContactTableFiltersType & { advancedFilters?: { segment?: OptionType; conditions: SegmentConditionType[] } }
	"contacts-in-group": ContactTableFiltersType
	"add-contacts-to-group": ContactTableFiltersType
	groups: { dateRange?: DateRange }
	"contacts-exports": ContactExportsTableFiltersType
	segments: { dateRange?: DateRange }
	"sms-templates": SmsTemplatesTableFiltersType
	"sms-prebuilt-templates": SmsIndustryTemplatesTableFiltersType
	"sms-industry-templates": SmsIndustryTemplatesTableFiltersType
	industries: { dateRange?: DateRange }
}

export type DataGridState<K extends DataGridKey> = TableState<TableDataMappingType[K]> & {
	searchTerm?: string

	filters?: FiltersFieldMappingType[K]

	appliedFiltersCount?: number

	view?: DataGridView
}

/**
 * Advanced Table Slice Type, as a whole. Used in root reducer, and to infer `AdvancedTableSlice` state type
 */
export type DataGridSliceStateType = {
	[K in DataGridKey]: DataGridState<K>
}
