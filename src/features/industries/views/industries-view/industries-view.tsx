//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { IndustryType } from "@/features/industries/types"

import DataView from "@/core/components/data-view/data-view"
import industriesTableColumns from "@/features/industries/constants/industries-table-columns"
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import IndustryCard from "./industry-card"

const IndustriesViewFiltersContent = lazy(() => import("./industries-view-filters-content"))

const IndustriesViewTopBar = lazy(() => import("./industries-view-topbar"))
//#endregion

const IndustriesView = (props: SharedListViewProps<IndustryType>) => {
	const navigate = useNavigate()

	return (
		<DataView columns={industriesTableColumns} dataViewKey='industries' {...props}>
			<DataView.FiltersBar>
				<DataView.FiltersBar.Header />
				<DataView.FiltersBar.Content>
					<IndustriesViewFiltersContent />
				</DataView.FiltersBar.Content>
				<DataView.FiltersBar.Footer />
			</DataView.FiltersBar>

			<DataView.Content>
				<DataView.TopBar>
					<IndustriesViewTopBar />
				</DataView.TopBar>

				<DataView.MultiViewLayout>
					<DataView.Body
						classNames={{ emptyTableCell: "h-[calc(100vh-340px)]" }}
						GridCard={IndustryCard}
						onRowClick={({ id }) => navigate(`${id}/sms`)}
					/>
				</DataView.MultiViewLayout>

				<DataView.Pagination />
			</DataView.Content>
		</DataView>
	)
}

export default IndustriesView
