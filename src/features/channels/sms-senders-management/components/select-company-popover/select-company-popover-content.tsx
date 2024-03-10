//#region Import
import { useGetCompaniesListQuery } from "@/features/channels/sms-senders-management/api"
import { SelectAsyncOptionsPopoverContent } from "@/ui"
import { useState } from "react"
//#endregion

const SelectCompanyPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	const { list, loading } = useGetCompaniesListQuery(undefined, {
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			list: data?.list?.map(({ id, name }) => ({ label: name, value: id })),
			loading: isLoading,
			...rest,
		}),
	})

	return (
		<SelectAsyncOptionsPopoverContent
			loading={loading}
			onSearch={setSearchTerm}
			options={list}
			searchTerm={searchTerm}
		/>
	)
}

export default SelectCompanyPopoverContent
