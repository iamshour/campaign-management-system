//#region Import
import type { Group } from "@/features/people/groups/types"

import { Button, Skeleton } from "@/ui"
import IcRoundGroup from "~icons/ic/round-group"
import IcRoundGroups from "~icons/ic/round-groups"
import { format } from "date-fns"
import { lazy, Suspense } from "react"

const GroupsViewTableActions = lazy(() => import("./groups-view-table-actions"))
//#endregion

const GroupCard = ({ contactsCount, createdAt, description, groupId, groupName }: Group) => {
	return (
		<div className='flex h-[250px] w-[470px] max-w-full flex-col rounded-xl shadow-[0px_0px_6px_#00000021] 3xl:w-[480px]'>
			<div className='flex w-full justify-between gap-2 overflow-hidden border-b border-b-gray-200 p-4'>
				<div className='flex flex-1 items-center gap-2 overflow-hidden'>
					<span className='h-11 w-11 shrink-0 rounded-full bg-[#054060] flex-center'>
						<IcRoundGroup className='text-lg text-white' />
						<p className='sr-only'>Group Avatar</p>
					</span>
					<p className='flex-1 truncate text-base font-bold'>{groupName}</p>
				</div>

				<Suspense fallback={<Skeleton className='h-[40px] w-[40px]' />}>
					<GroupsViewTableActions
						className='rotate-90'
						description={description}
						groupId={groupId}
						groupName={groupName}
					/>
				</Suspense>
			</div>

			<ul className='w-full flex-1 space-y-2 p-4'>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>Group description:</span>
					<span className='block truncate' title={description}>
						{description}
					</span>
				</li>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>Creation date:</span>
					<span className='block truncate'>{format(new Date(createdAt), "MM-dd-yyyy")}</span>
				</li>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>Number of contacts:</span>
					<span className='block truncate'>{contactsCount ?? 0}</span>
				</li>
			</ul>

			<div className='border-t border-t-gray-200'>
				<Button as='link' className='w-full rounded-xl rounded-t-none' size='lg' to={groupId} variant='ghost'>
					<IcRoundGroups />
					<span>View Contacts</span>
				</Button>
			</div>
		</div>
	)
}

export default GroupCard
