//#region Import
import type { DataViewState } from "@/core/components/data-view/types"

import { clearFilters } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetContactsQuery } from "@/features/people/contacts/api"
import { getContactAdvancedFilter, getContactFilter, getContactSearchFilter } from "@/features/people/contacts/utils"
import { DataTableSkeleton } from "@/ui"
import { omit } from "@/utils"
import { lazy } from "react"
const ContactsView = lazy(() => import("@/features/people/contacts/views/contacts-view/contacts-view"))

const ContactsEmptyView = lazy(() => import("@/features/people/contacts/views/contacts-empty-view"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const ContactsRoute = () => {
	const dispatch = useDispatch()

	const { appliedFiltersCount, filters, paginationAndSorting, searchTerm } = useSelector<DataViewState<"contacts">>(
		({ dataView }) => dataView.contacts
	)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetContactsQuery(
		{
			...getContactAdvancedFilter(filters?.advancedFilters, true),
			...getContactFilter(omit(filters, ["advancedFilters"])),
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
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <DataTableSkeleton />

	if (isEmptyView) return <ContactsEmptyView />

	if (isError) return <DisplayError error={error as any} onReload={() => dispatch(clearFilters("contacts"))} />

	if (isReady) return <ContactsView count={count || 0} isFetching={isFetching} list={list || []} />
}

export default ContactsRoute
