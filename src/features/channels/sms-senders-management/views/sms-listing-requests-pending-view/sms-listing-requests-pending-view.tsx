//#region Import
import type { DataViewKey } from "@/core/components/data-view/types"
import type { SharedListViewProps } from "@/core/types"

import DataView from "@/core/components/data-view/data-view"
import useGetChannelType from "@/core/hooks/useGetChannelType"
import smsListingRequestsPendingTableColumns from "@/features/channels/sms-senders-management/constants/sms-listing-requests-pending-table-columns"
import SmsListingRequestDetailsDialog from "@/features/channels/sms-senders-management/dialogs/sms-listing-request-details-dialog/sms-listing-request-details-dialog"
import { lazy, useState } from "react"

const SmsListingRequestsPendingViewFiltersContent = lazy(
	() => import("./sms-listing-requests-pending-view-filters-content")
)
//#endregion

const SmsListingRequestsPendingView = (props: SharedListViewProps<any>) => {
	const [requestDetailsId, setRequestDetailsId] = useState<string | undefined>(undefined)

	const { type } = useGetChannelType()

	return (
		<>
			<DataView
				className='border-t border-t-[#E9E9E9]'
				columns={smsListingRequestsPendingTableColumns}
				dataViewKey={`${type}-sms-listing-pending-requests` as DataViewKey}
				{...props}>
				<DataView.FiltersBar>
					<DataView.FiltersBar.Header />
					<DataView.FiltersBar.Content>
						<SmsListingRequestsPendingViewFiltersContent />
					</DataView.FiltersBar.Content>
					<DataView.FiltersBar.Footer />
				</DataView.FiltersBar>

				<DataView.Content className='px-8'>
					<DataView.TopBar />

					<DataView.Body onRowClick={({ id }) => setRequestDetailsId(id)} />

					<DataView.Pagination pageLimits={[20, 40, 60, 80]} />
				</DataView.Content>
			</DataView>

			<SmsListingRequestDetailsDialog
				id={requestDetailsId}
				onOpenChange={(open) => !open && setRequestDetailsId(undefined)}
				open={!!requestDetailsId?.length}
			/>
		</>
	)
}

export default SmsListingRequestsPendingView
