//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import { getContactSearchFilter } from "@/features/people/contacts/utils"
import { useGetGroupByIdQuery } from "@/features/people/groups/api"
import { DataTableSkeleton } from "@/ui"
import { getListOfKey } from "@/utils"

const GroupView = lazy(() => import("@/features/people/groups/views/group-view/group-view"))
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const GroupRoute = () => {
	const { id: groupId } = useParams()

	const { offset, limit, sort, order, filters, searchTerm, appliedFiltersCount } = useSelector<
		DataGridState<"contacts-in-group">
	>(({ dataGrid }) => dataGrid["contacts-in-group"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetGroupByIdQuery(
		{
			groupId: groupId!,
			limit,
			offset,
			sort,
			order,
			tags: filters?.tags,
			groups: getListOfKey(filters?.groups, "value"),
			startDate: filters?.dateRange?.startDate,
			endDate: filters?.dateRange?.endDate,
			...getContactSearchFilter(searchTerm),
		},
		{
			skip: !groupId,
			selectFromResult: ({ data, isLoading, isFetching, isSuccess, ...rest }) => ({
				list: data?.contactResponseList?.list,
				count: data?.contactResponseList?.count,
				isInitialLoading: !data && isLoading,
				isReady:
					!isLoading && data?.contactResponseList !== undefined && data?.contactResponseList?.count !== undefined,
				isEmptyView: !isFetching && !!isSuccess && !data && !(appliedFiltersCount || !!searchTerm?.length),
				isFetching,
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <div className='h-full w-full flex-center'>No Contacts in group available!</div>

	if (isError) return <DisplayError error={error as any} showReloadButton />

	// TODO: Show group name in page header (to be added to RTK)
	if (isReady) return <GroupView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default GroupRoute
