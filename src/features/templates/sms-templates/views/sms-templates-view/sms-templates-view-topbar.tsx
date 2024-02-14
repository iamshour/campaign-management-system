//#region Import
import { Suspense, lazy } from "react"

import useSelector from "@/core/hooks/useSelector"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import CreateSmsTemplateDialog from "@/features/templates/sms-templates/dialogs/create-sms-template-dialog/create-sms-template-dialog"
import { Button, Skeleton } from "@/ui"

import PhUserPlus from "~icons/ph/user-plus"

const DeleteSmsTemplateDialog = lazy(
	() => import("@/features/templates/sms-templates/dialogs/delete-sms-template-dialog/delete-sms-template-dialog")
)
//#endregion

const SmsTemplatesViewTopbar = () => {
	const { selection } = useSelector<AdvancedTableStateType<"sms-templates">>(
		({ advancedTable }) => advancedTable["sms-templates"]
	)

	return (
		<>
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
		</>
	)
}

export default SmsTemplatesViewTopbar
