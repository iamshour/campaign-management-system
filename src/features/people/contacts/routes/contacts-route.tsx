//#region Import
import DataTableSkeleton from "@package/ui/src/skeletons/data-table-skeleton"
import { getListOfKey } from "@package/utils"
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import type { AdvancedTableStateValue } from "@/core/slices/advanced-table-slice"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
import type { Contact } from "@/features/people/contacts/types"
import { getContactSearchFilter, getContactAdvancedFilter } from "@/features/people/contacts/utils"

import { useGetContactsQuery } from "../api"

const ContactsView = lazy(() => import("../views/contacts-view"))
const EmptyContactsView = lazy(() => import("../views/empty-contacts-view"))
const DisplayError = lazy(() => import("@package/ui/src/errors/display-error"))
//#endregion

const ContactsRoute = () => {
	const { offset, limit, order, sort, filters, appliedFiltersCount, searchTerm } = useSelector<
		AdvancedTableStateValue<Contact>
	>(({ advancedTable }) => advancedTable["contacts"])

	const { list, count, isInitialLoading, isReady, isEmptyView, isFetching, isError, error } = useGetContactsQuery(
		{
			limit,
			offset,
			sort,
			order,
			tags: filters?.tags,
			groups: getListOfKey(filters?.groups, "value"),
			startDate: getValueFromSafeObject("startDate", filters?.dateRange),
			endDate: getValueFromSafeObject("endDate", filters?.dateRange),
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

	if (isEmptyView) return <EmptyContactsView />

	if (isError) return <DisplayError error={error} />

	if (isReady) return <ContactsView list={list || []} count={count || 0} isFetching={isFetching} />
}

export default ContactsRoute
