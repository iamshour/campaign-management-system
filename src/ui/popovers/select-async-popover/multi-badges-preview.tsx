//#region Import
import { OptionType } from "@/ui/types"

import Badge from "../../badge/badge"
//#endregion

interface MultiBadgesPreviewProps extends Pick<React.ComponentPropsWithoutRef<typeof Badge>, "size"> {
	placeholder?: React.ReactNode | string
	selection?: OptionType[]
}

const MultiBadgesPreview = ({ placeholder, selection, size }: MultiBadgesPreviewProps) => {
	if (!selection?.length) return placeholder || "Select Options"

	if (selection.length > 2) return <Badge size={size}>{selection.length} selected</Badge>

	return selection.map((option) => (
		<Badge key={option.value} size={size} title={option.label}>
			{option.label}
		</Badge>
	))
}

export default MultiBadgesPreview
