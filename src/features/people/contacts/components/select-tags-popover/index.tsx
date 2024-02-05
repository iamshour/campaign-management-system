//#region Import
import { lazy } from "react"
import { useTranslation } from "react-i18next"

import { ComboBox } from "@/ui"

const SelectTagsPopoverContent = lazy(() => import("./select-tags-popover-content"))
//#endregion

const SelectTagsPopover = ({ label, ...props }: React.ComponentPropsWithoutRef<typeof ComboBox>) => {
	const { t } = useTranslation("contacts", { keyPrefix: "components.tagsPopover" })

	return (
		<ComboBox label={label ?? t("label")} {...props}>
			<ComboBox.Trigger>{t(props?.isMulti ? "placeholder.multi" : "placeholder.single")}</ComboBox.Trigger>

			<ComboBox.Content>
				<SelectTagsPopoverContent />
			</ComboBox.Content>
		</ComboBox>
	)
}

export default SelectTagsPopover
