//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import DataGrid from "@/core/components/data-grid"
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
		<DataGrid dataGridKey='sms-templates' count={count}>
			<DataGrid.FiltersBar>
				<DataGrid.FiltersBar.Header />
				<DataGrid.FiltersBar.Content>
					<SmsTemplatesViewFiltersContent />
				</DataGrid.FiltersBar.Content>
				<DataGrid.FiltersBar.Footer />
			</DataGrid.FiltersBar>

			<DataGrid.Content>
				<DataGrid.TopBar>
					<SmsTemplatesViewTopbar />
				</DataGrid.TopBar>

				<DataGrid.Body
					columns={columns}
					classNames={smsTemplatesTableClassNames}
					onRowClick={({ id }) => navigate(id)}
					{...tableProps}
				/>
				<DataGrid.Pagination pageLimits={[10, 20, 30]}>
					<DataGrid.Pagination.Message />
				</DataGrid.Pagination>
			</DataGrid.Content>
		</DataGrid>
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
