//#region Import
import { lazy } from "react"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { clearFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import { useGetContactsQuery } from "@/features/people/contacts/api"
import { getContactSearchFilter, getContactAdvancedFilter } from "@/features/people/contacts/utils"
import { DataTableSkeleton } from "@/ui"
import { getListOfKey } from "@/utils"

const ContactsView = lazy(() => import("@/features/people/contacts/views/contacts-view/contacts-view"))
const ContactsEmptyView = lazy(() => import("@/features/people/contacts/views/contacts-empty-view"))
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const ContactsRoute = () => {
	const dispatch = useDispatch()

	const { offset, limit, order, sort, filters, appliedFiltersCount, searchTerm } = useSelector<
		DataGridState<"contacts">
	>(({ dataGrid }) => dataGrid.contacts)

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetContactsQuery(
		{
			limit,
			offset,
			sort,
			order,
			tags: filters?.tags,
			groups: getListOfKey(filters?.groups, "value"),
			startDate: filters?.dateRange?.startDate,
			endDate: filters?.dateRange?.endDate,
			...getContactSearchFilter(searchTerm),
			...getContactAdvancedFilter(filters?.advancedFilters),
		},
		{
			selectFromResult: ({ data, isLoading, isFetching, isSuccess, ...rest }) => ({
				list: data?.list,
				count: data?.count,
				isInitialLoading: !data && isLoading,
				isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
				isEmptyView: !isFetching && !!isSuccess && !data && !(appliedFiltersCount || !!searchTerm?.length),
				isFetching,
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <ContactsEmptyView />

	if (isError) return <DisplayError error={error as any} onReload={() => dispatch(clearFilters("contacts"))} />

	if (isReady) return <ContactsView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default ContactsRoute
