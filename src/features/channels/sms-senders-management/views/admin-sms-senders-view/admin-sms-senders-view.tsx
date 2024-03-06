//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { SharedListViewProps } from "@/core/types"
import type { SmsSenderDataViewKeyOptions, SmsSenderType } from "@/features/channels/sms-senders/types"

import DataView from "@/core/components/data-view/data-view"
import smsSendersTableColumns from "@/features/channels/sms-senders/constants/sms-sender-table-columns"
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

const AdminSmsSendersViewTopbar = lazy(() => import("./admin-sms-senders-view-topbar"))

const SmsSendersViewFiltersContent = lazy(
	() => import("@/features/channels/sms-senders/views/sms-senders-view/sms-senders-view-filters-content")
)

const AdminSmsSendersTableActions = lazy(() => import("./admin-sms-senders-table-actions"))
//#endregion

interface SmsSendersViewProps extends SharedListViewProps<SmsSenderType> {
	dataViewKey: SmsSenderDataViewKeyOptions
}
const AdminSmsSendersView = ({ dataViewKey, ...props }: SmsSendersViewProps) => {
	const navigate = useNavigate()

	return (
		<DataView columns={columns} dataViewKey={dataViewKey} {...props}>
			<DataView.FiltersBar>
				<DataView.FiltersBar.Header />
				<DataView.FiltersBar.Content>
					<SmsSendersViewFiltersContent />
				</DataView.FiltersBar.Content>
				<DataView.FiltersBar.Footer />
			</DataView.FiltersBar>

			<DataView.Content>
				<DataView.TopBar>
					<AdminSmsSendersViewTopbar />
				</DataView.TopBar>

				<DataView.Body onRowClick={({ id }) => navigate(id)} />

				<DataView.Pagination pageLimits={[20, 40, 60, 80]} />
			</DataView.Content>
		</DataView>
	)
}

export default AdminSmsSendersView

const columns: ColumnType<SmsSenderType>[] = [
	...smsSendersTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id }) => <AdminSmsSendersTableActions id={id} />,
	},
]
