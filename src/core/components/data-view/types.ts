/* eslint-disable perfectionist/sort-object-types*/

//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { ChannelSourceFilter, ChannelSourceListingFilter } from "@/features/channels/common/types/api.types"
import type { ChannelSource, ChannelSourceListing } from "@/features/channels/common/types/data.types"
import type {
	ChannelSourceOptOutFilter,
	ChannelSourceRequestFilter,
} from "@/features/channels/sms-senders-management/types/api.types"
import type {
	ChannelSourceOptOut,
	ChannelSourceRequest,
} from "@/features/channels/sms-senders-management/types/data.types"
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

export interface DataViewProps<TData, K extends DataViewKey = DataViewKey>
	extends Pick<React.HTMLAttributes<HTMLDivElement>, "children" | "className"> {
	/**
	 * Array of Columns to be rendered
	 */
	columns: ColumnType<TData, any>[]

	/**
	 * Total Number of entries fetched from the server
	 */
	count: number

	dataViewKey: K

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
	| "international-sms-channel-source-listings"
	| "international-sms-channel-source-opted-out-list"
	| "international-sms-channel-source-requests-completed"
	| "international-sms-channel-source-requests-pending"
	| "international-sms-channel-sources"
	| "local-sms-channel-source-listings"
	| "local-sms-channel-source-opted-out-list"
	| "local-sms-channel-source-requests-completed"
	| "local-sms-channel-source-requests-pending"
	| "local-sms-channel-sources"
	| "segments"
	| "sms-industry-templates"
	| "sms-prebuilt-templates-dialog"
	| "sms-prebuilt-templates"
	| "sms-templates"

type DataViewEntryType = {
	//#region PEOPLE MANAGEMENT
	contacts: Contact
	"contacts-in-group": Contact
	"add-contacts-to-group": Contact
	groups: Group
	"contacts-exports": ContactExports
	segments: Segment
	//#endregion

	//#region TEMPLATES MANAGEMENT
	industries: IndustryType
	"sms-templates": SmsTemplateType
	"sms-prebuilt-templates": SmsIndustryTemplateType
	"sms-prebuilt-templates-dialog": SmsIndustryTemplateType
	"sms-industry-templates": SmsIndustryTemplateType
	//#endregion

	//#region CHANNELS MANAGEMENT
	"local-sms-channel-source-requests-pending": ChannelSourceRequest
	"local-sms-channel-source-requests-completed": ChannelSourceRequest
	"international-sms-channel-source-requests-pending": ChannelSourceRequest
	"international-sms-channel-source-requests-completed": ChannelSourceRequest
	"local-sms-channel-sources": ChannelSource
	"international-sms-channel-sources": ChannelSource
	"local-sms-channel-source-listings": ChannelSourceListing
	"international-sms-channel-source-listings": ChannelSourceListing
	"local-sms-channel-source-opted-out-list": ChannelSourceOptOut
	"international-sms-channel-source-opted-out-list": ChannelSourceOptOut
	//#endregion
}

export type DataViewFilterType = {
	//#region PEOPLE MANAGEMENT
	contacts: ContactTableFiltersType & ContactTableAdvancedFiltersType
	"contacts-in-group": Omit<ContactTableFiltersType, "groups">
	"add-contacts-to-group": ContactTableFiltersType
	groups: ContactGroupFilter
	"contacts-exports": ContactExportFilter
	segments: DateRange
	//#endregion

	//#region TEMPLATES MANAGEMENT
	industries: IndustryFilter
	"sms-templates": TemplateFilter
	"sms-prebuilt-templates": PrebuiltTemplateFilter
	"sms-prebuilt-templates-dialog": PrebuiltTemplateFilter
	"sms-industry-templates": PrebuiltTemplateFilter
	//#endregion

	//#region CHANNELS MANAGEMENT
	"local-sms-channel-source-requests-pending": ChannelSourceRequestFilter
	"local-sms-channel-source-requests-completed": ChannelSourceRequestFilter
	"international-sms-channel-source-requests-pending": ChannelSourceRequestFilter
	"international-sms-channel-source-requests-completed": ChannelSourceRequestFilter
	"local-sms-channel-sources": ChannelSourceFilter
	"international-sms-channel-sources": ChannelSourceFilter
	"local-sms-channel-source-listings": ChannelSourceListingFilter
	"international-sms-channel-source-listings": ChannelSourceListingFilter
	"local-sms-channel-source-opted-out-list": ChannelSourceOptOutFilter
	"international-sms-channel-source-opted-out-list": ChannelSourceOptOutFilter
	//#endregion
}

export type DataViewState<K extends DataViewKey> = {
	appliedFiltersCount?: number

	filters: DataViewFilterType[K]

	paginationAndSorting: PaginationAndSorting<DataViewEntryType[K]>

	searchTerm?: string

	selection?: Selection

	view?: DataViewRenderType
}
