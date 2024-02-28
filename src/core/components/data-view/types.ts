//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { SenderFilter, SmsSenderType } from "@/features/channels/sms-senders/types"
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

import type { ColumnType } from "./data-table/types"
//#endregion

export interface DataViewProps<TData> extends Pick<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
	/**
	 * Array of Columns to be rendered
	 */
	columns: ColumnType<TData, any>[]

	/**
	 * Total Number of entries fetched from the server
	 */
	count: number

	dataViewKey: DataViewKey

	/**
	 * Boolean used to show skeleton in each cell when an asynchronous acrion is pending
	 */
	isFetching?: boolean

	/**
	 * Passed data to be used for each column/row
	 */
	list: TData[]
}

export type DataViewRenderType = "GRID" | "LIST"

export type Selection = "ALL" | string[] | undefined

export type DataViewKey =
	| "add-contacts-to-group"
	| "contacts-exports"
	| "contacts-in-group"
	| "contacts"
	| "groups"
	| "industries"
	| "international-sms-senders"
	| "local-sms-senders"
	| "segments"
	| "sms-industry-templates"
	| "sms-prebuilt-templates-dialog"
	| "sms-prebuilt-templates"
	| "sms-templates"

type DataViewEntryType = {
	"add-contacts-to-group": Contact
	contacts: Contact
	"contacts-exports": ContactExports
	"contacts-in-group": Contact
	groups: Group
	industries: IndustryType
	"international-sms-senders": SmsSenderType
	"local-sms-senders": SmsSenderType
	segments: Segment
	"sms-industry-templates": SmsIndustryTemplateType
	"sms-prebuilt-templates": SmsIndustryTemplateType
	"sms-prebuilt-templates-dialog": SmsIndustryTemplateType
	"sms-templates": SmsTemplateType
}

export type DataViewFilterType = {
	"add-contacts-to-group": ContactTableFiltersType
	contacts: ContactTableFiltersType & ContactTableAdvancedFiltersType
	"contacts-exports": ContactExportFilter
	"contacts-in-group": Omit<ContactTableFiltersType, "groups">
	groups: ContactGroupFilter
	industries: IndustryFilter
	"international-sms-senders": SenderFilter
	"local-sms-senders": SenderFilter
	segments: DateRange
	"sms-industry-templates": PrebuiltTemplateFilter
	"sms-prebuilt-templates": PrebuiltTemplateFilter
	"sms-prebuilt-templates-dialog": PrebuiltTemplateFilter
	"sms-templates": TemplateFilter
}

export type DataViewState<K extends DataViewKey> = {
	appliedFiltersCount?: number

	filters?: DataViewFilterType[K]

	paginationAndSorting: PaginationAndSorting<DataViewEntryType[K]>

	searchTerm?: string

	selection?: Selection

	view?: DataViewRenderType
}
