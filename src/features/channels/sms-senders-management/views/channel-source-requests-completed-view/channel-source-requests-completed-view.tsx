//#region Import
import type { DataViewKey } from "@/core/components/data-view/types"
import type { SharedListViewProps } from "@/core/types"
import type { ChannelSourceRequest } from "@/features/channels/sms-senders-management/types/data.types"

import DataView from "@/core/components/data-view/data-view"
import { FetchListingRequestDetailsIds } from "@/features/channels/common/types/data.types"
import channelSourceRequestsCompletedTableColumns from "@/features/channels/sms-senders-management/constants/channel-source-requests-completed-table-columns"
import ChannelSourceRequestDetailsDialog from "@/features/channels/sms-senders-management/dialogs/channel-source-request-details-dialog/channel-source-request-details-dialog"
import { lazy, useState } from "react"

const ChannelSourceRequestsCompletedViewFiltersContent = lazy(
	() => import("./channel-source-requests-completed-view-filters-content")
)
//#endregion

interface ChannelSourceRequestsCompletedViewProps extends SharedListViewProps<ChannelSourceRequest> {
	dataViewKey: Extract<
		DataViewKey,
		"international-sms-channel-source-requests-completed" | "local-sms-channel-source-requests-completed"
	>
}

const ChannelSourceRequestsCompletedView = (props: ChannelSourceRequestsCompletedViewProps) => {
	const [ids, setIds] = useState<FetchListingRequestDetailsIds | undefined>(undefined)

	return (
		<>
			<DataView className='border-t border-t-[#E9E9E9]' columns={channelSourceRequestsCompletedTableColumns} {...props}>
				<DataView.FiltersBar>
					<DataView.FiltersBar.Header />
					<DataView.FiltersBar.Content>
						<ChannelSourceRequestsCompletedViewFiltersContent />
					</DataView.FiltersBar.Content>
					<DataView.FiltersBar.Footer />
				</DataView.FiltersBar>

				<DataView.Content>
					<DataView.TopBar />

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

export default ChannelSourceRequestsCompletedView
