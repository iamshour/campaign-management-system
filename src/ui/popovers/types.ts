//#region Import
import type { PopperContentProps } from "@radix-ui/react-popover"

import type { ButtonProps } from "../button/button"
//#endregion

export interface CommonSelectPopoverProps extends Partial<Pick<ButtonProps, "aria-invalid" | "size">> {
	contentProps?: PopperContentProps

	placeholder?: React.ReactNode | string

	triggerProps?: ButtonProps & { readOnly?: boolean }
}
