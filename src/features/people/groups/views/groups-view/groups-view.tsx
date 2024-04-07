//#region Import
import type { SharedListViewProps } from "@/core/types"
import type { Group } from "@/features/people/groups/types"

import DataView from "@/core/components/data-view/data-view"
import grouspsTableColumns from "@/features/people/groups/constants/groups-table-columns"
import { lazy } from "react"
import { useNavigate } from "react-router-dom"

import GroupCard from "./group-card"

const GroupsViewFiltersContent = lazy(() => import("./groups-view-filters-content"))

const GroupsViewTopBar = lazy(() => import("./groups-view-topbar"))
//#endregion

const GroupsView = (props: SharedListViewProps<Group>) => {
	const navigate = useNavigate()

	return (
		<DataView columns={grouspsTableColumns} dataViewKey='groups' {...props}>
			<DataView.FiltersBar>
				<DataView.FiltersBar.Header />
				<DataView.FiltersBar.Content>
					<GroupsViewFiltersContent />
				</DataView.FiltersBar.Content>
				<DataView.FiltersBar.Footer />
			</DataView.FiltersBar>

			<DataView.Content>
				<DataView.TopBar>
					<GroupsViewTopBar />
				</DataView.TopBar>

				<DataView.MultiViewLayout>
					<DataView.Body GridCard={GroupCard} onRowClick={({ groupId }) => navigate(groupId)} />
				</DataView.MultiViewLayout>

				<DataView.Pagination pageLimits={[10, 20, 30]} />
			</DataView.Content>
		</DataView>
	)
}

export default GroupsView
