//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import AdvancedTable from "@/core/components/advanced-table"
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
		<AdvancedTable tableKey='groups' count={count}>
			<AdvancedTable.FiltersBar>
				<AdvancedTable.FiltersBar.Header />
				<AdvancedTable.FiltersBar.Content>
					<GroupsViewFiltersContent />
				</AdvancedTable.FiltersBar.Content>
				<AdvancedTable.FiltersBar.Footer />
			</AdvancedTable.FiltersBar>

			<AdvancedTable.Content>
				<AdvancedTable.TopBar>
					<GroupsViewTopBar />
				</AdvancedTable.TopBar>

				<AdvancedTable.MultiViewLayout>
					<AdvancedTable.Body
						GridCard={GroupCard}
						columns={grouspsTableColumns}
						classNames={{ wrapper: "px-4" }}
						onRowClick={({ groupId }) => navigate(groupId)}
						{...tableProps}
					/>
				</AdvancedTable.MultiViewLayout>

				<AdvancedTable.Pagination pageLimits={[10, 20, 30]} />
			</AdvancedTable.Content>
		</AdvancedTable>
	)
}

export default GroupsView
