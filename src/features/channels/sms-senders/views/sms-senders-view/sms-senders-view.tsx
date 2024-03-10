//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { SmsSenderDataViewKeyOptions, SmsSenderType } from "@/features/channels/sms-senders/types"

import { ColumnType } from "@/core/components/data-view/data-table/types"
import DataView from "@/core/components/data-view/data-view"
import smsSendersTableColumns from "@/features/channels/sms-senders/constants/sms-sender-table-columns"
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import SmsSenderCard from "./sms-sender-card"

const SmsSendersViewTopbar = lazy(() => import("./sms-senders-view-topbar"))

const SmsSendersViewFiltersContent = lazy(() => import("./sms-senders-view-filters-content"))

const SmsSendersListViewTableActions = lazy(() => import("./sms-senders-list-view-table-actions"))
//#endregion

interface SmsSendersViewProps extends SharedListViewProps<SmsSenderType> {
	dataViewKey: SmsSenderDataViewKeyOptions
}
const SmsSendersView = ({ dataViewKey, ...props }: SmsSendersViewProps) => {
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
					<SmsSendersViewTopbar />
				</DataView.TopBar>

				<DataView.MultiViewLayout>
					<DataView.Body GridCard={SmsSenderCard} onRowClick={({ id }) => navigate(id)} />
				</DataView.MultiViewLayout>

				<DataView.Pagination pageLimits={[20, 40, 60, 80]} />
			</DataView.Content>
		</DataView>
	)
}

export default SmsSendersView

const columns: ColumnType<SmsSenderType>[] = [
	...smsSendersTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id, name }) => <SmsSendersListViewTableActions id={id} name={name} />,
	},
]
