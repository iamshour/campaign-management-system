//#region Import
import type { DataViewKey } from "@/core/components/data-view/types"
import type { SharedListViewProps } from "@/core/types"
import type { FetchListingRequestDetailsIds } from "@/features/channels/common/types/data.types"
import type { ChannelSourceRequest } from "@/features/channels/sms-senders-management/types/data.types"

import DataView from "@/core/components/data-view/data-view"
import channelSourceRequestsPendingTableColumns from "@/features/channels/sms-senders-management/constants/channel-source-requests-pending-table-columns"
import ChannelSourceRequestDetailsDialog from "@/features/channels/sms-senders-management/dialogs/channel-source-request-details-dialog/channel-source-request-details-dialog"
import { lazy, useState } from "react"

const ChannelSourceRequestsPendingViewTopbar = lazy(() => import("./channel-source-requests-pending-view-topbar"))

const ChannelSourceRequestsPendingViewFiltersContent = lazy(
	() => import("./channel-source-requests-pending-view-filters-content")
)
//#endregion

interface ChannelSourceRequestsPendingViewProps extends SharedListViewProps<ChannelSourceRequest> {
	dataViewKey: Extract<
		DataViewKey,
		"international-sms-channel-source-requests-pending" | "local-sms-channel-source-requests-pending"
	>
}

const ChannelSourceRequestsPendingView = (props: ChannelSourceRequestsPendingViewProps) => {
	const [ids, setIds] = useState<FetchListingRequestDetailsIds | undefined>(undefined)

	return (
		<>
			<DataView className='border-t border-t-[#E9E9E9]' columns={channelSourceRequestsPendingTableColumns} {...props}>
				<DataView.FiltersBar>
					<DataView.FiltersBar.Header />
					<DataView.FiltersBar.Content>
						<ChannelSourceRequestsPendingViewFiltersContent />
					</DataView.FiltersBar.Content>
					<DataView.FiltersBar.Footer />
				</DataView.FiltersBar>

				<DataView.Content>
					<DataView.TopBar>
						<ChannelSourceRequestsPendingViewTopbar />
					</DataView.TopBar>

					<DataView.Body<ChannelSourceRequest>
						classNames={{ emptyTableCell: "h-[calc(100vh-410px)]" }}
						onRowClick={({ channelSourceListingId, channelSourceRequestId }) =>
							setIds({ channelSourceListingId, channelSourceRequestId })
						}
					/>

					<DataView.Pagination pageLimits={[20, 40, 60, 80]} />
				</DataView.Content>
			</DataView>

			<ChannelSourceRequestDetailsDialog
				ids={ids}
				onOpenChange={(open) => !open && setIds(undefined)}
				open={ids !== undefined}
			/>
		</>
	)
}

export default ChannelSourceRequestsPendingView
