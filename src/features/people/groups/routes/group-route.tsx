//#region Import
import type { DataViewState } from "@/core/components/data-view/types"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { getContactFilter, getContactSearchFilter } from "@/features/people/contacts/utils"
import { useGetGroupByIdQuery } from "@/features/people/groups/api"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const GroupEmptyView = lazy(() => import("../views/group-view/group-empty-view"))

const GroupView = lazy(() => import("@/features/people/groups/views/group-view/group-view"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const GroupRoute = () => {
	const { groupId } = useParams()

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<
		DataViewState<"contacts-in-group">
	>(({ dataView }) => dataView["contacts-in-group"])

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetGroupByIdQuery(
		{
			...getContactFilter(filters),
			...getContactSearchFilter(searchTerm),
			...paginationAndSorting,
			groupId: groupId!,
		},
		{
			selectFromResult: ({ data, isFetching, isLoading, isSuccess, ...rest }) => ({
				count: data?.contactResponseList?.count || 0,
				isEmptyView:
					!isFetching &&
					!!isSuccess &&
					!data?.contactResponseList?.count &&
					!(appliedFiltersCount || !!searchTerm?.length),
				isFetching,
				isInitialLoading: !data && isLoading,
				isReady:
					!isLoading && data?.contactResponseList !== undefined && data?.contactResponseList?.count !== undefined,
				list: data?.contactResponseList?.list || [],
				...rest,
			}),
			skip: !groupId,
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <GroupEmptyView />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	// TODO: Show group name in page header (to be added to RTK)
	if (isReady) return <GroupView count={count} isFetching={isFetching} list={list} />
}

export default GroupRoute
