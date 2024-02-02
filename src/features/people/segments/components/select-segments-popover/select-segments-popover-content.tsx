//#region Import
import { useState } from "react"

import { useGetSegmentsQuery } from "@/features/people/segments/api"
import { ComboBoxPopper } from "@/ui"
//#endregion

const SelectSegmentsPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	const { list, loading } = useGetSegmentsQuery(
		{ offset: 0, limit: 100 },
		{
			selectFromResult: ({ data, isLoading, ...rest }) => ({
				list: data?.list?.map(({ id, name }) => ({ label: name, value: id })),
				count: data?.count,
				loading: isLoading,
				...rest,
			}),
		}
	)

	return <ComboBoxPopper options={list} loading={loading} searchTerm={searchTerm} onSearch={setSearchTerm} />
}

export default SelectSegmentsPopoverContent
