//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetChannelSourceListingByIdQuery } from "@/features/channels/common/api"
import { useChannelSourceNameContext } from "@/features/channels/sms-senders/utils/channel-source-name-context"
import { Dialog, Skeleton } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const ResendChannelSourceRequestDialogContent = lazy(() => import("./resend-channel-source-request-dialog-content"))
//#endregion

interface ResendChannelSourceRequestDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ResendChannelSourceRequestDialogContent>, "listingId"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const ResendChannelSourceRequestDialog = ({ children, listingId }: ResendChannelSourceRequestDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: `dialogs.resendChannelSourceRequestDialog` })

	const [open, setOpen] = useState(false)

	const { closeDropdown } = useDropdownStateContext()

	const { channelSourceName } = useChannelSourceNameContext()

	const onCloseDialog = () => {
		// close action drop-down
		closeDropdown()

		// close ResendChannelSourceRequestDialog
		setOpen(false)
	}

	const { isError, isLoading, isReady, listing } = useGetChannelSourceListingByIdQuery(listingId, {
		selectFromResult: ({ data, isLoading, isSuccess, ...rest }) => ({
			isLoading: isLoading,
			isReady: !isLoading && isSuccess,
			listing: {
				country: data?.country,
				templateType: data?.templateType,
			},
			...rest,
		}),
		skip: !listingId || !open,
		...baseQueryConfigs,
	})

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[623px] w-[382px] sm:h-[487px] sm:w-[746px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t("title")}>
				{isLoading && <Skeleton />}

				{isError && <DisplayError className='h-full w-full' />}

				{isReady && (
					<ResendChannelSourceRequestDialogContent
						closeDialog={onCloseDialog}
						defaultValues={{ ...listing, sender: channelSourceName }}
						listingId={listingId}
					/>
				)}
			</Dialog.Content>
		</Dialog>
	)
}

export default ResendChannelSourceRequestDialog
