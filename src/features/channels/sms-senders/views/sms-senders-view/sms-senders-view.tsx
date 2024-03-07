//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { SmsSenderDataViewKeyOptions, SmsSenderType } from "@/features/channels/sms-senders/types"

import DataView from "@/core/components/data-view/data-view"
import smsSendersTableColumns from "@/features/channels/sms-senders/constants/sms-sender-table-columns"
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import SmsSenderCard from "./sms-sender-card"

const SmsSendersViewTopbar = lazy(() => import("./sms-senders-view-topbar"))

const SmsSendersViewFiltersContent = lazy(() => import("./sms-senders-view-filters-content"))
//#endregion

interface SmsSendersViewProps extends SharedListViewProps<SmsSenderType> {
	dataViewKey: SmsSenderDataViewKeyOptions
}
const SmsSendersView = ({ dataViewKey, ...props }: SmsSendersViewProps) => {
	const navigate = useNavigate()

	return (
		<DataView columns={smsSendersTableColumns} dataViewKey={dataViewKey} {...props}>
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

				<DataView.Pagination pageLimits={[10, 20, 30]} />
			</DataView.Content>
		</DataView>
	)
}

export default SmsSendersView
