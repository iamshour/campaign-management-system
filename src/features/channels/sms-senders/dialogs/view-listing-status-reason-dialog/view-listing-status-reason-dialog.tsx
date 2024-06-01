//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import { Dialog, Skeleton } from "@/ui"
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"

const ViewListingStatusReasonDialogContent = lazy(() => import("./view-listing-status-reason-dialog-content"))

//#endregion

interface ViewListingStatusReasonDialogProps extends Pick<ChannelSourceListing, "channelSourceListingStatus" | "id"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const ViewListingStatusReasonDialog = ({
	channelSourceListingStatus,
	children,
	...props
}: ViewListingStatusReasonDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.viewListingStatusReasonDialog" })

	return (
		<Dialog>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content className='min-h-[200px] w-[412px]' title={t(`${channelSourceListingStatus}.title`)}>
				<Suspense fallback={<Skeleton className='h-[119px]' />}>
					<ViewListingStatusReasonDialogContent {...props} />
				</Suspense>
			</Dialog.Content>
		</Dialog>
	)
}

export default ViewListingStatusReasonDialog
