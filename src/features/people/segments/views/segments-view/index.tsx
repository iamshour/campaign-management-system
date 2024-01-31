//#region Import
import {Button} from "@blueai/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import AdvancedTable from "@/core/components/advanced-table"
import appPaths from "@/core/constants/app-paths"
import type { SharedListViewProps } from "@/core/types"
import segmentsTableColumns from "@/features/people/segments/constants/segments-table-columns"
import type { Segment } from "@/features/people/segments/types"

import PhPlusBold from "~icons/ph/plus-bold"

const FiltersContent = lazy(() => import("./filters-content"))
//#endregion

const SegmentsView = ({ list, count, ...tableProps }: SharedListViewProps<Segment>) => {
	const navigate = useNavigate()
	const { t } = useTranslation("segments")

	return (
		<AdvancedTable tableKey='segments' count={count}>
			<AdvancedTable.FiltersBar>
				<AdvancedTable.FiltersBar.Header />
				<AdvancedTable.FiltersBar.Content>
					<FiltersContent />
				</AdvancedTable.FiltersBar.Content>
				<AdvancedTable.FiltersBar.Footer />
			</AdvancedTable.FiltersBar>

			<AdvancedTable.Content>
				<AdvancedTable.TopBar>
					<Button onClick={() => navigate(appPaths.SEGMENTS_NEW)}>
						<PhPlusBold />
						{t("table.toolbar.actions.create-segment")}
					</Button>
				</AdvancedTable.TopBar>

				<AdvancedTable.Table
					list={list}
					columns={segmentsTableColumns}
					onRowClick={({ id }) => navigate(`./${id}`)}
					className='px-4'
					{...tableProps}
				/>
				<AdvancedTable.Pagination />
			</AdvancedTable.Content>
		</AdvancedTable>
	)
}

export default SegmentsView
