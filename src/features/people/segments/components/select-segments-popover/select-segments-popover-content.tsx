//#region Import
import { useGetSegmentsQuery } from "@/features/people/segments/api"
import { ComboBoxPopper } from "@/ui"
import { useState } from "react"
//#endregion

const SelectSegmentsPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	const { list, loading } = useGetSegmentsQuery(
		{ limit: 100, offset: 0 },
		{
			selectFromResult: ({ data, isLoading, ...rest }) => ({
				count: data?.count,
				list: data?.list?.map(({ id, name }) => ({ label: name, value: id })),
				loading: isLoading,
				...rest,
			}),
		}
	)

	return <ComboBoxPopper loading={loading} onSearch={setSearchTerm} options={list} searchTerm={searchTerm} />
}

export default SelectSegmentsPopoverContent
