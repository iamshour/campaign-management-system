//#region Import
import { Button } from "@/ui"
import { useState } from "react"
import { Outlet } from "react-router-dom"

import type { SmsListingRequestStatus } from "../types"
//#endregion

const SmsListingRequestsLayout = () => {
	const [currentStatus, setCurrentStatus] = useState<SmsListingRequestStatus>("PENDING")

	return (
		<div className='flex h-full w-full flex-col p-6'>
			<div className='inline-flex gap-4'>
				<FilterButton
					active={currentStatus === "PENDING"}
					label='Pending'
					onClick={() => setCurrentStatus("PENDING")}
				/>
				<FilterButton
					active={currentStatus === "COMPLETED"}
					label='Completed'
					onClick={() => setCurrentStatus("COMPLETED")}
				/>
			</div>

			<div className='flex-1 p-4'>
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
