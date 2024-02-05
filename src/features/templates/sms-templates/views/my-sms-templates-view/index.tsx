//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import AdvancedTable from "@/core/components/advanced-table"
import type { SharedListViewProps } from "@/core/types"
import smsTemplatesTableColumns from "@/features/templates/sms-templates/constants/sms-templates-table-columns"
import type { SmsTemplate } from "@/features/templates/sms-templates/types"
import type { TableProps } from "@/ui"

const MySmsTemplatesViewTopbar = lazy(() => import("./my-sms-templates-view-topbar"))
const MySmsTemplatesViewFiltersContent = lazy(() => import("./my-sms-templates-view-filters-content"))
//#endregion

const MySmsTemplatesView = ({ count, ...tableProps }: SharedListViewProps<SmsTemplate>) => {
	const navigate = useNavigate()

	return (
		<AdvancedTable tableKey='sms-templates' count={count}>
			<AdvancedTable.FiltersBar>
				<AdvancedTable.FiltersBar.Header />
				<AdvancedTable.FiltersBar.Content>
					<MySmsTemplatesViewFiltersContent />
				</AdvancedTable.FiltersBar.Content>
				<AdvancedTable.FiltersBar.Footer />
			</AdvancedTable.FiltersBar>

			<AdvancedTable.Content>
				<AdvancedTable.TopBar>
					<MySmsTemplatesViewTopbar />
				</AdvancedTable.TopBar>

				<AdvancedTable.Table
					columns={smsTemplatesTableColumns}
					classNames={classNames}
					onRowClick={({ id }) => navigate(`./${id}`)}
					{...tableProps}
				/>
				<AdvancedTable.Pagination pageLimits={[10, 20, 30]}>
					<AdvancedTable.Pagination.Message />
				</AdvancedTable.Pagination>
			</AdvancedTable.Content>
		</AdvancedTable>
	)
}

export default MySmsTemplatesView

/**
 * Custom classNames passed to style AdvancedTable used in `MySmsTemplatesView`
 */
const classNames: TableProps<SmsTemplate>["classNames"] = {
	wrapper: "px-4",
	table: "border-separate border-spacing-y-[20px] -mt-[20px]",
	tbodyTr: "bg-[#F7F7F7] cursor-pointer ",
	tbodyTd: "first:rounded-s-[12px] last:rounded-e-[12px] py-[20px]",
}
