//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { SharedListViewProps } from "@/core/types"
import type { SmsSenderDataViewKeyOptions, SmsSenderType } from "@/features/channels/sms-senders/types"

import DataView from "@/core/components/data-view/data-view"
import smsSendersTableColumns from "@/features/channels/sms-senders/constants/sms-sender-table-columns"
import { lazy, memo } from "react"

import SmsSenderCard from "./sms-sender-card"

const SmsSendersViewTopbar = lazy(() => import("./sms-senders-view-topbar"))

const SmsSendersViewFiltersContent = lazy(() => import("./sms-senders-view-filters-content"))

const SmsSendersListViewTableActions = lazy(() => import("./sms-senders-list-view-table-actions"))
//#endregion

interface SmsSendersViewProps extends SharedListViewProps<SmsSenderType> {
	dataViewKey: SmsSenderDataViewKeyOptions
}
const SmsSendersView = memo(({ dataViewKey, ...props }: SmsSendersViewProps) => {
	return (
		<DataView columns={columns} dataViewKey={dataViewKey} {...props}>
			<DataView.FiltersBar>
				<DataView.FiltersBar.Header />
				<DataView.FiltersBar.Content>
					<SmsSendersViewFiltersContent dataViewKey={dataViewKey} />
				</DataView.FiltersBar.Content>
				<DataView.FiltersBar.Footer />
			</DataView.FiltersBar>

			<DataView.Content>
				<DataView.TopBar>
					<SmsSendersViewTopbar />
				</DataView.TopBar>

				<DataView.MultiViewLayout>
					<DataView.Body
						classNames={{ wrapper: "px-4" }}
						GridCard={SmsSenderCard}
						onRowClick={({ id }) =>
							// eslint-disable-next-line no-console
							console.log(id)
						}
					/>
				</DataView.MultiViewLayout>

				<DataView.Pagination pageLimits={[10, 20, 30]} />
			</DataView.Content>
		</DataView>
	)
})

SmsSendersView.displayName = "SmsSendersView"

export default SmsSendersView

const columns: ColumnType<SmsSenderType>[] = [
	...smsSendersTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id, name }) => <SmsSendersListViewTableActions id={id} name={name} />,
	},
]
