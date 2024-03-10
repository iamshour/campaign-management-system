//#region Import
import { useGetUsersByCompanyIdQuery } from "@/features/channels/sms-senders-management/api"
import { SelectAsyncOptionsPopoverContent } from "@/ui"
import { useState } from "react"
//#endregion

const SelectCompanyUsersPopoverContent = ({ companyId }: { companyId: string }) => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	const { list, loading } = useGetUsersByCompanyIdQuery(companyId, {
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			count: data?.count,
			list: data?.list?.map(({ email, id }) => ({ label: email, value: id })),
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

export default SelectCompanyUsersPopoverContent
