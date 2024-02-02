//#region Import
import { DataGridSkeleton, Tabs, Tooltip, type IconType } from "@/ui"
import { Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom"

import AdvancedTable from "@/core/components/advanced-table"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { type AdvancedTableStateValue, type ListGridView, toggleListGridView } from "@/core/slices/advanced-table-slice"
import type { SharedListViewProps } from "@/core/types"
import grouspsTableColumns from "@/features/people/groups/constants/groups-table-columns"
import type { Group } from "@/features/people/groups/types"

import FiltersContent from "./filters-content"
import GroupsTopBar from "./table-topbar"

import MaterialSymbolsFormatListBulletedRounded from "~icons/material-symbols/format-list-bulleted-rounded"
import TeenyiconsGridLayoutSolid from "~icons/teenyicons/grid-layout-solid"

const GroupsGridView = lazy(() => import("./grid-view"))
//#endregion

const VIEWS: Record<ListGridView, ListGridView> = {
	"List View": "List View",
	"Grid View": "Grid View",
}
const GroupsView = ({ count, list, isFetching, ...tableProps }: SharedListViewProps<Group>) => {
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const { view } = useSelector<AdvancedTableStateValue<Group>>(({ advancedTable }) => advancedTable["groups"])

	return (
		<AdvancedTable tableKey='groups' count={count}>
			<AdvancedTable.FiltersBar>
				<AdvancedTable.FiltersBar.Header />
				<AdvancedTable.FiltersBar.Content>
					<FiltersContent />
				</AdvancedTable.FiltersBar.Content>
				<AdvancedTable.FiltersBar.Footer />
			</AdvancedTable.FiltersBar>

			<AdvancedTable.Content>
				<AdvancedTable.TopBar>
					<GroupsTopBar />
				</AdvancedTable.TopBar>

				<Tabs
					value={view}
					onValueChange={(view) => dispatch(toggleListGridView({ groups: view }))}
					className='flex h-full w-full flex-col'>
					<Tabs.List className='mb-4 w-max gap-2.5 place-self-end bg-transparent'>
						<ViewTrigger value='List View' icon={MaterialSymbolsFormatListBulletedRounded} />
						<ViewTrigger value='Grid View' icon={TeenyiconsGridLayoutSolid} />
					</Tabs.List>

					<Tabs.Content value={VIEWS["List View"]} className='mt-0 flex-1 overflow-y-hidden px-4'>
						<AdvancedTable.Table
							list={list}
							columns={grouspsTableColumns}
							isFetching={isFetching}
							className='px-4'
							onRowClick={({ groupId }) => navigate(`./${groupId}`)}
							{...tableProps}
						/>
					</Tabs.Content>

					<Tabs.Content value={VIEWS["Grid View"]} className='mt-0 flex-1 overflow-y-hidden'>
						<Suspense fallback={<DataGridSkeleton className='px-8' />}>
							<GroupsGridView count={count} list={list} isFetching={isFetching} />
						</Suspense>
					</Tabs.Content>
				</Tabs>

				<AdvancedTable.Pagination pageLimits={[10, 20, 30]} />
			</AdvancedTable.Content>
		</AdvancedTable>
	)
}

export default GroupsView

interface ViewTriggerProps extends React.ComponentPropsWithRef<typeof Tabs.Trigger> {
	value: ListGridView
	icon: IconType
}

const ViewTrigger = ({ value, icon: Icon, ...props }: ViewTriggerProps) => (
	<Tooltip>
		<Tabs.Trigger
			{...props}
			asChild
			value={value}
			className='flex h-[40px] w-[40px] rounded-md border border-current border-opacity-50 bg-white p-1 text-[#B5B5B5] data-[state=active]:border-primary-600 data-[state=active]:bg-[#E9F6FC] data-[state=active]:text-primary-800 focus-visible:ring-1 focus-visible:ring-primary-600 focus-visible:ring-offset-0'>
			<Tooltip.Trigger>
				<Icon className='text-lg' />
				<p className='sr-only'>{props?.title}</p>
			</Tooltip.Trigger>
		</Tabs.Trigger>

		<Tooltip.Content side='bottom' align='end' sideOffset={8} content={value} />
	</Tooltip>
)
