//#region Import
import { Dialog, Skeleton } from "@/ui"
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"

const ViewListingSampleContentDialogContent = lazy(() => import("./view-listing-sample-content-dialog-content"))
//#endregion

interface ViewListingSampleContentDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ViewListingSampleContentDialogContent>, "id"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const ViewListingSampleContentDialog = ({ children, ...props }: ViewListingSampleContentDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.viewListingSampleContentDialog" })

	return (
		<Dialog>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content className='min-h-[200px] w-[412px] ' title={t(`title`)}>
				<Suspense fallback={<Skeleton className='h-[119px]' />}>
					<ViewListingSampleContentDialogContent {...props} />
				</Suspense>
			</Dialog.Content>
		</Dialog>
	)
}

export default ViewListingSampleContentDialog
