//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { SharedListViewProps } from "@/core/types"
import type { ChannelSource } from "@/features/channels/common/types/data.types"
import type { SmsChannelSourceDataViewKey } from "@/features/channels/sms-senders/types/data.types"

import DataView from "@/core/components/data-view/data-view"
import channelSourcesTableColumns from "@/features/channels/sms-senders/constants/channel-sources-table-columns"
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

const AdminChannelSourcesViewTopbar = lazy(() => import("./admin-channel-sources-view-topbar"))

const ChannelSourcesViewFiltersContent = lazy(
	() => import("@/features/channels/sms-senders/views/channel-sources-view/channel-sources-view-filters-content")
)

const AdminChannelSourcesViewTableActions = lazy(() => import("./admin-channel-sources-view-table-actions"))
//#endregion

interface AdminChannelSourcesViewProps extends SharedListViewProps<ChannelSource> {
	dataViewKey: SmsChannelSourceDataViewKey
}
const AdminChannelSourcesView = ({ dataViewKey, ...props }: AdminChannelSourcesViewProps) => {
	const navigate = useNavigate()

	return (
		<DataView columns={columns} dataViewKey={dataViewKey} {...props}>
			<DataView.FiltersBar>
				<DataView.FiltersBar.Header />
				<DataView.FiltersBar.Content>
					<ChannelSourcesViewFiltersContent />
				</DataView.FiltersBar.Content>
				<DataView.FiltersBar.Footer />
			</DataView.FiltersBar>

			<DataView.Content>
				<DataView.TopBar>
					<AdminChannelSourcesViewTopbar />
				</DataView.TopBar>

				<DataView.Body onRowClick={({ id }) => navigate(id)} />

				<DataView.Pagination pageLimits={[20, 40, 60, 80]} />
			</DataView.Content>
		</DataView>
	)
}

export default AdminChannelSourcesView

const columns: ColumnType<ChannelSource>[] = [
	...channelSourcesTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id }) => <AdminChannelSourcesViewTableActions id={id} />,
	},
]
