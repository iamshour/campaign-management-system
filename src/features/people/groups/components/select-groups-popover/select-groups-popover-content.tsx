//#region Import
import { useState } from "react"

import { useGetGroupsQuery } from "@/features/people/groups/api"
import { ComboBoxPopper } from "@/ui"
//#endregion

const SelectGroupsPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	const { list, fetchLoading } = useGetGroupsQuery(
		{ offset: 0, limit: 100 },
		{
			selectFromResult: ({ data, isFetching, ...rest }) => ({
				list: data?.list?.map(({ groupName, groupId }) => ({ label: groupName, value: groupId })),
				count: data?.count,
				fetchLoading: isFetching,
				...rest,
			}),
		}
	)

	return <ComboBoxPopper options={list} loading={fetchLoading} searchTerm={searchTerm} onSearch={setSearchTerm} />
}

export default SelectGroupsPopoverContent
