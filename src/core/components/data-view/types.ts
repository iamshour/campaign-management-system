/* eslint-disable perfectionist/sort-object-types*/

//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { ChannelSourceFilter, ChannelSourceListingFilter } from "@/features/channels/common/types/api.types"
import type { ChannelSource, ChannelSourceListing } from "@/features/channels/common/types/data.types"
import type { SmsOptedOutFilter, SmsOptedOutSenderType } from "@/features/channels/sms-senders-management/types"
import type { ChannelSourceRequest } from "@/features/channels/sms-senders-management/types/data.types"
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

import { ChannelSourceRequestFilter } from "@/features/channels/sms-senders-management/types/api.types"

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
	| "international-sms-channel-source-listings"
	| "international-sms-channel-source-requests-completed"
	| "international-sms-channel-source-requests-pending"
	| "international-sms-channel-sources"
	| "international-sms-opted-out-senders"
	| "local-sms-channel-source-listings"
	| "local-sms-channel-source-requests-completed"
	| "local-sms-channel-source-requests-pending"
	| "local-sms-channel-sources"
	| "local-sms-opted-out-senders"
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
	"international-sms-channel-source-requests-completed": ChannelSourceRequest
	"international-sms-channel-source-requests-pending": ChannelSourceRequest
	"international-sms-channel-source-listings": ChannelSourceListing
	"international-sms-channel-sources": ChannelSource
	"local-sms-channel-source-requests-completed": ChannelSourceRequest
	// LISTING REQUESTS TYPE
	"local-sms-channel-source-requests-pending": ChannelSourceRequest
	"local-sms-channel-source-listings": ChannelSourceListing
	"local-sms-channel-sources": ChannelSource
	segments: Segment
	"sms-industry-templates": SmsIndustryTemplateType
	"sms-prebuilt-templates": SmsIndustryTemplateType
	"sms-prebuilt-templates-dialog": SmsIndustryTemplateType
	"sms-templates": SmsTemplateType
	"local-sms-opted-out-senders": SmsOptedOutSenderType
	"international-sms-opted-out-senders": SmsOptedOutSenderType
}

export type DataViewFilterType = {
	"add-contacts-to-group": ContactTableFiltersType
	contacts: ContactTableFiltersType & ContactTableAdvancedFiltersType
	"contacts-exports": ContactExportFilter
	"contacts-in-group": Omit<ContactTableFiltersType, "groups">
	groups: ContactGroupFilter
	industries: IndustryFilter
	"international-sms-channel-source-requests-completed": ChannelSourceRequestFilter
	"international-sms-channel-source-requests-pending": ChannelSourceRequestFilter
	"international-sms-channel-sources": ChannelSourceFilter
	"local-sms-channel-source-requests-completed": ChannelSourceRequestFilter
	// LISTING REQUESTS FILTER TYPES
	"local-sms-channel-source-requests-pending": ChannelSourceRequestFilter
	"local-sms-channel-sources": ChannelSourceFilter
	segments: DateRange
	"sms-industry-templates": PrebuiltTemplateFilter
	//#region CHANNELS
	"local-sms-channel-source-listings": ChannelSourceListingFilter
	"international-sms-channel-source-listings": ChannelSourceListingFilter
	"sms-prebuilt-templates": PrebuiltTemplateFilter
	"sms-prebuilt-templates-dialog": PrebuiltTemplateFilter
	"sms-templates": TemplateFilter
	"local-sms-opted-out-senders": SmsOptedOutFilter
	"international-sms-opted-out-senders": SmsOptedOutFilter
	//#endregion
}

export type DataViewState<K extends DataViewKey> = {
	appliedFiltersCount?: number

	filters?: DataViewFilterType[K]

	paginationAndSorting: PaginationAndSorting<DataViewEntryType[K]>

	searchTerm?: string

	selection?: Selection

	view?: DataViewRenderType
}
