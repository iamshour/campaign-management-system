//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import AdvancedTable from "@/core/components/advanced-table"
import type { SharedListViewProps } from "@/core/types"
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import smsTemplatesTableClassNames from "@/features/templates/sms-templates/constants/sms-templates-table-classnames"
import smsTemplatesTableColumns from "@/features/templates/sms-templates/constants/sms-templates-table-columns"
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"
import type { ColumnType } from "@/ui"

const SmsIndustryTemplatesViewTopbar = lazy(() => import("./sms-industry-templates-view-topbar"))
const SmsIndustryTemplatesViewTableActions = lazy(() => import("./sms-industry-templates-view-table-actions"))
const SmsIndustryTemplatesViewFiltersContent = lazy(() => import("./sms-industry-templates-view-filters-content"))
//#endregion

const SmsIndustryTemplatesView = ({ count, ...tableProps }: SharedListViewProps<SmsIndustryTemplateType>) => {
	const navigate = useNavigate()

	return (
		<AdvancedTable tableKey='sms-industry-templates' count={count}>
			<AdvancedTable.FiltersBar>
				<AdvancedTable.FiltersBar.Header />
				<AdvancedTable.FiltersBar.Content>
					<SmsIndustryTemplatesViewFiltersContent />
				</AdvancedTable.FiltersBar.Content>
				<AdvancedTable.FiltersBar.Footer />
			</AdvancedTable.FiltersBar>

			<AdvancedTable.Content>
				<AdvancedTable.TopBar>
					<SmsIndustryTemplatesViewTopbar />
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

export default SmsIndustryTemplatesView

const columns: ColumnType<SmsTemplateType>[] = [
	...smsTemplatesTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id }) => <SmsIndustryTemplatesViewTableActions id={id} />,
	},
]
