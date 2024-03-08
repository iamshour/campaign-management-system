//#region Import
import type { OptionType } from "../types"

import Badge from "../badge/badge"
//#endregion

interface MultiBadegesPreviewProps extends React.ComponentPropsWithoutRef<typeof Badge> {
	selection: OptionType[]
}

const MultiBadegesPreview = ({ selection, ...props }: MultiBadegesPreviewProps) => {
	return selection.length > 2 ? (
		<Badge {...props}>{selection.length} selected</Badge>
	) : (
		selection.map((option) => (
			<Badge key={option.value} title={option.label} {...props}>
				{option.label}
			</Badge>
		))
	)
}

export default MultiBadegesPreview
