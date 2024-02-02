//#region Import
import { forwardRef, useEffect, useState } from "react"

import { debounce } from "@/utils"

import Input, { type InputProps } from "."

import TablerSearch from "~icons/tabler/search"
//#endregion
export interface SearchInputProps extends Omit<InputProps, "onChange" | "value"> {
	delay?: number
	value?: string
	onChange: (input: string) => void
}

const SearchInput = forwardRef<React.ElementRef<typeof Input>, SearchInputProps>(
	({ value, delay = 750, onChange, ...props }, ref) => {
		const [input, setInput] = useState(value)

		const debouncedSearch = debounce(onChange, delay)

		useEffect(() => {
			if (input !== undefined) {
				debouncedSearch(input)
				return () => debouncedSearch.cancel()
			}
			// eslint-disable-next-line
		}, [input])

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
