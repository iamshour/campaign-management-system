//#region Import
import { useNavigate } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import type { SharedListViewProps } from "@/core/types"
import type { Group } from "@/features/people/groups/types"
import { Button, DataGridSkeleton } from "@/ui"
import { format } from "@/utils"

import GroupsTableActions from "./groups-view-table-actions"

import IcRoundGroup from "~icons/ic/round-group"
import IcRoundGroups from "~icons/ic/round-groups"
//#endregion

const GroupsGridView = ({ list, isFetching, count }: SharedListViewProps<Group>) => {
	const navigate = useNavigate()

	if (isFetching) return <DataGridSkeleton />

	if (!isFetching && !count && !list?.length)
		return (
			<div className='h-full w-full p-4 flex-center'>
				<p className='text-center text-3xl font-bold'>Nothing Found</p>
			</div>
		)

	return (
		<div className='grid h-full justify-center gap-6 overflow-y-auto p-4 [grid-template-columns:100%] [grid-template-rows:250px] md:gap-7 md:[grid-template-columns:repeat(2,minmax(290px,550px))] xl:[grid-template-columns:repeat(3,minmax(290px,550px))] 3xl:[grid-template-columns:repeat(4,minmax(290px,550px))]'>
			{list?.map(({ groupName, description, groupId, createdAt, contactsCount }) => (
				<div key={groupId} className='flex h-[250px] w-full flex-col rounded-xl shadow-[0px_0px_6px_#00000021]'>
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
						<Button
							variant='ghost'
							size='lg'
							className='w-full rounded-xl rounded-t-none'
							onClick={() => navigate(`${appPaths.GROUPS}/${groupId}`)}>
							<IcRoundGroups />
							<span>View Contacts</span>
						</Button>
					</div>
				</div>
			))}
		</div>
	)
}

export default GroupsGridView
