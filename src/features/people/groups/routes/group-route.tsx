//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
import { getContactSearchFilter } from "@/features/people/contacts/utils"
import { DataTableSkeleton } from "@/ui"
import { getListOfKey } from "@/utils"

import { useGetGroupByIdQuery } from "../api"

const GroupView = lazy(() => import("../views/group-view/group-view"))
const DisplayError = lazy(() => import("@/ui").then((mod) => ({ default: mod.DisplayError })))
//#endregion

const GroupRoute = () => {
	const { id: groupId } = useParams()

	const { offset, limit, sort, order, filters, searchTerm, appliedFiltersCount } = useSelector<
		AdvancedTableStateType<"contacts-in-group">
	>(({ advancedTable }) => advancedTable["contacts-in-group"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetGroupByIdQuery(
		{
			groupId: groupId!,
			limit,
			offset,
			sort,
			order,
			// tags filter
			tags: filters?.tags,
			// grousp filter
			groups: getListOfKey(filters?.groups, "value"),
			// date range filter:
			// TODO: function to generate startDate and endDate filters
			startDate: getValueFromSafeObject("startDate", filters?.dateRange),
			endDate: getValueFromSafeObject("endDate", filters?.dateRange),
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

	if (isError) return <DisplayError error={error as any} />

	// TODO: Show group name in page header (to be added to RTK)
	if (isReady) return <GroupView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default GroupRoute
