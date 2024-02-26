//#region Import
import type { DataGridState } from "@/core/slices/data-grid-slice/types"

import useSelector from "@/core/hooks/useSelector"
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

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

	const { selection } = useSelector<DataGridState<"contacts-in-group">>(({ dataGrid }) => dataGrid["contacts-in-group"])

	const isRemovingMultipleContacts = !id && (selection === "ALL" || (selection?.length && selection?.length > 1))

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className={twMerge(
					"w-[382px] sm:w-[390px]",
					isRemovingMultipleContacts ? "h-[343px] sm:h-[327px]" : "h-[201px] sm:h-[209px]"
				)}
				title={t("title")}>
				<RemoveFromGroupDialogContent closeDialog={() => setOpen(false)} id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default RemoveFromGroupDialog
