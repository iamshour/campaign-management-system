//#region Import
import { Dialog } from "@blueai/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const CreateGroupContent = lazy(() => import("@/features/people/groups/components/create-group-content"))
//#endregion

interface CreateGroupDialogProps
	extends Omit<React.ComponentPropsWithoutRef<typeof CreateGroupContent>, "closePopover"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const CreateGroupDialog = ({ children, ...props }: CreateGroupDialogProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "dialogs.create-group.title" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				title={props?.groupId?.length ? t("edit-group") : t("new-group")}
				className='h-[321px] w-[382px] sm:h-[329px] sm:w-[390px]'
				onInteractOutside={(e) => e.preventDefault()}>
				<CreateGroupContent
					{...props}
					closePopover={() => setOpen(false)}
					size='lg'
					ctaButtonProps={{ variant: "default" }}
				/>
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateGroupDialog
