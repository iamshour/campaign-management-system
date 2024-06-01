//#region Import
// import IconamoonCloseBold from "~icons/iconamoon/close-bold"
import TablerSearch from "~icons/tabler/search"
import { forwardRef, memo, useEffect, useState } from "react"

import Input from "../input/input"
//#endregion

export interface SearchInputProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, "onChange" | "value"> {
	delay?: number
	onChange: (input?: string) => void
	value?: string
}

const DefaultSearchInput = forwardRef<React.ElementRef<typeof Input>, SearchInputProps>(
	({ delay = 750, onChange, value, ...props }, ref) => {
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
				leftIcon={TablerSearch}
				onChange={(e) => setInput(e.target.value)}
				placeholder='Search'
				ref={ref}
				spellCheck={false}
				value={input || ""}
				{...props}
			/>
		)
	}
)

DefaultSearchInput.displayName = "SearchInput"

const SearchInput = memo(DefaultSearchInput)

export default SearchInput
