//#region Import
import { ComboBoxPopper, Button, type ComboBoxContextType, type OptionType } from "@blueai/ui"
import { useState } from "react"

import { useGetTagsListQuery } from "@/features/people/contacts/api"
//#endregion

const SelectTagsPopoverContent = ({ isCreatable, isMulti, selection, updateSelection }: ComboBoxContextType) => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	// TODO: Handle Infinite Loading in Component to handle changing offset/limit Values
	// eslint-disable-next-line
	// @ts-ignore
	const { list, loading } = useGetTagsListQuery(
		// eslint-disable-next-line
		// @ts-ignore
		{ offset: 0, limit: 100, name: searchTerm },
		{
			selectFromResult: ({ data, isLoading, ...rest }) => ({
				list: data?.list?.map(({ name }) => ({ label: name, value: name })) ?? [],
				loading: isLoading,
				...rest,
			}),
		}
	)

	const onCreate = () => {
		if (!searchTerm || !isCreatable) return

		const newEnrty = { label: searchTerm, value: searchTerm }

		if (isMulti) {
			updateSelection([...selection, newEnrty])
		} else {
			updateSelection(newEnrty)
		}

		setSearchTerm("")
	}

	return (
		<ComboBoxPopper
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			options={(isMulti ? [...list, ...selection] : [...list, selection]) as OptionType[] | undefined}
			loading={loading}
			searchTerm={searchTerm}
			onSearch={setSearchTerm}>
			{isCreatable && searchTerm?.length && !list?.length && (
				<div className='bg-primary-50/50'>
					<Button variant='ghost' size='sm' className='w-full justify-start' onClick={onCreate}>
						Create: <span className='max-w-full truncate font-light'>{searchTerm}</span>
					</Button>
				</div>
			)}
		</ComboBoxPopper>
	)
}

export default SelectTagsPopoverContent
