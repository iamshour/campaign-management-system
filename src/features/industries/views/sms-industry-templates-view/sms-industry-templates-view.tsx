//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"

import DataGrid from "@/core/components/data-grid/data-grid"
import { ColumnType } from "@/core/components/data-grid/types"
import smsTemplatesTableClassNames from "@/features/templates/sms-templates/constants/sms-templates-table-classnames"
import smsTemplatesTableColumns from "@/features/templates/sms-templates/constants/sms-templates-table-columns"
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

const SmsIndustryTemplatesViewTopbar = lazy(() => import("./sms-industry-templates-view-topbar"))

const SmsIndustryTemplatesViewTableActions = lazy(() => import("./sms-industry-templates-view-table-actions"))

const SmsIndustryTemplatesViewFiltersContent = lazy(() => import("./sms-industry-templates-view-filters-content"))
//#endregion

const SmsIndustryTemplatesView = (props: SharedListViewProps<SmsIndustryTemplateType>) => {
	const navigate = useNavigate()

	return (
		<DataGrid columns={columns} dataGridKey='sms-industry-templates' {...props}>
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

				<DataGrid.Body classNames={smsTemplatesTableClassNames} onRowClick={({ id }) => navigate(id)} />
				<DataGrid.Pagination pageLimits={[10, 20, 30]}>
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
