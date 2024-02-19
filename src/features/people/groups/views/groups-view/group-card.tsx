//#region Import
import { format } from "date-fns"

import type { Group } from "@/features/people/groups/types"
import { Button } from "@/ui"

import GroupsTableActions from "./groups-view-table-actions"

import IcRoundGroup from "~icons/ic/round-group"
import IcRoundGroups from "~icons/ic/round-groups"
//#endregion

const GroupCard = ({ groupId, groupName, description, createdAt, contactsCount }: Group) => {
	return (
		<div className='flex h-[250px] w-full max-w-full flex-col rounded-xl shadow-[0px_0px_6px_#00000021]'>
			<div className='flex w-full justify-between gap-2 overflow-hidden border-b border-b-gray-200 p-4'>
				<div className='flex flex-1 items-center gap-2 overflow-hidden'>
					<span className='h-11 w-11 shrink-0 rounded-full bg-[#054060] flex-center'>
						<IcRoundGroup className='text-lg text-white' />
						<p className='sr-only'>Group Avatar</p>
					</span>
					<p className='flex-1 truncate text-base font-bold'>{groupName}</p>
				</div>

				<GroupsTableActions groupId={groupId} groupName={groupName} description={description} />
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
				<Button as='link' to={groupId} variant='ghost' size='lg' className='w-full rounded-xl rounded-t-none'>
					<IcRoundGroups />
					<span>View Contacts</span>
				</Button>
			</div>
		</div>
	)
}

export default GroupCard
