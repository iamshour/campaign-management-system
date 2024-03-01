//#region Import
import { ComboBoxPopper, OptionType } from "@/ui"
import { useState } from "react"
//#endregion

const SelectCompanyPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	const { list, loading } = {
		list: [
			{ label: "Blue.AI", value: "blue" },
			{ label: "Antwerp", value: "antwerp" },
			{ label: "Monty", value: "monty" },
		] as OptionType[],
		loading: false,
	}

	// TODO: USE BELOW FROM RTK AFTER IMPLEMENTATION
	// const { list, loading } = useGetCompanyQuery(
	// 	{ limit: 100, offset: 0 },
	// 	{
	// 		selectFromResult: ({ data, isLoading, ...rest }) => ({
	// 			count: data?.count,
	// 			list: data?.list?.map(({ id, name }) => ({ label: name, value: id })),
	// 			loading: isLoading,
	// 			...rest,
	// 		}),
	// 	}
	// )

	return <ComboBoxPopper loading={loading} onSearch={setSearchTerm} options={list} searchTerm={searchTerm} />
}

export default SelectCompanyPopoverContent
