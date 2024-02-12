//#region Import
import type { IndustryType } from "@/features/industries/types"
import type { Contact, ContactTableFiltersType } from "@/features/people/contacts/types"
import type { ContactExports, ContactExportsTableFiltersType } from "@/features/people/exports/types"
import type { Group } from "@/features/people/groups/types"
import type { Segment, SegmentConditionType } from "@/features/people/segments/types"
import type {
	SmsPrebuiltTemplateType,
	SmsPrebuiltTemplatesTableFiltersType,
	SmsTemplateType,
	SmsTemplatesTableFiltersType,
} from "@/features/templates/sms-templates/types"
import type { DateRange, OptionType, TableState } from "@/ui"
//#endregion

export type AdvancedTableListGridView = "LIST" | "GRID"

export type TableKey =
	| "contacts"
	| "contacts-in-group"
	| "add-contacts-to-group"
	| "groups"
	| "contacts-exports"
	| "segments"
	| "sms-templates"
	| "sms-prebuilt-templates"
	| "industries"

type TableDataMappingType = {
	contacts: Contact
	"contacts-in-group": Contact
	"add-contacts-to-group": Contact
	groups: Group
	"contacts-exports": ContactExports
	segments: Segment
	"sms-templates": SmsTemplateType
	"sms-prebuilt-templates": SmsPrebuiltTemplateType
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
	"sms-prebuilt-templates": SmsPrebuiltTemplatesTableFiltersType
	industries: { dateRange?: DateRange }
}

export type AdvancedTableStateType<K extends TableKey> = TableState<TableDataMappingType[K]> & {
	searchTerm?: string

	filters?: FiltersFieldMappingType[K]

	appliedFiltersCount?: number

	view?: AdvancedTableListGridView
}

/**
 * Advanced Table Slice Type, as a whole. Used in root reducer, and to infer `AdvancedTableSlice` state type
 */
export type AdvancedTableSliceStateType = {
	[K in TableKey]: AdvancedTableStateType<K>
}
