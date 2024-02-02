//#region Import
import { Dropdown } from "@blueai/ui"
import { useLocation, useNavigate } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import ExportFieldsDialog from "@/features/people/exports/dialogs/export-fields-dialog"
import DeleteSegmentDialog from "@/features/people/segments/dialogs/delete-segment-dialog"

import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
//#endregion

/**
 * Row Actions Component used inside td of AdvancedTable used in `SegmentsView` Component
 *
 * @param param0.id Row Id that would have edit/delete/eport actions supported
 * @returns
 */
const SegmentsRowActions = ({ id }: { id: string }) => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	return (
		<Dropdown>
			<Dropdown.Trigger showArrow={false} variant='ghost' className='h-max w-max p-1.5'>
				<BiThreeDotsVertical />
			</Dropdown.Trigger>

			<Dropdown.Content sideOffset={0} align='end'>
				<Dropdown.Item
					onClick={() => navigate(appPaths.SEGMENT_EDIT.replace(":id", id), { state: { from: pathname } })}>
					Edit
				</Dropdown.Item>
				<Dropdown.Separator />

				<DeleteSegmentDialog id={id}>
					<Dropdown.Item>Delete</Dropdown.Item>
				</DeleteSegmentDialog>
				<Dropdown.Separator />

				<ExportFieldsDialog exportsType='segments'>
					<Dropdown.Item>Export</Dropdown.Item>
				</ExportFieldsDialog>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default SegmentsRowActions
