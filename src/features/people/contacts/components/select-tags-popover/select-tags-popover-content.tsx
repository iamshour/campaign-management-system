//#region Import
import { useState } from "react"

import { useGetTagsQuery } from "@/features/people/contacts/api"
import { ComboBoxPopper } from "@/ui"
//#endregion

const SelectTagsPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	// TODO: Handle Infinite Loading in Component to handle changing offset/limit Values
	const { list, loading } = useGetTagsQuery(
		{ offset: 0, limit: 100, name: searchTerm },
		{
			selectFromResult: ({ data, isLoading, ...rest }) => ({
				list: data?.list?.map(({ name }) => ({ label: name, value: name })) ?? [],
				loading: isLoading,
				...rest,
			}),
		}
	)

	return <ComboBoxPopper options={list} loading={loading} searchTerm={searchTerm} onSearch={setSearchTerm} />
}

export default SelectTagsPopoverContent
