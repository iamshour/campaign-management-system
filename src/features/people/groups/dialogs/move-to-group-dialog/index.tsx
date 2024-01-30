//#region Import
import { twMerge } from "@package/ui"
import Dialog from "@package/ui/src/dialog"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

import useSelector from "@/core/hooks/useSelector"

const MoveToGroupDialogContent = lazy(() => import("./move-to-group-dialog-content"))
//#endregion

interface MoveToGroupDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof MoveToGroupDialogContent>, "onClose"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const MoveToGroupDialog = ({ children, id }: MoveToGroupDialogProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "dialogs.move-to-group" })

	const [open, setOpen] = useState(false)

	const { selection } = useSelector(({ advancedTable }) => advancedTable["contacts-in-group"])

	const isMovingMultipleContacts = !id && (selection === "ALL" || (selection?.length && selection?.length > 1))

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				title={t("title")}
				className={twMerge(
					"w-[382px] sm:w-[390px]",
					isMovingMultipleContacts ? "h-[423px] sm:h-[431px]" : "h-[225px] sm:h-[233px]"
				)}>
				<MoveToGroupDialogContent id={id} onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default MoveToGroupDialog
