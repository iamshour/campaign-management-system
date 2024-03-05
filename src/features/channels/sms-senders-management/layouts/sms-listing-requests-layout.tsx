//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import { Button } from "@/ui"
import { Outlet } from "react-router-dom"

import type { SmsListingRequestStatus } from "../types"
//#endregion

const SmsListingRequestsLayout = () => {
	const { name, pathname, type } = useGetChannelType()

	const currentStatus: SmsListingRequestStatus | undefined = pathname?.match("pending")
		? "PENDING"
		: pathname?.match("completed")
			? "COMPLETED"
			: undefined

	return (
		<div className='flex h-full w-full flex-col gap-6 overflow-hidden pt-6'>
			<div className='inline-flex gap-4 ps-10'>
				<FilterButton
					active={currentStatus === "PENDING"}
					as='link'
					label='Pending'
					to={`./${type}-${name}/listing-requests/pending`}
				/>
				<FilterButton
					active={currentStatus === "COMPLETED"}
					as='link'
					label='Completed'
					to={`./${type}-${name}/listing-requests/completed`}
				/>
			</div>

			<div className='h-full overflow-hidden'>
				<Outlet />
			</div>
		</div>
	)
}

export default SmsListingRequestsLayout

const FilterButton = ({ label, ...props }: { label: string } & React.ComponentPropsWithoutRef<typeof Button>) => (
	<Button
		className='border-transparent bg-primary-600 px-5 text-white data-[active=false]:bg-gray-100 data-[active=false]:text-black hover:border-primary-600'
		variant='outline'
		{...props}>
		{label}
	</Button>
)
