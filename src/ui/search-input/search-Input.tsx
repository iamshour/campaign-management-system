//#region Import
import { forwardRef, useEffect, useState } from "react"

import Input from "../input/input"

// import IconamoonCloseBold from "~icons/iconamoon/close-bold"
import TablerSearch from "~icons/tabler/search"
//#endregion

export interface SearchInputProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, "onChange" | "value"> {
	value?: string
	delay?: number
	onChange: (input?: string) => void
}

const SearchInput = forwardRef<React.ElementRef<typeof Input>, SearchInputProps>(
	({ value, delay = 750, onChange, ...props }, ref) => {
		const [input, setInput] = useState(value)

		useEffect(() => {
			if (input !== undefined) {
				const handler = setTimeout(() => onChange(input), delay)

				return () => clearTimeout(handler)
			}
			// eslint-disable-next-line
		}, [input, delay])

		return (
			<Input
				ref={ref}
				placeholder='Search'
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
