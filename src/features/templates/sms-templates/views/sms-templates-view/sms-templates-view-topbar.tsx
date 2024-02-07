//#region Import
import { Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom"

import useSelector from "@/core/hooks/useSelector"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { Button, Skeleton } from "@/ui"

import PhUserPlus from "~icons/ph/user-plus"

const DeleteTemplateDialog = lazy(() => import("@/features/templates/sms-templates/dialogs/delete-template-dialog"))
//#endregion

const SmsTemplatesViewTopbar = () => {
	const navigate = useNavigate()

	const { selection } = useSelector<AdvancedTableStateType<"sms-templates">>(
		({ advancedTable }) => advancedTable["sms-templates"]
	)

	return (
		<>
			<div className='flex flex-1 justify-between'>
				<div className='flex gap-2'>
					{(selection === "ALL" || !!selection?.length) && (
						<Suspense fallback={<Skeleton className='h-[36px] w-[140px]' />}>
							<DeleteTemplateDialog ids={selection === "ALL" ? [] : selection}>
								<Button variant='secondary'>Delete Templates</Button>
							</DeleteTemplateDialog>
						</Suspense>
					)}
				</div>

				<Button onClick={() => navigate("new-template")}>
					<PhUserPlus />
					Create Template
				</Button>
			</div>
		</>
	)
}

export default SmsTemplatesViewTopbar
