import { useEffect, useState } from "react"

const useDebouncedInput = (onChange: (searchTerm: string) => void, configs?: { delay?: number }) => {
	const [input, setInput] = useState<string | undefined>(undefined)

	useEffect(() => {
		if (input !== undefined) {
			const handler = setTimeout(() => onChange(input), configs?.delay || 500)

			return () => clearTimeout(handler)
		}
	}, [input, configs?.delay, onChange])

	return [input, setInput] as const
}

export default useDebouncedInput
