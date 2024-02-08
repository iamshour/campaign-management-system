//#region Import
import { forwardRef } from "react"

import { useDebouncedInput } from "@/utils"

import Input from "."

import TablerSearch from "~icons/tabler/search"
//#endregion
export interface SearchInputProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, "onChange" | "value"> {
	delay?: number
	onChange: (input: string) => void
}

const SearchInput = forwardRef<React.ElementRef<typeof Input>, SearchInputProps>(
	({ delay = 750, onChange, ...props }, ref) => {
		const [input, setInput] = useDebouncedInput(onChange, { delay })

		return (
			<Input
				ref={ref}
				placeholder='Search by any field'
				leftIcon={TablerSearch}
				spellCheck={false}
				value={input || ""}
				onChange={(e) => setInput(e.target.value)}
				{...props}
			/>
		)
	}
)

SearchInput.displayName = "SearchInput"

export default SearchInput
