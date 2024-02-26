//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { Segment } from "@/features/people/segments/types"

import DataGrid from "@/core/components/data-grid/data-grid"
import appPaths from "@/core/constants/app-paths"
import segmentsTableColumns from "@/features/people/segments/constants/segments-table-columns"
import { Button } from "@/ui"
import PhPlusBold from "~icons/ph/plus-bold"
import { lazy } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

const SegmentsViewFiltersContent = lazy(() => import("./segments-view-filters-content"))
//#endregion

const SegmentsView = (props: SharedListViewProps<Segment>) => {
	const navigate = useNavigate()

	const { t } = useTranslation("segments")

	return (
		<DataGrid columns={segmentsTableColumns} dataGridKey='segments' {...props}>
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

				<DataGrid.Body classNames={{ wrapper: "px-4" }} onRowClick={({ id }) => navigate(id)} />
				<DataGrid.Pagination />
			</DataGrid.Content>
		</DataGrid>
	)
}

export default SegmentsView
