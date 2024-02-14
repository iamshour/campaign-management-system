//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import AdvancedTable from "@/core/components/advanced-table"
import type { SharedListViewProps } from "@/core/types"
import smsTemplatesTableClassNames from "@/features/templates/sms-templates/constants/sms-templates-table-classnames"
import smsTemplatesTableColumns from "@/features/templates/sms-templates/constants/sms-templates-table-columns"
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"
import type { ColumnType } from "@/ui"

const SmsTemplatesViewTopbar = lazy(() => import("./sms-templates-view-topbar"))
const SmsTemplatesViewFiltersContent = lazy(() => import("./sms-templates-view-filters-content"))
const SmsTemplatesViewTableActions = lazy(() => import("./sms-templates-view-table-actions"))
//#endregion

const SmsTemplatesView = ({ count, ...tableProps }: SharedListViewProps<SmsTemplateType>) => {
	const navigate = useNavigate()

	return (
		<AdvancedTable tableKey='sms-templates' count={count}>
			<AdvancedTable.FiltersBar>
				<AdvancedTable.FiltersBar.Header />
				<AdvancedTable.FiltersBar.Content>
					<SmsTemplatesViewFiltersContent />
				</AdvancedTable.FiltersBar.Content>
				<AdvancedTable.FiltersBar.Footer />
			</AdvancedTable.FiltersBar>

			<AdvancedTable.Content>
				<AdvancedTable.TopBar>
					<SmsTemplatesViewTopbar />
				</AdvancedTable.TopBar>

				<AdvancedTable.Body
					columns={columns}
					classNames={smsTemplatesTableClassNames}
					onRowClick={({ id }) => navigate(id)}
					{...tableProps}
				/>
				<AdvancedTable.Pagination pageLimits={[10, 20, 30]}>
					<AdvancedTable.Pagination.Message />
				</AdvancedTable.Pagination>
			</AdvancedTable.Content>
		</AdvancedTable>
	)
}

export default SmsTemplatesView

const columns: ColumnType<SmsTemplateType>[] = [
	...smsTemplatesTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id }) => <SmsTemplatesViewTableActions id={id} />,
	},
]
