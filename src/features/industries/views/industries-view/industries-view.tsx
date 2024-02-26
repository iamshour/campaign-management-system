//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { IndustryType } from "@/features/industries/types"

import DataGrid from "@/core/components/data-grid/data-grid"
import industriesTableColumns from "@/features/industries/constants/industries-table-columns"
import { lazy } from "react"
import { useNavigate } from "react-router"

import IndustryCard from "./industry-card"

const IndustriesViewFiltersContent = lazy(() => import("./industries-view-filters-content"))

const IndustriesViewTopBar = lazy(() => import("./industries-view-topbar"))
//#endregion

const IndustriesView = (props: SharedListViewProps<IndustryType>) => {
	const navigate = useNavigate()

	return (
		<DataGrid columns={industriesTableColumns} dataGridKey='industries' {...props}>
			<DataGrid.FiltersBar>
				<DataGrid.FiltersBar.Header />
				<DataGrid.FiltersBar.Content>
					<IndustriesViewFiltersContent />
				</DataGrid.FiltersBar.Content>
				<DataGrid.FiltersBar.Footer />
			</DataGrid.FiltersBar>

			<DataGrid.Content>
				<DataGrid.TopBar>
					<IndustriesViewTopBar />
				</DataGrid.TopBar>

				<DataGrid.MultiViewLayout>
					<DataGrid.Body
						classNames={{ emptyTableCell: "h-[calc(100vh-340px)]", wrapper: "px-4" }}
						GridCard={IndustryCard}
						onRowClick={({ id }) => navigate(`${id}/sms`)}
					/>
				</DataGrid.MultiViewLayout>

				<DataGrid.Pagination />
			</DataGrid.Content>
		</DataGrid>
	)
}

export default IndustriesView
