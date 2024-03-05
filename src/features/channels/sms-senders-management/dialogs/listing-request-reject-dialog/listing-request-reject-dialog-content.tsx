//#region Import
import { Button, Label, Textarea } from "@/ui"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
//#endregion

export interface ListingRequestRejectDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Listing request Id
	 */
	id: string

	/**
	 * Boolean used to check if request would only be rejected, or would also be blocked as well
	 */
	withBlock?: boolean
}

const ListingRequestRejectDialogContent = ({ closeDialog, id, withBlock }: ListingRequestRejectDialogContentProps) => {
	const { t } = useTranslation("senders-management", {
		keyPrefix: withBlock ? "dialogs.listingRequestRejectAndBlock" : "dialogs.listingRequestReject",
	})

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleSubmit = () => {
		const reason = textareaRef?.current

		// if withBlock, then send another payload...

		// eslint-disable-next-line no-console
		console.log(id, reason)

		closeDialog()
	}

	return (
		<div className='flex flex-col gap-8 p-2'>
			<p>{t("message")}</p>

			<div>
				<Label htmlFor='reason'>{t("textarea.label")}</Label>
				<Textarea
					className='h-[100px] rounded-md text-sm'
					id='reason'
					placeholder={t("textarea.placeholder")}
					ref={textareaRef}
				/>
			</div>

			<Button className='ms-auto w-max px-10' onClick={handleSubmit}>
				{t("submit")}
			</Button>
		</div>
	)
}

export default ListingRequestRejectDialogContent
