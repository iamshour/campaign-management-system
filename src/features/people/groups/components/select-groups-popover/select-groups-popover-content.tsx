//#region Import
import { ComboBoxPopper } from "@/ui"
import { useState } from "react"

import { useGetGroupsQuery } from "@/features/people/groups/api"
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

	return (
		// eslint-disable-next-line
		// @ts-ignore
		<ComboBoxPopper options={list as any} loading={fetchLoading} searchTerm={searchTerm} onSearch={setSearchTerm} />
	)
}

export default SelectGroupsPopoverContent
