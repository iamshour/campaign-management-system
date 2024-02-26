//#region Import
import type { DataGridState } from "@/core/slices/data-grid-slice/types"

import useSelector from "@/core/hooks/useSelector"
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

const MoveToGroupDialogContent = lazy(() => import("./move-to-group-dialog-content"))
//#endregion

interface MoveToGroupDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof MoveToGroupDialogContent>, "closeDialog"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const MoveToGroupDialog = ({ children, id }: MoveToGroupDialogProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "dialogs.move-to-group" })

	const [open, setOpen] = useState(false)

	const { selection } = useSelector<DataGridState<"contacts-in-group">>(({ dataGrid }) => dataGrid["contacts-in-group"])

	const isMovingMultipleContacts = !id && (selection === "ALL" || (selection?.length && selection?.length > 1))

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className={twMerge(
					"w-[382px] sm:w-[390px]",
					isMovingMultipleContacts ? "h-[423px] sm:h-[431px]" : "h-[225px] sm:h-[233px]"
				)}
				title={t("title")}>
				<MoveToGroupDialogContent closeDialog={() => setOpen(false)} id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default MoveToGroupDialog
