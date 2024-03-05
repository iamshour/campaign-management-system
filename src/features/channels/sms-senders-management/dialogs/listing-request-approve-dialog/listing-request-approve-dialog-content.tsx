//#region Import
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

export interface ListingRequestApproveDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Listing request Id
	 */
	id: string
}

const ListingRequestApproveDialogContent = ({ closeDialog, id }: ListingRequestApproveDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.listingRequestApprove" })

	const handleSubmit = () => {
		// eslint-disable-next-line no-console
		console.log("Handling approve...", id)

		closeDialog()
	}

	return (
		<div className='flex flex-col gap-8 p-2'>
			<p>{t("message")}</p>

			<Button className='ms-auto w-max px-10' onClick={handleSubmit}>
				{t("submit")}
			</Button>
		</div>
	)
}

export default ListingRequestApproveDialogContent
