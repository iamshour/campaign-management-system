//#region Import
import type { DataViewKey, DataViewRenderType, DataViewState } from "./types"
//#endregion

const initialDataViewBaseState = {
	filters: {},
	paginationAndSorting: { limit: 25, offset: 0 },
	view: "LIST" as DataViewRenderType,
}

const initialSmsChannelsTablesState = {
	filters: {},
	paginationAndSorting: { limit: 20, offset: 0 },
	view: "LIST" as DataViewRenderType,
}

const initialCompactDataViewBaseState = {
	filters: {},
	paginationAndSorting: { limit: 10, offset: 0 },
	view: "LIST" as DataViewRenderType,
}

const dataViewSliceInitialState: { [K in DataViewKey]: DataViewState<K> } = {
	"add-contacts-to-group": {
		...initialDataViewBaseState,
		filters: { endDate: undefined, groups: undefined, startDate: undefined, tags: undefined },
	},
	contacts: initialDataViewBaseState,
	"contacts-exports": initialDataViewBaseState,
	"contacts-in-group": initialDataViewBaseState,
	groups: initialCompactDataViewBaseState,
	industries: initialDataViewBaseState,
	"international-sms-channel-source-listings": { ...initialSmsChannelsTablesState },
	"international-sms-channel-source-opted-out-list": {
		...initialSmsChannelsTablesState,
		filters: { countries: undefined },
	},
	"international-sms-channel-source-requests-completed": {
		...initialSmsChannelsTablesState,
		filters: { channelSourceRequestStatus: "COMPLETED", channelType: "SMS_INTERNATIONAL" },
	},
	"international-sms-channel-source-requests-pending": {
		...initialSmsChannelsTablesState,
		filters: { channelSourceRequestStatus: "PENDING", channelType: "SMS_INTERNATIONAL" },
	},
	"international-sms-channel-sources": {
		...initialSmsChannelsTablesState,
		filters: { channelType: "SMS_INTERNATIONAL" },
	},
	"local-sms-channel-source-listings": initialSmsChannelsTablesState,
	"local-sms-channel-source-opted-out-list": { ...initialSmsChannelsTablesState, filters: { countries: undefined } },
	"local-sms-channel-source-requests-completed": {
		...initialSmsChannelsTablesState,
		filters: { channelSourceRequestStatus: "COMPLETED", channelType: "SMS_LOCAL" },
	},
	"local-sms-channel-source-requests-pending": {
		...initialSmsChannelsTablesState,
		filters: { channelSourceRequestStatus: "PENDING", channelType: "SMS_LOCAL" },
	},
	"local-sms-channel-sources": { ...initialSmsChannelsTablesState, filters: { channelType: "SMS_LOCAL" } },
	segments: { ...initialDataViewBaseState, filters: {} },
	"sms-industry-templates": { ...initialCompactDataViewBaseState, filters: {} },
	"sms-prebuilt-templates": {
		...initialCompactDataViewBaseState,
		filters: { filterBy: "ALL", industryId: "ALL" },
	},
	"sms-prebuilt-templates-dialog": {
		...initialCompactDataViewBaseState,
		filters: { filterBy: "ALL", industryId: "ALL" },
	},
	"sms-templates": { ...initialCompactDataViewBaseState, filters: {} },
}

export default dataViewSliceInitialState
