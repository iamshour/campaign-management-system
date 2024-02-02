//#region Import
import { useState } from "react"

import { ComboBoxPopper, type OptionType } from "@/ui"
//#endregion

const SelectExportedByPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	// TODO: HANDLE FETCH EXPORTED BY HERE USING RTK-QUERY
	const list: OptionType[] = [
		{ label: "Ali Shour", value: "id123" },
		{ label: "Haifa Naim", value: "id345" },
	]
	const loading = false

	return (
		<ComboBoxPopper
			options={list as OptionType[] | undefined}
			loading={loading}
			searchTerm={searchTerm}
			onSearch={setSearchTerm}
		/>
	)
}

export default SelectExportedByPopoverContent
