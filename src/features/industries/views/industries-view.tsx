//#region Import
import AdvancedTable from "@/core/components/advanced-table"
import type { SharedListViewProps } from "@/core/types"

import industriesTableColumns from "../constants/industries-table-columns"
import type { IndustryType } from "../types"
//#endregion

const IndustriesView = ({ count, ...tableProps }: SharedListViewProps<IndustryType>) => {
	return (
		<>
			<AdvancedTable tableKey='industries' count={count}>
				<AdvancedTable.FiltersBar>
					<AdvancedTable.FiltersBar.Header />
					<AdvancedTable.FiltersBar.Content />
					<AdvancedTable.FiltersBar.Footer />
				</AdvancedTable.FiltersBar>

				<AdvancedTable.Content>
					<AdvancedTable.TopBar />

					<AdvancedTable.Table columns={industriesTableColumns} {...tableProps} />
					<AdvancedTable.Pagination />
				</AdvancedTable.Content>
			</AdvancedTable>
		</>
	)
}

export default IndustriesView
