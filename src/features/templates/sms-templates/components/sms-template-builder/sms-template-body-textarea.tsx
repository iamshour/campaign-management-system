//#region Import
import { useEffect, useRef } from "react"
import { useFormContext } from "react-hook-form"

import { MAX_PARTS } from "@/features/templates/sms-templates/constants/sms-template-body-constants"
import useSmsTemplateBody from "@/features/templates/sms-templates/hooks/useSmsTemplateBody"
import { Form, Textarea, Button } from "@/ui"
//#endregion

const SmsTemplateBodyTextarea = () => {
	const { control, watch, setValue } = useFormContext()

	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const currentBody: string = watch("body") ?? ""

	const { maxCharactersPerPart, charactersCountInCurrentPart, partsCount, placeholdersCount, getReformattedBody } =
		useSmsTemplateBody(currentBody)

	/**
	 * Debounce for textarea to reformat value when user stops typing
	 */
	useEffect(() => {
		if (currentBody !== undefined) {
			const handler = setTimeout(() => {
				const reformattedBody = getReformattedBody(currentBody)

				if (reformattedBody !== currentBody) setValue("body", reformattedBody)
			}, 700)

			return () => clearTimeout(handler)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentBody])

	/**
	 * Function to add insert new placeholder inside text based on cursor postion in textarea
	 * @param newPlaceHolder: string
	 */
	const addPlaceholder = (newPlaceHolder: string) => {
		const cursorPosition = textareaRef.current?.selectionStart ?? 0

		const updatedText =
			currentBody.substring(0, cursorPosition) + newPlaceHolder + currentBody.substring(cursorPosition)
		const updatedCursorPostion = cursorPosition! + newPlaceHolder.length

		updateTextarea(updatedText, updatedCursorPostion)
	}

	/**
	 * Function that adds a new placeholder to textarea when user inputs {{ in textarea
	 * checks if current input is { and previous character is {
	 * @param e: KeyboardEvent
	 */
	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key !== "{") return

		const cursorPosition = textareaRef.current?.selectionStart ?? 1
		const previousKey = currentBody[cursorPosition - 1]
		if (previousKey !== "{") return

		e.preventDefault()

		addPlaceholder(`{${placeholdersCount + 1}}}`)
	}

	/**
	 * Function to update the text in textarea and update cursor position
	 * @param updatedText: string to be set as textarea value
	 * @param updatedCursorPostion: position to place cursor after setting textarea value
	 */
	const updateTextarea = (updatedText: string, updatedCursorPostion: number) => {
		setValue("body", updatedText)
		setTimeout(() => {
			// Note: using setTimeout since setSelectionRange does not work right after setValue
			textareaRef.current?.focus()
			textareaRef.current?.setSelectionRange(updatedCursorPostion, updatedCursorPostion)
		}, 0)
	}

	return (
		<div>
			<Form.Field
				control={control}
				name='body'
				render={({ field }) => (
					<Form.Item className='col-span-2'>
						<Form.Label>Template Body *</Form.Label>
						<Form.Control>
							<Textarea
								placeholder='Body goes here'
								rows={3}
								className='resize-y bg-white !transition-none'
								{...field}
								ref={textareaRef}
								onKeyDown={handleOnKeyDown}
							/>
						</Form.Control>
						<Form.Message />
					</Form.Item>
				)}
			/>

			<div className='mt-2 flex flex-row items-start justify-between'>
				<div className='flex flex-row text-xs'>
					<p className='my-auto pr-3'>
						<span className='mr-1 text-[#8F8F8F]'>Charcters:</span>
						{charactersCountInCurrentPart}/{maxCharactersPerPart}
					</p>
					<p className='my-auto border-l-2 border-[#8F8F8F] pl-3'>
						<span className='mr-1 text-[#8F8F8F]'>SMS Parts:</span>({partsCount}/{MAX_PARTS})
					</p>
				</div>
				<Button
					variant='secondary'
					size='sm'
					type='button'
					onClick={() => addPlaceholder(`{{${placeholdersCount + 1}}}`)}>
					Add Placeholder
				</Button>
			</div>
		</div>
	)
}

export default SmsTemplateBodyTextarea
