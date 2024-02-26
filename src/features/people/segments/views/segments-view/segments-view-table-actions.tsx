//#region Import
import appPaths from "@/core/constants/app-paths"
import ExportFieldsDialog from "@/features/people/exports/dialogs/export-fields-dialog/export-fields-dialog"
import DeleteSegmentDialog from "@/features/people/segments/dialogs/delete-segment-dialog/delete-segment-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { useLocation, useNavigate } from "react-router-dom"
//#endregion

/**
 * Table Actions Component used inside td of DataGrid used in `SegmentsView` Component
 *
 * @param param0.id Row Id that would have edit/delete/eport actions supported
 * @returns
 */
const SegmentsViewTableActions = ({ id }: { id: string }) => {
	const { pathname } = useLocation()

	const navigate = useNavigate()

	return (
		<ActionsDropdown>
			<ActionsDropdown.Item
				onClick={() => navigate(appPaths.SEGMENT_EDIT.replace(":id", id), { state: { from: pathname } })}>
				Edit
			</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<DeleteSegmentDialog id={id}>
				<ActionsDropdown.Item>Delete</ActionsDropdown.Item>
			</DeleteSegmentDialog>

			<ActionsDropdown.Separator />

			<ExportFieldsDialog exportsType='segments'>
				<ActionsDropdown.Item>Export</ActionsDropdown.Item>
			</ExportFieldsDialog>
		</ActionsDropdown>
	)
}

export default SegmentsViewTableActions
