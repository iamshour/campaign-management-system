//#region Import
import { lazy, useCallback, useState } from "react"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetIndustriesQuery } from "@/features/industries/api"
import type { IndustryType } from "@/features/industries/types"
import { Skeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const SmsPrebuiltTemplatesFiltersContent = lazy(() => import("./sms-prebuilt-templates-filters-content"))
//#endregion

const SmsPrebuiltTemplatesFilters = () => {
	const [industrySearchTerm, setIndustrySearchTerm] = useState<string>()

	const { list, isLoading, isError, error } = useGetIndustriesQuery(
		{ name: industrySearchTerm, offset: 0, limit: 50 },
		{
			selectFromResult: ({ data, ...rest }) => ({
				list: data?.list ? [{ id: "ALL", name: "All Industries" } as IndustryType, ...data.list] : [],
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	const onIndustrySearch = useCallback((searchTerm?: string) => setIndustrySearchTerm(searchTerm), [])

	if (isLoading) return <Skeleton className='h-full w-[300px] bg-[#edf3f7]' />
	if (!!isError || !list)
		return <DisplayError className=' w-[300px] bg-[#edf3f7]' error={error as any} showReloadButton />

	return <SmsPrebuiltTemplatesFiltersContent list={list} onIndustrySearch={onIndustrySearch} />
}

export default SmsPrebuiltTemplatesFilters
