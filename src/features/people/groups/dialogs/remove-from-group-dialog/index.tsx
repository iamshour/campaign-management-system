//#region Import
import { twMerge, Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

import useSelector from "@/core/hooks/useSelector"

const RemoveFromGroupDialogContent = lazy(() => import("./remove-from-group-dialog-content"))
//#endregion

interface RemoveFromGroupDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof RemoveFromGroupDialogContent>, "id"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const RemoveFromGroupDialog = ({ children, id }: RemoveFromGroupDialogProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "dialogs.remove-from-group" })
	const [open, setOpen] = useState(false)

	const { selection } = useSelector(({ advancedTable }) => advancedTable["contacts-in-group"])

	const isRemovingMultipleContacts = !id && (selection === "ALL" || (selection?.length && selection?.length > 1))

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				title={t("title")}
				className={twMerge(
					"w-[382px] sm:w-[390px]",
					isRemovingMultipleContacts ? "h-[343px] sm:h-[327px]" : "h-[201px] sm:h-[209px]"
				)}>
				<RemoveFromGroupDialogContent id={id} onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default RemoveFromGroupDialog
