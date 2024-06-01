//#region Import
import { Button, Textarea } from "@/ui"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
//#endregion

export interface TextareaPopoverContentProps {
	/**
	 * Callback function used to close popover
	 */
	closePopover: () => void

	/**
	 * Callback function used to updated textarea value once user submits
	 * @param value updated value passed from the textarea (user input)
	 */
	onValueChange: (value: string | undefined) => void

	/**
	 * Textarea Placeholder
	 */
	placeholder?: string

	/**
	 * Default Value passed to the textarea
	 */
	value: string | undefined
}

const TextareaPopoverContent = ({ closePopover, onValueChange, placeholder, value }: TextareaPopoverContentProps) => {
	const { t } = useTranslation("ui", { keyPrefix: "textareaTooltip" })

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const submitChange = () => {
		onValueChange(textareaRef.current?.value)
		closePopover()
	}

	return (
		<div className='flex w-full flex-col items-end gap-3'>
			<Textarea
				className='rounded-md text-sm'
				defaultValue={value || ""}
				placeholder={placeholder}
				ref={textareaRef}
				rows={4}
			/>

			<Button className='w-max px-10' onClick={submitChange} size='sm'>
				{t("submit")}
			</Button>
		</div>
	)
}

export default TextareaPopoverContent
