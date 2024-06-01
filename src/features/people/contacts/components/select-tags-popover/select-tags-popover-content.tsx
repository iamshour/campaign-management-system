//#region Import
import { useGetTagsQuery } from "@/features/people/contacts/api"
import { SelectAsyncPopoverContent } from "@/ui"
import { useState } from "react"
//#endregion

const SelectTagsPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	// TODO: Handle Infinite Loading in Component to handle changing offset/limit Values
	const { list, loading } = useGetTagsQuery(
		{ limit: 100, name: searchTerm || undefined, offset: 0 },
		{
			selectFromResult: ({ data, isLoading, ...rest }) => ({
				list: data?.list?.map(({ name }) => ({ label: name, value: name })) ?? [],
				loading: isLoading,
				...rest,
			}),
		}
	)

	return <SelectAsyncPopoverContent loading={loading} onSearch={setSearchTerm} options={list} searchTerm={searchTerm} />
}

export default SelectTagsPopoverContent
