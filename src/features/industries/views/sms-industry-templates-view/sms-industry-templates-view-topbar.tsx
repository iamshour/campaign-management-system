//#region Import
import type { DataGridState } from "@/core/slices/data-grid-slice/types"

import useSelector from "@/core/hooks/useSelector"
import { Button, Skeleton } from "@/ui"
import PhUserPlus from "~icons/ph/user-plus"
import { lazy, Suspense } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const DeleteIndustryTemplateDialog = lazy(
	() => import("@/features/industries/dialogs/delete-industry-template-dialog/delete-industry-template-dialog")
)
//#endregion

const SmsIndustryTemplatesViewTopbar = () => {
	const navigate = useNavigate()

	const { pathname } = useLocation()

	const { selection } = useSelector<DataGridState<"sms-industry-templates">>(
		({ dataGrid }) => dataGrid["sms-industry-templates"]
	)

	return (
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

			<Button onClick={() => navigate("new-template", { state: { from: pathname } })}>
				<PhUserPlus />
				Create Template
			</Button>
		</div>
	)
}

export default SmsIndustryTemplatesViewTopbar
