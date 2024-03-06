//#region Import
import type { DataViewKey } from "@/core/components/data-view/types"
import type { SharedListViewProps } from "@/core/types"
import type { SmsListingRequest } from "@/features/channels/sms-senders-management/types"

import DataView from "@/core/components/data-view/data-view"
import smsListingRequestsPendingTableColumns from "@/features/channels/sms-senders-management/constants/sms-listing-requests-pending-table-columns"
import SmsListingRequestDetailsDialog from "@/features/channels/sms-senders-management/dialogs/sms-listing-request-details-dialog/sms-listing-request-details-dialog"
import { lazy, useState } from "react"

const SmsListingRequestsPendingViewTopbar = lazy(() => import("./sms-listing-requests-pending-view-topbar"))

const SmsListingRequestsPendingViewFiltersContent = lazy(
	() => import("./sms-listing-requests-pending-view-filters-content")
)
//#endregion

interface SmsListingRequestsPendingViewProps extends SharedListViewProps<SmsListingRequest> {
	dataViewKey: Extract<DataViewKey, "international-sms-listing-pending-requests" | "local-sms-listing-pending-requests">
}

const SmsListingRequestsPendingView = (props: SmsListingRequestsPendingViewProps) => {
	const [requestId, setRequestId] = useState<string | undefined>(undefined)

	return (
		<>
			<DataView className='border-t border-t-[#E9E9E9]' columns={smsListingRequestsPendingTableColumns} {...props}>
				<DataView.FiltersBar>
					<DataView.FiltersBar.Header />
					<DataView.FiltersBar.Content>
						<SmsListingRequestsPendingViewFiltersContent />
					</DataView.FiltersBar.Content>
					<DataView.FiltersBar.Footer />
				</DataView.FiltersBar>

				<DataView.Content>
					<DataView.TopBar>
						<SmsListingRequestsPendingViewTopbar />
					</DataView.TopBar>

					<DataView.Body onRowClick={({ id }) => setRequestId(id)} />

					<DataView.Pagination pageLimits={[20, 40, 60, 80]} />
				</DataView.Content>
			</DataView>

			<SmsListingRequestDetailsDialog
				id={requestId}
				onOpenChange={(open) => !open && setRequestId(undefined)}
				open={!!requestId?.length}
			/>
		</>
	)
}

export default SmsListingRequestsPendingView
