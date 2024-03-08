//#region Import
import { ComboBoxPopper, OptionType } from "@/ui"
import { useState } from "react"
//#endregion

const SelectCompanyUsersPopoverContent = ({ companyId }: { companyId: string }) => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	// eslint-disable-next-line no-console
	console.log("Fetching users by company Id: ", companyId)

	const { list, loading } = {
		list: [{ label: "Ali", value: "018e1cdf-ee66-7780-b524-bf11973ccd0a" }] as OptionType[],
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

export default SelectCompanyUsersPopoverContent
