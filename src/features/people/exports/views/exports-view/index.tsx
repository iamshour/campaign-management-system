//#region Import
import { lazy } from "react"

import AdvancedTable from "@/core/components/advanced-table"
import type { SharedListViewProps } from "@/core/types"
import exportsTableColumns from "@/features/people/exports/constants/exports-table-columns"
import type { ContactExports } from "@/features/people/exports/types"

const FiltersContent = lazy(() => import("./filters-content"))
//#endregion

const ExportsView = ({ count, ...tableProps }: SharedListViewProps<ContactExports>) => (
	<AdvancedTable tableKey='contacts-exports' count={count}>
		<AdvancedTable.FiltersBar>
			<AdvancedTable.FiltersBar.Header />
			<AdvancedTable.FiltersBar.Content>
				<FiltersContent />
			</AdvancedTable.FiltersBar.Content>
			<AdvancedTable.FiltersBar.Footer />
		</AdvancedTable.FiltersBar>

		<AdvancedTable.Content>
			<AdvancedTable.TopBar />

			<AdvancedTable.Table
				columns={exportsTableColumns}
				classNames={{
					wrapper: "px-4",
				}}
				{...tableProps}
			/>
			<AdvancedTable.Pagination />
		</AdvancedTable.Content>
	</AdvancedTable>
)

export default ExportsView
