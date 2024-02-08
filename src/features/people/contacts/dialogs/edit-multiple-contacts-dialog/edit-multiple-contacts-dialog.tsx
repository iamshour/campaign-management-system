//#region Import
import { lazy, useState } from "react"

import useSelector from "@/core/hooks/useSelector"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { twMerge, Dialog } from "@/ui"

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

const EditMultipleContactsDialog = ({ children, title, actionType }: EditMultipleContactsDialogProps) => {
	const [open, setOpen] = useState(false)

	const { selection } = useSelector<AdvancedTableStateType<"contacts">>(
		({ advancedTable }) => advancedTable["contacts"]
	)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content
				title={title}
				// Checking if Prompt field would be displayed, so that we'd change size respectively
				className={twMerge(
					"w-[382px] sm:w-[390px]",
					selection === "ALL" ? "h-[447px] xs:h-[423px] sm:h-[431px]" : "h-[225px] sm:h-[233px]"
				)}>
				<EditMultipleContactsDialogContent onClose={() => setOpen(false)} actionType={actionType} />
			</Dialog.Content>
		</Dialog>
	)
}

export default EditMultipleContactsDialog
