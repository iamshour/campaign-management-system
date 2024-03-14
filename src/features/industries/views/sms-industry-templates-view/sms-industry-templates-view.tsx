//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { SharedListViewProps } from "@/core/types"
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"

import DataView from "@/core/components/data-view/data-view"
import smsTemplatesTableColumns from "@/features/templates/common/constants/sms-templates-table-columns"
import smsTemplatesTableClassNames from "@/features/templates/sms-templates/constants/sms-templates-table-classnames"
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

const SmsIndustryTemplatesViewTopbar = lazy(() => import("./sms-industry-templates-view-topbar"))

const SmsIndustryTemplatesViewTableActions = lazy(() => import("./sms-industry-templates-view-table-actions"))

const SmsIndustryTemplatesViewFiltersContent = lazy(() => import("./sms-industry-templates-view-filters-content"))
//#endregion

const SmsIndustryTemplatesView = (props: SharedListViewProps<SmsIndustryTemplateType>) => {
	const navigate = useNavigate()

	return (
		<DataView columns={columns} dataViewKey='sms-industry-templates' {...props}>
			<DataView.FiltersBar>
				<DataView.FiltersBar.Header />
				<DataView.FiltersBar.Content>
					<SmsIndustryTemplatesViewFiltersContent />
				</DataView.FiltersBar.Content>
				<DataView.FiltersBar.Footer />
			</DataView.FiltersBar>

			<DataView.Content>
				<DataView.TopBar>
					<SmsIndustryTemplatesViewTopbar />
				</DataView.TopBar>

				<DataView.Body classNames={smsTemplatesTableClassNames} onRowClick={({ id }) => navigate(id)} />
				<DataView.Pagination pageLimits={[10, 20, 30]}>
					<DataView.Pagination.Message />
				</DataView.Pagination>
			</DataView.Content>
		</DataView>
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
