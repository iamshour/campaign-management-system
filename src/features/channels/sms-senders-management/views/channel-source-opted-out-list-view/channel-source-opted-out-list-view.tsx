//#region Import
import type { DataViewKey } from "@/core/components/data-view/types"
import type { SharedListViewProps } from "@/core/types"
import type { ChannelSourceOptOut } from "@/features/channels/sms-senders-management/types/data.types"

import DataView from "@/core/components/data-view/data-view"
import { checkItem } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import smsOptedOutSendersTableColumns from "@/features/channels/sms-senders-management/constants/sms-opted-out-senders-table-columns"
import { lazy } from "react"

const SmsOptedOutViewTopbar = lazy(() => import("./channel-source-opted-out-list-view-topbar"))

const ChannelSourceOptedOutListViewFiltersContent = lazy(
	() => import("./channel-source-opted-out-list-view-filters-content")
)
//#endregion

interface ChannelSourceOptedOutListViewProps extends SharedListViewProps<ChannelSourceOptOut> {
	dataViewKey: Extract<
		DataViewKey,
		"international-sms-channel-source-opted-out-list" | "local-sms-channel-source-opted-out-list"
	>
}

const ChannelSourceOptedOutListView = (props: ChannelSourceOptedOutListViewProps) => {
	const dispatch = useDispatch()

	return (
		<DataView className='border-t border-t-[#E9E9E9]' columns={smsOptedOutSendersTableColumns} {...props}>
			<DataView.FiltersBar>
				<DataView.FiltersBar.Header />
				<DataView.FiltersBar.Content>
					<ChannelSourceOptedOutListViewFiltersContent />
				</DataView.FiltersBar.Content>
				<DataView.FiltersBar.Footer />
			</DataView.FiltersBar>

			<DataView.Content>
				<DataView.TopBar>
					<SmsOptedOutViewTopbar />
				</DataView.TopBar>

				<DataView.Body onRowClick={({ id }) => dispatch(checkItem({ [props.dataViewKey]: id }))} />

				<DataView.Pagination pageLimits={[20, 40, 60, 80]}>
					<DataView.Pagination.Message />
				</DataView.Pagination>
			</DataView.Content>
		</DataView>
	)
}

export default ChannelSourceOptedOutListView
