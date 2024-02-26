//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { ContactExports } from "@/features/people/exports/types"

import DataGrid from "@/core/components/data-grid/data-grid"
import exportsTableColumns from "@/features/people/exports/constants/exports-table-columns"
import { lazy } from "react"

const ExportsViewFiltersContent = lazy(() => import("./exports-view-filters-content"))
//#endregion

const ExportsView = (props: SharedListViewProps<ContactExports>) => (
	<DataGrid columns={exportsTableColumns} dataGridKey='contacts-exports' {...props}>
		<DataGrid.FiltersBar>
			<DataGrid.FiltersBar.Header />
			<DataGrid.FiltersBar.Content>
				<ExportsViewFiltersContent />
			</DataGrid.FiltersBar.Content>
			<DataGrid.FiltersBar.Footer />
		</DataGrid.FiltersBar>

		<DataGrid.Content>
			<DataGrid.TopBar />

			<DataGrid.Body classNames={{ wrapper: "px-4" }} />
			<DataGrid.Pagination />
		</DataGrid.Content>
	</DataGrid>
)

export default ExportsView
