//#region Import
import type { DataViewState } from "@/core/components/data-view/types"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetContactsQuery } from "@/features/people/contacts/api"
import { getContactFilter, getContactSearchFilter } from "@/features/people/contacts/utils"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const AddContactsToGroupView = lazy(() => import("@/features/people/groups/views/add-contacts-to-group-view"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const AddContactsToGroupRoute = () => {
	const { id: groupId } = useParams()

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<
		DataViewState<"add-contacts-to-group">
	>(({ dataView }) => dataView["add-contacts-to-group"])

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetContactsQuery(
		{
			...getContactFilter(filters, { excludedGroupsList: [groupId!] }),
			...getContactSearchFilter(searchTerm),
			...paginationAndSorting,
		},
		{
			selectFromResult: ({ data, isFetching, isLoading, isSuccess, ...rest }) => ({
				count: data?.count,
				isEmptyView: !isFetching && !!isSuccess && !data && !(appliedFiltersCount || !!searchTerm?.length),
				isFetching,
				isInitialLoading: !data && isLoading,
				isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
				list: data?.list,
				...rest,
			}),
			skip: !groupId,
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	// TODO: Create EmprtyView Component here
	if (isEmptyView) return <div className='h-full w-full flex-center'>No Contacts to be added to this group!</div>

	if (isError) return <DisplayError error={error as any} />

	if (isReady) return <AddContactsToGroupView count={count || 0} isFetching={isFetching} list={list || []} />
}

export default AddContactsToGroupRoute
