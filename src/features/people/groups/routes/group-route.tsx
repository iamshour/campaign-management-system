//#region Import
import DataTableSkeleton from "@package/ui/src/skeletons/data-table-skeleton"
import { getListOfKey } from "@package/utils"
import { lazy } from "react"
import { useParams } from "react-router-dom"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateValue } from "@/core/slices/advanced-table-slice"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
import type { Contact } from "@/features/people/contacts/types"
import { getContactSearchFilter } from "@/features/people/contacts/utils"

import { useGetGroupByIdQuery } from "../api"
const GroupView = lazy(() => import("../views/group-view"))
const DisplayError = lazy(() => import("@package/ui/src/errors/display-error"))
//#endregion

const GroupRoute = () => {
	const { id: groupId } = useParams()

	const { offset, limit, sort, order, filters, searchTerm, appliedFiltersCount } = useSelector<
		AdvancedTableStateValue<Contact>
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

	if (isError) return <DisplayError error={error} />

	// TODO: Show group name in page header (to be added to RTK)
	if (isReady) return <GroupView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default GroupRoute
