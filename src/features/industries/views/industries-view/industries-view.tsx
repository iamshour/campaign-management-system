//#region Import

import AdvancedTable from "@/core/components/advanced-table"
import type { SharedListViewProps } from "@/core/types"
import industriesTableColumns from "@/features/industries/constants/industries-table-columns"
import CreateIndustryDialog from "@/features/industries/dialogs/create-industry-dialog/create-industry-dialog"
import type { IndustryType } from "@/features/industries/types"
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
					<AdvancedTable.TopBar>
						<CreateIndustryDialog />
					</AdvancedTable.TopBar>

					<AdvancedTable.Table columns={industriesTableColumns} {...tableProps} />
					<AdvancedTable.Pagination />
				</AdvancedTable.Content>
			</AdvancedTable>
		</>
	)
}

export default IndustriesView
