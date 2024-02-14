//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
import { useGetContactsQuery } from "@/features/people/contacts/api"
import { getContactSearchFilter } from "@/features/people/contacts/utils"
import { DataTableSkeleton } from "@/ui"
import { getListOfKey } from "@/utils"

const AddContactsToGroupView = lazy(() => import("@/features/people/groups/views/add-contacts-to-group-view"))
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const AddContactsToGroupRoute = () => {
	const { id: groupId } = useParams()

	const { offset, limit, sort, order, filters, searchTerm, appliedFiltersCount } = useSelector<
		AdvancedTableStateType<"contacts-in-group">
	>(({ advancedTable }) => advancedTable["add-contacts-to-group"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetContactsQuery(
		{
			excludedGroupsList: [groupId!],
			limit,
			offset,
			sort,
			order,
			tags: filters?.tags,
			groups: getListOfKey(filters?.groups, "value"),
			startDate: getValueFromSafeObject("startDate", filters?.dateRange), // TODO: function to generate startDate and endDate filters
			endDate: getValueFromSafeObject("endDate", filters?.dateRange),
			...getContactSearchFilter(searchTerm),
		},
		{
			skip: !groupId,
			selectFromResult: ({ data, isLoading, isFetching, isSuccess, ...rest }) => {
				return {
					list: data?.list,
					count: data?.count,
					isInitialLoading: !data && isLoading,
					isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
					isEmptyView: !isFetching && !!isSuccess && !data && !(appliedFiltersCount || !!searchTerm?.length),
					isFetching,
					...rest,
				}
			},
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	// TODO: Create EmprtyView Component here
	if (isEmptyView) return <div className='h-full w-full flex-center'>No Contacts to be added to this group!</div>

	if (isError) return <DisplayError error={error as any} />

	if (isReady) return <AddContactsToGroupView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default AddContactsToGroupRoute
