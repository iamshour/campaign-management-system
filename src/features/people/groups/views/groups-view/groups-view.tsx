//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { Group } from "@/features/people/groups/types"

import DataGrid from "@/core/components/data-grid/data-grid"
import grouspsTableColumns from "@/features/people/groups/constants/groups-table-columns"
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import GroupCard from "./group-card"

const GroupsViewFiltersContent = lazy(() => import("./groups-view-filters-content"))

const GroupsViewTopBar = lazy(() => import("./groups-view-topbar"))
// const GroupsGridView = lazy(() => import("./grid-view"))
//#endregion

const GroupsView = (props: SharedListViewProps<Group>) => {
	const navigate = useNavigate()

	return (
		<DataGrid columns={grouspsTableColumns} dataGridKey='groups' {...props}>
			<DataGrid.FiltersBar>
				<DataGrid.FiltersBar.Header />
				<DataGrid.FiltersBar.Content>
					<GroupsViewFiltersContent />
				</DataGrid.FiltersBar.Content>
				<DataGrid.FiltersBar.Footer />
			</DataGrid.FiltersBar>

			<DataGrid.Content>
				<DataGrid.TopBar>
					<GroupsViewTopBar />
				</DataGrid.TopBar>

				<DataGrid.MultiViewLayout>
					<DataGrid.Body
						classNames={{ wrapper: "px-4" }}
						GridCard={GroupCard}
						onRowClick={({ groupId }) => navigate(groupId)}
					/>
				</DataGrid.MultiViewLayout>

				<DataGrid.Pagination pageLimits={[10, 20, 30]} />
			</DataGrid.Content>
		</DataGrid>
	)
}

export default GroupsView
