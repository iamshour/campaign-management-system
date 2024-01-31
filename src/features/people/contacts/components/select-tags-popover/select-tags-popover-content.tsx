//#region Import
import { type OptionType, ComboBoxPopper } from "@blueai/ui"
import { useState } from "react"

import { useGetTagsListQuery } from "@/features/people/contacts/api"
//#endregion

// { creatable }: { creatable?: boolean }
const SelectTagsPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	// const [options, setOptions] = useState<OptionType[] | undefined>(undefined)

	// TODO: Handle Infinite Loading in Component to handle changing offset/limit Values
	const { list, loading } = useGetTagsListQuery(
		{ offset: 0, limit: 100, name: searchTerm },
		{
			selectFromResult: ({ data, isLoading, ...rest }) => ({
				list: data?.list?.map(({ name }) => ({ label: name, value: name })) ?? [],
				loading: isLoading,
				...rest,
			}),
		}
	)

	// useEffect(() => {
	// 	if (creatable) {
	// 		setOptions(list!)
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [creatable])

	// const handleInputChange = (inputText?: string | undefined) => {
	// 	setSearchTerm(inputText)

	// 	if (!creatable) return

	// 	// Check if the input text matches any existing items
	// 	const existingItem = list?.find((item) => item.label.toLowerCase() === inputText?.toLowerCase())

	// 	// If the input text doesn't match any existing items, add a new item to the list
	// 	if (!existingItem && !!inputText && inputText.trim() !== "") {
	// 		setOptions([...list, { label: inputText.trim(), value: inputText?.trim() }])
	// 	}
	// }

	return (
		<ComboBoxPopper
			options={list as OptionType[] | undefined}
			loading={loading}
			searchTerm={searchTerm}
			onSearch={setSearchTerm}
		/>
	)
}

export default SelectTagsPopoverContent
