//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { Segment } from "@/features/people/segments/types"

import DataView from "@/core/components/data-view/data-view"
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
		<DataView columns={segmentsTableColumns} dataViewKey='segments' {...props}>
			<DataView.FiltersBar>
				<DataView.FiltersBar.Header />
				<DataView.FiltersBar.Content>
					<SegmentsViewFiltersContent />
				</DataView.FiltersBar.Content>
				<DataView.FiltersBar.Footer />
			</DataView.FiltersBar>

			<DataView.Content>
				<DataView.TopBar>
					<Button as='link' to={appPaths.SEGMENTS_NEW}>
						<PhPlusBold />
						{t("table.toolbar.actions.create-segment")}
					</Button>
				</DataView.TopBar>

				<DataView.Body classNames={{ wrapper: "px-4" }} onRowClick={({ id }) => navigate(id)} />
				<DataView.Pagination />
			</DataView.Content>
		</DataView>
	)
}

export default SegmentsView
