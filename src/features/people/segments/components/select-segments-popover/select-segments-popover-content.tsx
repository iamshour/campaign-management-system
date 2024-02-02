//#region Import
import { ComboBoxPopper } from "@/ui"
import { useState } from "react"

import { useGetSegmentsQuery } from "@/features/people/segments/api"
//#endregion

const SelectSegmentsPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	// eslint-disable-next-line
	// @ts-ignore
	const { list, loading } = useGetSegmentsQuery(
		// eslint-disable-next-line
		// @ts-ignore
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

	// eslint-disable-next-line
	// @ts-ignore
	return <ComboBoxPopper options={list} loading={loading} searchTerm={searchTerm} onSearch={setSearchTerm} />
}

export default SelectSegmentsPopoverContent
