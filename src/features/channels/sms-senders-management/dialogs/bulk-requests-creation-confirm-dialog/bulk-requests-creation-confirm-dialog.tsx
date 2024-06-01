//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

import { useBulkRequestsFormContext } from "../../components/bulk-requests-form/bulk-requests-form-context"
import { BulkPreviewData } from "../../components/bulk-requests-form/types"

const BulkRequestsCreationConfirmDialogContent = lazy(() => import("./bulk-requests-creation-confirm-dialog-content"))
//#endregion

interface BulkRequestsCreationConfirmDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof BulkRequestsCreationConfirmDialogContent>, "onSubmit">,
		Required<Pick<React.ComponentPropsWithRef<typeof Dialog>, "onOpenChange" | "open">> {
	data?: BulkPreviewData
}

const BulkRequestsCreationConfirmDialog = ({ data, onSubmit, ...props }: BulkRequestsCreationConfirmDialogProps) => {
	const { funnelKey } = useBulkRequestsFormContext()

	const { t } = useTranslation("senders-management", {
		keyPrefix: `dialogs.bulkRequestsCreationConfirm.${funnelKey}`,
	})

	if (!data) return

	return (
		<Dialog {...props}>
			<Dialog.Content className='h-[922px] w-[1256px]' title={t("title")}>
				<BulkRequestsCreationConfirmDialogContent
					closeDialog={() => props.onOpenChange(false)}
					data={data}
					onSubmit={onSubmit}
				/>
			</Dialog.Content>
		</Dialog>
	)
}

export default BulkRequestsCreationConfirmDialog
