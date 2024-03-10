//#region Import
import type { DataViewKey } from "@/core/components/data-view/types"
import type { SharedListViewProps } from "@/core/types"
import type { ChannelSourceRequest } from "@/features/channels/sms-senders-management/types/data.types"

import DataView from "@/core/components/data-view/data-view"
import { FetchListingRequestDetailsIds } from "@/features/channels/common/types/data.types"
import smsListingRequestsCompletedTableColumns from "@/features/channels/sms-senders-management/constants/sms-listing-requests-completed-table-columns"
import SmsListingRequestDetailsDialog from "@/features/channels/sms-senders-management/dialogs/sms-listing-request-details-dialog/sms-listing-request-details-dialog"
import { lazy, useState } from "react"

const SmsListingRequestsCompletedViewFiltersContent = lazy(
	() => import("./sms-listing-requests-completed-view-filters-content")
)
//#endregion

interface SmsListingRequestsCompletedViewProps extends SharedListViewProps<ChannelSourceRequest> {
	dataViewKey: Extract<
		DataViewKey,
		"international-sms-channel-source-requests-completed" | "local-sms-channel-source-requests-completed"
	>
}

const SmsListingRequestsCompletedView = (props: SmsListingRequestsCompletedViewProps) => {
	const [ids, setIds] = useState<FetchListingRequestDetailsIds | undefined>(undefined)

	return (
		<>
			<DataView className='border-t border-t-[#E9E9E9]' columns={smsListingRequestsCompletedTableColumns} {...props}>
				<DataView.FiltersBar>
					<DataView.FiltersBar.Header />
					<DataView.FiltersBar.Content>
						<SmsListingRequestsCompletedViewFiltersContent />
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

			<SmsListingRequestDetailsDialog
				ids={ids}
				onOpenChange={(open) => !open && setIds(undefined)}
				open={ids !== undefined}
			/>
		</>
	)
}

export default SmsListingRequestsCompletedView
