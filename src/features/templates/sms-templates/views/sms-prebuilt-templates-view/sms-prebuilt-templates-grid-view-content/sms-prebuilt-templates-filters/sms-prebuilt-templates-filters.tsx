//#region Import
import { lazy, useCallback, useState } from "react"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetIndustriesQuery } from "@/features/industries/api"
import { Skeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui").then(({ DisplayError }) => ({ default: DisplayError })))
const SmsPrebuiltTemplatesFiltersContent = lazy(() => import("./sms-prebuilt-templates-filters-content"))
//#endregion

const SmsPrebuiltTemplatesFilters = () => {
	const [industrySearchTerm, setIndustrySearchTerm] = useState<string>()

	const { list, isLoading, isError, error } = useGetIndustriesQuery(
		{ name: industrySearchTerm, offset: 0, limit: 50 },
		{
			selectFromResult: ({ data, ...rest }) => ({ list: data?.list, ...rest }),
			...baseQueryConfigs,
		}
	)

	const onIndustrySearch = useCallback((searchTerm?: string) => setIndustrySearchTerm(searchTerm), [])

	if (isLoading) return <Skeleton className='h-full bg-white' />
	if (!!isError || !list) return <DisplayError error={error as any} />

	return <SmsPrebuiltTemplatesFiltersContent list={list} onIndustrySearch={onIndustrySearch} />
}

export default SmsPrebuiltTemplatesFilters
