//#region Import
import { useRef } from "react"

import type { UseFormReturn } from "@/ui"
import { Form, Textarea, Button } from "@/ui"

import { MAX_PARTS } from "../../constants/sms-template-body-constants"
import { SmsTemplateSchemaType } from "../../schemas/sms-template-schema"
import useSmsTemplateBody from "../../utils/sms-template-body-hook"
import { rearrangePlaceholders } from "../../utils/sms-template-body-utils"
//#endregion

const SmsTemplateBodyTextarea = ({ form }: { form: UseFormReturn<SmsTemplateSchemaType> }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const currentBody: string = form.watch("body")

	const { maxCharactersPerPart, charactersCountInCurrentPart, partsCount, placeholdersCount } =
		useSmsTemplateBody(currentBody)

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
	 * Function that adds a new placeholder to textarea when "Add Placeholder" button is clicked
	 */
	const handleOnAddPlaceholderClick = () => {
		addPlaceholder(`{{${placeholdersCount + 1}}}`)
	}

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
	 * Function to update the text in textarea and update cursor position
	 * @param updatedText: string to be set as textarea value
	 * @param updatedCursorPostion: position to place cursor after setting textarea value
	 */
	const updateTextarea = (updatedText: string, updatedCursorPostion: number) => {
		form.setValue("body", rearrangePlaceholders(updatedText))
		setTimeout(() => {
			// Note: using setTimeout since setSelectionRange does not work right after setValue
			textareaRef.current?.focus()
			textareaRef.current?.setSelectionRange(updatedCursorPostion, updatedCursorPostion)
		}, 0)
	}

	return (
		<>
			<Form.Field
				control={form.control}
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

			<div className='mt-2 flex flex-row items-stretch justify-between'>
				<div className='flex flex-row items-stretch text-xs'>
					<p className='my-auto pr-3'>
						<span className='mr-1 text-[#8F8F8F]'>Charcters:</span>
						{charactersCountInCurrentPart}/{maxCharactersPerPart}
					</p>
					<p className='my-auto border-l-2 border-[#8F8F8F] pl-3'>
						<span className='mr-1 text-[#8F8F8F]'>SMS Parts:</span>({partsCount}/{MAX_PARTS})
					</p>
				</div>
				<Button variant='secondary' type='button' onClick={handleOnAddPlaceholderClick}>
					Add Placeholder
				</Button>
			</div>
		</>
	)
}

export default SmsTemplateBodyTextarea
