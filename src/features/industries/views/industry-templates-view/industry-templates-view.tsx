//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import AdvancedTable from "@/core/components/advanced-table"
import type { SharedListViewProps } from "@/core/types"
import smsTemplatesTableClassNames from "@/features/templates/sms-templates/constants/sms-templates-table-classnames"
import smsTemplatesTableColumns from "@/features/templates/sms-templates/constants/sms-templates-table-columns"
import type { SmsPrebuiltTemplateType, SmsTemplateType } from "@/features/templates/sms-templates/types"
import type { ColumnType } from "@/ui"

const IndustryTemplatesViewTopbar = lazy(() => import("./industry-templates-view-topbar"))
const IndustryTemplatesViewTableActions = lazy(() => import("./industry-templates-view-table-actions"))
const IndustryTemplatesViewFiltersContent = lazy(() => import("./industry-templates-view-filters-content"))
//#endregion

const IndustrySmsPrebuiltTemplatesView = ({ count, ...tableProps }: SharedListViewProps<SmsPrebuiltTemplateType>) => {
	const navigate = useNavigate()

	return (
		<AdvancedTable tableKey='templates-in-industry' count={count}>
			<AdvancedTable.FiltersBar>
				<AdvancedTable.FiltersBar.Header />
				<AdvancedTable.FiltersBar.Content>
					<IndustryTemplatesViewFiltersContent />
				</AdvancedTable.FiltersBar.Content>
				<AdvancedTable.FiltersBar.Footer />
			</AdvancedTable.FiltersBar>

			<AdvancedTable.Content>
				<AdvancedTable.TopBar>
					<IndustryTemplatesViewTopbar />
				</AdvancedTable.TopBar>

				<AdvancedTable.Body
					columns={columns}
					classNames={smsTemplatesTableClassNames}
					onRowClick={({ id }) => navigate(id)}
					{...tableProps}
				/>
				<AdvancedTable.Pagination>
					<AdvancedTable.Pagination.Message />
				</AdvancedTable.Pagination>
			</AdvancedTable.Content>
		</AdvancedTable>
	)
}

export default IndustrySmsPrebuiltTemplatesView

const columns: ColumnType<SmsTemplateType>[] = [
	...smsTemplatesTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id }) => <IndustryTemplatesViewTableActions id={id} />,
	},
]
