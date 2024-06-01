//#region Import
import type { DataViewKey } from "@/core/components/data-view/types"
import type { SharedListViewProps } from "@/core/types"
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import DataView from "@/core/components/data-view/data-view"
import adminListingsTableColumns from "@/features/channels/sms-senders-management/constants/admin-listings-table-columns"
import AdminListingDetailsDialog from "@/features/channels/sms-senders-management/dialogs/admin-listing-details-dialog/admin-listing-details-dialog"
import { lazy, useState } from "react"

const AdminSmsSendersViewTopbar = lazy(() => import("./admin-listings-view-topbar"))

const AdminListingsViewFiltersContent = lazy(() => import("./admin-listings-view-filters-content"))
//#endregion

interface AdminListingsViewProps extends SharedListViewProps<ChannelSourceListing> {
	dataViewKey: Extract<DataViewKey, "international-sms-channel-source-listings" | "local-sms-channel-source-listings">
}

const AdminListingsView = (props: AdminListingsViewProps) => {
	const [listingId, setListingId] = useState<string | undefined>(undefined)

	return (
		<>
			<DataView columns={adminListingsTableColumns} {...props}>
				<DataView.FiltersBar>
					<DataView.FiltersBar.Header />
					<DataView.FiltersBar.Content>
						<AdminListingsViewFiltersContent />
					</DataView.FiltersBar.Content>
					<DataView.FiltersBar.Footer />
				</DataView.FiltersBar>

				<DataView.Content>
					<DataView.TopBar>
						<AdminSmsSendersViewTopbar />
					</DataView.TopBar>

					<DataView.Body
						classNames={{ emptyTableCell: "h-[calc(100vh-268px)]" }}
						onRowClick={({ id }) => setListingId(id)}
					/>

					<DataView.Pagination pageLimits={[20, 40, 60, 80]} />
				</DataView.Content>
			</DataView>

			<AdminListingDetailsDialog
				id={listingId}
				onOpenChange={(open) => !open && setListingId(undefined)}
				open={!!listingId?.length}
			/>
		</>
	)
}

export default AdminListingsView
