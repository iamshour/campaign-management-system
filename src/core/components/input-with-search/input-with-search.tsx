//#region Import
import { Button, Input, Popover } from "@/ui"
import { useEffect, useRef, useState } from "react"
//#endregion

interface InputWithSearchProps {
	fetchState: {
		setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>
		suggestions?: string[]
	}
	onChange: (selectedType: React.ChangeEvent<HTMLInputElement> | string) => void
	placeholder: string
	value: string
}

const InputWithSearch = ({
	fetchState: { setShouldFetch, suggestions },
	onChange,
	placeholder,
	value,
}: InputWithSearchProps) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const firstButtonRef = useRef<HTMLButtonElement>(null)

	const [open, setOpen] = useState<boolean>(false)

	const shouldShowPopover = open && !!suggestions?.length

	const focusOnInput = () => inputRef?.current?.focus()

	const focusOnPopover = () => firstButtonRef?.current?.focus()

	useEffect(() => {
		shouldShowPopover && setTimeout(() => focusOnInput(), 0)
	}, [shouldShowPopover])

	useEffect(() => {
		const onTextChange = setTimeout(() => {
			const isInputFocus = document.activeElement === inputRef.current

			if (isInputFocus) setShouldFetch(!!value)
		}, 500)

		return () => clearTimeout(onTextChange)
	}, [value, setShouldFetch])

	return (
		<Popover onOpenChange={(focus) => !focus && setOpen(false)} open={shouldShowPopover}>
			<Popover.Trigger className='max-w-full'>
				<Input
					autoComplete='off'
					onChange={(e) => {
						const value = e?.target?.value

						setShouldFetch(false)

						setOpen(!!value)
						onChange(e)
					}}
					onKeyDown={(e) => e.key === "ArrowDown" && focusOnPopover()}
					placeholder={placeholder}
					ref={inputRef}
					size='lg'
					spellCheck='false'
					value={value}
				/>
			</Popover.Trigger>

			<Popover.Content align='start' className='flex flex-col border border-gray-300 px-0 py-1'>
				{suggestions?.map((suggestion, idx) => {
					return (
						<Button
							className='block w-full rounded-none text-start font-normal focus-visible:bg-primary-50/75 focus-visible:text-primary-950 focus-visible:ring-0'
							id={suggestion}
							key={suggestion}
							onClick={() => {
								onChange(suggestion)
								setShouldFetch(false)
								setOpen(false)
								focusOnInput()
							}}
							onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
								if (e.key === "ArrowDown") {
									// eslint-disable-next-line
									// @ts-ignore
									const nextElement = e?.target?.nextElementSibling

									if (nextElement) nextElement.focus()
								}

								if (e.key === "ArrowUp") {
									// eslint-disable-next-line
									// @ts-ignore
									const previousElement = e?.target?.previousElementSibling

									if (previousElement) previousElement.focus()
								}
							}}
							ref={idx === 0 ? firstButtonRef : undefined}
							variant='ghost'>
							{suggestion}
						</Button>
					)
				})}
			</Popover.Content>
		</Popover>
	)
}

export default InputWithSearch
