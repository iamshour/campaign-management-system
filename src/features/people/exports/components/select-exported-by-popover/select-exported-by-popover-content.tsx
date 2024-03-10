//#region Import
import { type OptionType, SelectAsyncOptionsPopoverContent } from "@/ui"
import { useState } from "react"
//#endregion

const SelectExportedByPopoverContent = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

	const list: OptionType[] = [
		{ label: "jhghgh tyxrx", value: "idad5" },
		{ label: "asfdv acsdvb", value: "idaddf5" },
		{ label: "mklnjh lnjkbhvg", value: "ifdvdfb45" },
		{ label: ";mklnjk lnjkbhj", value: "i3243245" },
		{ label: "onuibu jnbkhjv", value: "i235435" },
		{ label: "jkbhvgh bjkhvg", value: "it5rhh45" },
		{ label: "nkbhjgv hjbvg", value: "idregerb45" },
		{ label: "mnjkbhj bjkhjvg", value: "43rtgbtre" },
		{ label: "klnjbhj jkhgj", value: "revf" },
		{ label: "lknjbh bhjvg", value: "fvdbdg45t" },
		{ label: "ijohugy uigytfy", value: "rebbt4235" },
		{ label: "njkbhyvt kbhvjgth", value: "23432rff" },
		{ label: "jnkbhvg bhkvjgc", value: "324rf32efdf" },
		{ label: "ohigyutf tvhcr", value: "23432rdfw" },
	]

	return (
		<SelectAsyncOptionsPopoverContent
			loading={false}
			onSearch={setSearchTerm}
			options={list as OptionType[] | undefined}
			searchTerm={searchTerm}
		/>
	)
}

export default SelectExportedByPopoverContent
