//#region Import
import type { Selection } from "@/core/components/data-view/types"

import { selectSelection } from "@/core/components/data-view/data-view-slice"
import useSelector from "@/core/hooks/useSelector"
import CreateSmsTemplateDialog from "@/features/templates/sms-templates/dialogs/create-sms-template-dialog/create-sms-template-dialog"
import { Button, Skeleton } from "@/ui"
import PhUserPlus from "~icons/ph/user-plus"
import { lazy, memo, Suspense } from "react"

const DeleteSmsTemplateDialog = lazy(
	() => import("@/features/templates/sms-templates/dialogs/delete-sms-template-dialog/delete-sms-template-dialog")
)
//#endregion

const SmsTemplatesViewTopbar = memo(() => {
	const selection = useSelector<Selection>((state) => selectSelection(state, "sms-templates"))

	return (
		<div className='flex flex-1 justify-between'>
			<div className='flex gap-2'>
				{(selection === "ALL" || !!selection?.length) && (
					<Suspense fallback={<Skeleton className='h-[36px] w-[140px]' />}>
						<DeleteSmsTemplateDialog ids={selection === "ALL" ? [] : selection}>
							<Button variant='secondary'>Delete Templates</Button>
						</DeleteSmsTemplateDialog>
					</Suspense>
				)}
			</div>

			<CreateSmsTemplateDialog>
				<Button>
					<PhUserPlus />
					Create Template
				</Button>
			</CreateSmsTemplateDialog>
		</div>
	)
})

SmsTemplatesViewTopbar.displayName = "SmsTemplatesViewTopbar"

export default SmsTemplatesViewTopbar
