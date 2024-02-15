//#region Import
import { Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom"

import useSelector from "@/core/hooks/useSelector"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { Button, Skeleton } from "@/ui"

import PhUserPlus from "~icons/ph/user-plus"

const DeleteIndustryTemplateDialog = lazy(
	() => import("@/features/industries/dialogs/delete-industry-template-dialog/delete-industry-template-dialog")
)
//#endregion

const IndustryTemplatesViewTopbar = () => {
	const navigate = useNavigate()

	const { selection } = useSelector<AdvancedTableStateType<"sms-industry-templates">>(
		({ advancedTable }) => advancedTable["sms-industry-templates"]
	)

	return (
		<>
			<div className='flex flex-1 justify-between'>
				<div className='flex gap-2'>
					{(selection === "ALL" || !!selection?.length) && (
						<Suspense fallback={<Skeleton className='h-[36px] w-[140px]' />}>
							<DeleteIndustryTemplateDialog ids={selection === "ALL" ? [] : selection}>
								<Button variant='secondary'>Delete Templates</Button>
							</DeleteIndustryTemplateDialog>
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

export default IndustryTemplatesViewTopbar
