//#region Import
import getSearchFilter from "@/core/utils/get-search-filter"
import { useGetGroupsQuery } from "@/features/people/groups/api"
import { ComboBoxPopper } from "@/ui"
import { useState } from "react"
//#endregion

const SelectGroupsPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	const { fetchLoading, list } = useGetGroupsQuery(
		{
			limit: 100,
			offset: 0,
			...getSearchFilter<["name"]>(searchTerm, ["name"]),
		},
		{
			selectFromResult: ({ data, isFetching, ...rest }) => ({
				count: data?.count,
				fetchLoading: isFetching,
				list: data?.list?.map(({ groupId, groupName }) => ({ label: groupName, value: groupId })),
				...rest,
			}),
		}
	)

	return <ComboBoxPopper loading={fetchLoading} onSearch={setSearchTerm} options={list} searchTerm={searchTerm} />
}

export default SelectGroupsPopoverContent
