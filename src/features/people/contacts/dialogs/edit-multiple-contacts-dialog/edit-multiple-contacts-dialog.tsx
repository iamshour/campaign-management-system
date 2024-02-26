//#region Import
import type { DataGridState } from "@/core/slices/data-grid-slice/types"

import useSelector from "@/core/hooks/useSelector"
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { twMerge } from "tailwind-merge"

const EditMultipleContactsDialogContent = lazy(() => import("./edit-multiple-contacts-dialog-content"))
//#endregion

interface EditMultipleContactsDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof EditMultipleContactsDialogContent>, "actionType"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode

	/**
	 * Dialog Content Title (Shown in Header)
	 */
	title: string
}

const EditMultipleContactsDialog = ({ actionType, children, title }: EditMultipleContactsDialogProps) => {
	const [open, setOpen] = useState(false)

	const { selection } = useSelector<DataGridState<"contacts">>(({ dataGrid }) => dataGrid["contacts"])

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content
				// Checking if Prompt field would be displayed, so that we'd change size respectively
				className={twMerge(
					"w-[382px] sm:w-[390px]",
					selection === "ALL" ? "h-[447px] xs:h-[423px] sm:h-[431px]" : "h-[225px] sm:h-[233px]"
				)}
				title={title}>
				<EditMultipleContactsDialogContent actionType={actionType} onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default EditMultipleContactsDialog
