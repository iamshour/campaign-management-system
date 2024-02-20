//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router"

import DataGrid from "@/core/components/data-grid"
import type { SharedListViewProps } from "@/core/types"
import industriesTableColumns from "@/features/industries/constants/industries-table-columns"
import type { IndustryType } from "@/features/industries/types"

import IndustryCard from "./industry-card"

const IndustriesViewFiltersContent = lazy(() => import("./industries-view-filters-content"))
const IndustriesViewTopBar = lazy(() => import("./industries-view-topbar"))
//#endregion

const IndustriesView = ({ count, ...tableProps }: SharedListViewProps<IndustryType>) => {
	const navigate = useNavigate()

	return (
		<DataGrid dataGridKey='industries' count={count}>
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
						GridCard={IndustryCard}
						columns={industriesTableColumns}
						classNames={{ wrapper: "px-4", emptyTableCell: "h-[calc(100vh-340px)]" }}
						onRowClick={({ id }) => navigate(`${id}/sms`)}
						{...tableProps}
					/>
				</DataGrid.MultiViewLayout>

				<DataGrid.Pagination />
			</DataGrid.Content>
		</DataGrid>
	)
}

export default IndustriesView
