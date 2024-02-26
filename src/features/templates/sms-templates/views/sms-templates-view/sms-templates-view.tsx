//#region Import
import type { ColumnType } from "@/core/components/data-grid/types"
import type { SharedListViewProps } from "@/core/types"
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"

import DataGrid from "@/core/components/data-grid/data-grid"
import smsTemplatesTableClassNames from "@/features/templates/sms-templates/constants/sms-templates-table-classnames"
import smsTemplatesTableColumns from "@/features/templates/sms-templates/constants/sms-templates-table-columns"
import { lazy, memo } from "react"
import { useNavigate } from "react-router-dom"

const SmsTemplatesViewTopbar = lazy(() => import("./sms-templates-view-topbar"))

const SmsTemplatesViewFiltersContent = lazy(() => import("./sms-templates-view-filters-content"))

const SmsTemplatesViewTableActions = lazy(() => import("./sms-templates-view-table-actions"))
//#endregion

const SmsTemplatesView = memo((props: SharedListViewProps<SmsTemplateType>) => {
	const navigate = useNavigate()

	return (
		<DataGrid columns={columns} dataGridKey='sms-templates' {...props}>
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

				<DataGrid.Body classNames={smsTemplatesTableClassNames} onRowClick={({ id }) => navigate(id)} />
				<DataGrid.Pagination pageLimits={[10, 20, 30]}>
					<DataGrid.Pagination.Message />
				</DataGrid.Pagination>
			</DataGrid.Content>
		</DataGrid>
	)
})

SmsTemplatesView.displayName = "SmsTemplatesView"

export default SmsTemplatesView

const columns: ColumnType<SmsTemplateType>[] = [
	...smsTemplatesTableColumns,
	{
		accessorKey: "actions",
		cell: (_, { id }) => <SmsTemplatesViewTableActions id={id} />,
	},
]
