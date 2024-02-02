//#region Import
import { useMemo, useState } from "react"

import { useGetTagsListQuery } from "@/features/people/contacts/api"
import { ComboBoxPopper, Button, type ComboBoxContextType } from "@/ui"
//#endregion

const SelectTagsPopoverContent = ({ isCreatable, isMulti, selection, updateSelection }: ComboBoxContextType) => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

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

	const onCreate = () => {
		if (!searchTerm || !isCreatable) return

		const newEnrty = { label: searchTerm, value: searchTerm }

		if (isMulti) {
			const newSelection = new Set([...selection, newEnrty])
			updateSelection([...newSelection])
		} else {
			updateSelection(newEnrty)
		}

		setSearchTerm("")
	}

	const optionsList = useMemo(() => {
		if (!isCreatable) return list

		let listToRender = []

		if (!selection) {
			listToRender = list
		} else if (isMulti) {
			listToRender = [...list, ...selection]
		} else {
			listToRender = [...list, selection]
		}

		const renderedSet = new Set(listToRender.map((item) => JSON.stringify(item)))

		return Array.from(renderedSet).map((item) => JSON.parse(item))
	}, [list, isMulti, selection, isCreatable])

	return (
		<ComboBoxPopper options={optionsList} loading={loading} searchTerm={searchTerm} onSearch={setSearchTerm}>
			{Boolean(isCreatable && searchTerm?.length && !list?.length) && (
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
