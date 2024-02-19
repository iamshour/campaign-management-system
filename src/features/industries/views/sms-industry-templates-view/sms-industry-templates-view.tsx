//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import DataGrid from "@/core/components/data-grid"
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
		<DataGrid dataGridKey='sms-industry-templates' count={count}>
			<DataGrid.FiltersBar>
				<DataGrid.FiltersBar.Header />
				<DataGrid.FiltersBar.Content>
					<SmsIndustryTemplatesViewFiltersContent />
				</DataGrid.FiltersBar.Content>
				<DataGrid.FiltersBar.Footer />
			</DataGrid.FiltersBar>

			<DataGrid.Content>
				<DataGrid.TopBar>
					<SmsIndustryTemplatesViewTopbar />
				</DataGrid.TopBar>

				<DataGrid.Body
					columns={columns}
					classNames={smsTemplatesTableClassNames}
					onRowClick={({ id }) => navigate(id)}
					{...tableProps}
				/>
				<DataGrid.Pagination>
					<DataGrid.Pagination.Message />
				</DataGrid.Pagination>
			</DataGrid.Content>
		</DataGrid>
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
