//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import DataGrid from "@/core/components/data-grid"
import type { SharedListViewProps } from "@/core/types"
import grouspsTableColumns from "@/features/people/groups/constants/groups-table-columns"
import type { Group } from "@/features/people/groups/types"

import GroupCard from "./group-card"

const GroupsViewFiltersContent = lazy(() => import("./groups-view-filters-content"))
const GroupsViewTopBar = lazy(() => import("./groups-view-topbar"))
// const GroupsGridView = lazy(() => import("./grid-view"))
//#endregion

const GroupsView = ({ count, ...tableProps }: SharedListViewProps<Group>) => {
	const navigate = useNavigate()

	return (
		<DataGrid dataGridKey='groups' count={count}>
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
						GridCard={GroupCard}
						columns={grouspsTableColumns}
						classNames={{ wrapper: "px-4" }}
						onRowClick={({ groupId }) => navigate(groupId)}
						{...tableProps}
					/>
				</DataGrid.MultiViewLayout>

				<DataGrid.Pagination pageLimits={[10, 20, 30]} />
			</DataGrid.Content>
		</DataGrid>
	)
}

export default GroupsView
