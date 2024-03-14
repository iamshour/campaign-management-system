//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetChannelSourceListingByIdQuery } from "@/features/channels/common/api"
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

const ResendChannelSourceRequestDialog = ({ children, listingId, ...props }: ResendChannelSourceRequestDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: `dialogs.resendChannelSourceRequestDialog` })

	const [open, setOpen] = useState(false)

	const { closeDropdown } = useDropdownStateContext()

	const onCloseDialog = () => {
		// close action drop-down
		closeDropdown()

		// close ResendChannelSourceRequestDialog
		setOpen(false)
	}

	const { isError, isLoading, isReady, ...listing } = useGetChannelSourceListingByIdQuery(listingId, {
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			country: data?.country,
			isLoading: isLoading,
			isReady: !isLoading && Boolean(data?.channelSourceName),
			sender: data?.channelSourceName,
			templateType: data?.templateType,
			...rest,
		}),
		skip: !listingId || !open,
		...baseQueryConfigs,
	})

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[723.8px] w-[382px] sm:h-[521.8px] sm:w-[746px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t("title")}>
				{isLoading && <Skeleton />}

				{isError && <DisplayError className='h-full w-full' />}

				{isReady && (
					<ResendChannelSourceRequestDialogContent
						closeDialog={onCloseDialog}
						defaultValues={listing}
						listingId={listingId}
						{...props}
					/>
				)}
			</Dialog.Content>
		</Dialog>
	)
}

export default ResendChannelSourceRequestDialog
