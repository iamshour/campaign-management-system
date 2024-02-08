//#region Import
import { lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import getValueFromSafeObject from "@/core/utils/get-value-from-safe-obj"
import { Skeleton } from "@/ui"

import { useGetIndustryListQuery } from "../api"

const IndustriesView = lazy(() => import("../views/industries-view"))
const DisplayError = lazy(() => import("@/ui").then(({ DisplayError }) => ({ default: DisplayError })))
//#endregion

const IndustriesRoute = () => {
	const { offset, limit, sort, order, searchTerm, filters } = useSelector<AdvancedTableStateType<"industries">>(
		({ advancedTable }) => advancedTable["industries"]
	)

	const { list, count, isLoading, isError, error, isFetching } = useGetIndustryListQuery(
		{
			offset,
			limit,
			sort,
			order,
			name: searchTerm,
			startDate: getValueFromSafeObject("startDate", filters?.dateRange),
			endDate: getValueFromSafeObject("endDate", filters?.dateRange),
		},
		{
			selectFromResult: ({ data, ...rest }) => ({
				list: data?.list,
				count: data?.count,
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	if (isLoading) return <Skeleton className='h-full bg-white' />
	if (isError || !list || !count) return <DisplayError error={error as any} />

	return <IndustriesView list={list} count={count} isFetching={isFetching} />
}

export default IndustriesRoute
