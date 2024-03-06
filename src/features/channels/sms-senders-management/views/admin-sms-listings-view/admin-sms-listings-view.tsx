//#region Import
import type { DataViewKey } from "@/core/components/data-view/types"
import type { SharedListViewProps } from "@/core/types"
import type { SmsListingType } from "@/features/channels/common/types"

import DataView from "@/core/components/data-view/data-view"
import smsListingsTableColumns from "@/features/channels/sms-senders-management/constants/sms-listings-table-columns"
import SmsListingDetailsDialog from "@/features/channels/sms-senders-management/dialogs/sms-listing-details-dialog/sms-listing-details-dialog"
import { lazy, useState } from "react"

const AdminSmsSendersViewTopbar = lazy(() => import("./admin-sms-listings-view-topbar"))

const AdminSmsListingsViewFiltersContent = lazy(() => import("./admin-sms-listings-view-filters-content"))
//#endregion

interface AdminSmsListingsViewProps extends SharedListViewProps<SmsListingType> {
	dataViewKey: Extract<DataViewKey, "international-sms-listings" | "local-sms-listings">
}

const AdminSmsListingsView = (props: AdminSmsListingsViewProps) => {
	const [listingId, setListingId] = useState<string | undefined>(undefined)

	return (
		<>
			<DataView columns={smsListingsTableColumns} {...props}>
				<DataView.FiltersBar>
					<DataView.FiltersBar.Header />
					<DataView.FiltersBar.Content>
						<AdminSmsListingsViewFiltersContent />
					</DataView.FiltersBar.Content>
					<DataView.FiltersBar.Footer />
				</DataView.FiltersBar>

				<DataView.Content>
					<DataView.TopBar>
						<AdminSmsSendersViewTopbar />
					</DataView.TopBar>

					<DataView.Body onRowClick={({ id }) => setListingId(id)} />

					<DataView.Pagination pageLimits={[20, 40, 60, 80]} />
				</DataView.Content>
			</DataView>

			<SmsListingDetailsDialog
				id={listingId}
				onOpenChange={(open) => !open && setListingId(undefined)}
				open={!!listingId?.length}
			/>
		</>
	)
}

export default AdminSmsListingsView
