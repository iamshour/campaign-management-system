//#region Import
import { lazy } from "react"

import DataGrid from "@/core/components/data-grid"
import type { SharedListViewProps } from "@/core/types"
import exportsTableColumns from "@/features/people/exports/constants/exports-table-columns"
import type { ContactExports } from "@/features/people/exports/types"

const ExportsViewFiltersContent = lazy(() => import("./exports-view-filters-content"))
//#endregion

const ExportsView = ({ count, ...tableProps }: SharedListViewProps<ContactExports>) => (
	<DataGrid dataGridKey='contacts-exports' count={count}>
		<DataGrid.FiltersBar>
			<DataGrid.FiltersBar.Header />
			<DataGrid.FiltersBar.Content>
				<ExportsViewFiltersContent />
			</DataGrid.FiltersBar.Content>
			<DataGrid.FiltersBar.Footer />
		</DataGrid.FiltersBar>

		<DataGrid.Content>
			<DataGrid.TopBar />

			<DataGrid.Body columns={exportsTableColumns} classNames={{ wrapper: "px-4" }} {...tableProps} />
			<DataGrid.Pagination />
		</DataGrid.Content>
	</DataGrid>
)

export default ExportsView
