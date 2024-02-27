//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { SharedListViewProps } from "@/core/types"
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"

import DataView from "@/core/components/data-view/data-view"
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
		<DataView columns={columns} dataViewKey='sms-templates' {...props}>
			<DataView.FiltersBar>
				<DataView.FiltersBar.Header />
				<DataView.FiltersBar.Content>
					<SmsTemplatesViewFiltersContent />
				</DataView.FiltersBar.Content>
				<DataView.FiltersBar.Footer />
			</DataView.FiltersBar>

			<DataView.Content>
				<DataView.TopBar>
					<SmsTemplatesViewTopbar />
				</DataView.TopBar>

				<DataView.Body classNames={smsTemplatesTableClassNames} onRowClick={({ id }) => navigate(id)} />
				<DataView.Pagination pageLimits={[10, 20, 30]}>
					<DataView.Pagination.Message />
				</DataView.Pagination>
			</DataView.Content>
		</DataView>
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
