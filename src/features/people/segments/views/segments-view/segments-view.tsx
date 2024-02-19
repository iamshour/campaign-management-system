//#region Import
import { lazy } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import DataGrid from "@/core/components/data-grid"
import appPaths from "@/core/constants/app-paths"
import type { SharedListViewProps } from "@/core/types"
import segmentsTableColumns from "@/features/people/segments/constants/segments-table-columns"
import type { Segment } from "@/features/people/segments/types"
import { Button } from "@/ui"

import PhPlusBold from "~icons/ph/plus-bold"

const SegmentsViewFiltersContent = lazy(() => import("./segments-view-filters-content"))
//#endregion

const SegmentsView = ({ count, ...tableProps }: SharedListViewProps<Segment>) => {
	const navigate = useNavigate()
	const { t } = useTranslation("segments")

	return (
		<DataGrid dataGridKey='segments' count={count}>
			<DataGrid.FiltersBar>
				<DataGrid.FiltersBar.Header />
				<DataGrid.FiltersBar.Content>
					<SegmentsViewFiltersContent />
				</DataGrid.FiltersBar.Content>
				<DataGrid.FiltersBar.Footer />
			</DataGrid.FiltersBar>

			<DataGrid.Content>
				<DataGrid.TopBar>
					<Button as='link' to={appPaths.SEGMENTS_NEW}>
						<PhPlusBold />
						{t("table.toolbar.actions.create-segment")}
					</Button>
				</DataGrid.TopBar>

				<DataGrid.Body
					columns={segmentsTableColumns}
					onRowClick={({ id }) => navigate(id)}
					classNames={{ wrapper: "px-4" }}
					{...tableProps}
				/>
				<DataGrid.Pagination />
			</DataGrid.Content>
		</DataGrid>
	)
}

export default SegmentsView
