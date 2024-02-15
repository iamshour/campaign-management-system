//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router"

import AdvancedTable from "@/core/components/advanced-table"
import type { SharedListViewProps } from "@/core/types"
import industriesTableColumns from "@/features/industries/constants/industries-table-columns"
import type { IndustryType } from "@/features/industries/types"

import IndustryCard from "./industry-card"

const IndustriesViewFiltersContent = lazy(() => import("./industries-view-filters-content"))
const IndustriesViewTopBar = lazy(() => import("./industries-view-topbar"))
//#endregion

const IndustriesView = ({ count, ...tableProps }: SharedListViewProps<IndustryType>) => {
	const navigate = useNavigate()

	return (
		<AdvancedTable tableKey='industries' count={count}>
			<AdvancedTable.FiltersBar>
				<AdvancedTable.FiltersBar.Header />
				<AdvancedTable.FiltersBar.Content>
					<IndustriesViewFiltersContent />
				</AdvancedTable.FiltersBar.Content>
				<AdvancedTable.FiltersBar.Footer />
			</AdvancedTable.FiltersBar>

			<AdvancedTable.Content>
				<AdvancedTable.TopBar>
					<IndustriesViewTopBar />
				</AdvancedTable.TopBar>

				<AdvancedTable.MultiViewLayout>
					<AdvancedTable.Body
						GridCard={IndustryCard}
						columns={industriesTableColumns}
						gridClassName='[grid-template-columns:repeat(auto-fit,470px)] 3xl:[grid-template-columns:repeat(auto-fit,480px)] [grid-template-rows:repeat(auto-fit,250px)]'
						classNames={{ wrapper: "px-4", emptyTableCell: "h-[calc(100vh-340px)]" }}
						onRowClick={({ id }) => navigate(id)}
						{...tableProps}
					/>
				</AdvancedTable.MultiViewLayout>

				<AdvancedTable.Pagination />
			</AdvancedTable.Content>
		</AdvancedTable>
	)
}

export default IndustriesView
