//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { SmsChannelSourceDataViewKey, SmsSenderType } from "@/features/channels/sms-senders/types"

import { ColumnType } from "@/core/components/data-view/data-table/types"
import DataView from "@/core/components/data-view/data-view"
import channelSourcesTableColumns from "@/features/channels/sms-senders/constants/channel-sources-table-columns"
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import ChannelSourceCard from "./channel-source-card"

const ChannelSourcesViewTopbar = lazy(() => import("./channel-sources-view-topbar"))

const ChannelSourcesViewFiltersContent = lazy(() => import("./channel-sources-view-filters-content"))

const ChannelSourcesListViewTableActions = lazy(() => import("./channel-sources-list-view-table-actions"))
//#endregion

interface ChannelSourcesViewProps extends SharedListViewProps<SmsSenderType> {
	dataViewKey: SmsChannelSourceDataViewKey
}
const ChannelSourcesView = ({ dataViewKey, ...props }: ChannelSourcesViewProps) => {
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
					<ChannelSourcesViewTopbar />
				</DataView.TopBar>

				<DataView.MultiViewLayout>
					<DataView.Body GridCard={ChannelSourceCard} onRowClick={({ id }) => navigate(id)} />
				</DataView.MultiViewLayout>

				<DataView.Pagination pageLimits={[20, 40, 60, 80]} />
			</DataView.Content>
		</DataView>
	)
}

export default ChannelSourcesView

const columns: ColumnType<SmsSenderType>[] = [
	...channelSourcesTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id, name }) => <ChannelSourcesListViewTableActions id={id} name={name} />,
	},
]
