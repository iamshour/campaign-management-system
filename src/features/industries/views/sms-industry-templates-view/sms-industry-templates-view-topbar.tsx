//#region Import
import type { Selection } from "@/core/components/data-view/types"

import { selectSelection } from "@/core/components/data-view/data-view-slice"
import useSelector from "@/core/hooks/useSelector"
import { Button, Skeleton } from "@/ui"
import PhUserPlus from "~icons/ph/user-plus"
import { lazy, memo, Suspense } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const DeleteIndustryTemplateDialog = lazy(
	() => import("@/features/industries/dialogs/delete-industry-template-dialog/delete-industry-template-dialog")
)
//#endregion

const SmsIndustryTemplatesViewTopbar = memo(() => {
	const navigate = useNavigate()

	const { pathname } = useLocation()

	const selection = useSelector<Selection>((state) => selectSelection(state, "sms-industry-templates"))

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
})

SmsIndustryTemplatesViewTopbar.displayName = "SmsIndustryTemplatesViewTopbar"

export default SmsIndustryTemplatesViewTopbar
