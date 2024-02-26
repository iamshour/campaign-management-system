//#region Import
import type { IndustryType } from "@/features/industries/types"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetIndustriesQuery } from "@/features/industries/api"
import { Skeleton } from "@/ui"
import { lazy, useCallback, useState } from "react"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const SmsPrebuiltTemplatesFiltersContent = lazy(() => import("./sms-prebuilt-templates-filters-content"))
//#endregion

export interface SmsPrebuiltTemplatesFiltersProps
	extends Pick<React.ComponentPropsWithoutRef<typeof SmsPrebuiltTemplatesFiltersContent>, "prebuiltTemplatesGridKey"> {}

const SmsPrebuiltTemplatesFilters = ({ prebuiltTemplatesGridKey }: SmsPrebuiltTemplatesFiltersProps) => {
	const [searchTerm, setSearchTerm] = useState<string>()

	const { error, isError, isLoading, list } = useGetIndustriesQuery(
		{
			...getSearchFilter<["name"]>(searchTerm, ["name"]),
			limit: 50,
			offset: 0,
		},
		{
			selectFromResult: ({ data, ...rest }) => ({
				list: data?.list ? [{ id: "ALL", name: "All Industries" } as IndustryType, ...data.list] : [],
				...rest,
			}),
			...baseQueryConfigs,
		}
	)

	const onIndustrySearch = useCallback((searchTerm?: string) => setSearchTerm(searchTerm), [])

	if (isLoading) return <Skeleton className='h-full w-[300px] bg-[#edf3f7]' />

	if (isError) return <DisplayError className=' w-[300px] bg-[#edf3f7]' error={error as any} showReloadButton />

	return (
		<SmsPrebuiltTemplatesFiltersContent
			industrySearchTerm={searchTerm}
			list={list || []}
			onIndustrySearch={onIndustrySearch}
			prebuiltTemplatesGridKey={prebuiltTemplatesGridKey}
		/>
	)
}

export default SmsPrebuiltTemplatesFilters
