//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { ContactExports } from "@/features/people/exports/types"

import DataView from "@/core/components/data-view/data-view"
import exportsTableColumns from "@/features/people/exports/constants/exports-table-columns"
import { lazy } from "react"

const ExportsViewFiltersContent = lazy(() => import("./exports-view-filters-content"))
//#endregion

const ExportsView = (props: SharedListViewProps<ContactExports>) => (
	<DataView columns={exportsTableColumns} dataViewKey='contacts-exports' {...props}>
		<DataView.FiltersBar>
			<DataView.FiltersBar.Header />
			<DataView.FiltersBar.Content>
				<ExportsViewFiltersContent />
			</DataView.FiltersBar.Content>
			<DataView.FiltersBar.Footer />
		</DataView.FiltersBar>

		<DataView.Content>
			<DataView.TopBar />

			<DataView.Body />
			<DataView.Pagination />
		</DataView.Content>
	</DataView>
)

export default ExportsView
