//#region Import
import { Button, Label, Popover } from "@/ui"
import MaterialSymbolsAddCircleOutlineRounded from "~icons/material-symbols/add-circle-outline-rounded"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import IconTooltip from "../icon-tooltip/icon-tooltip"
const TextareaPopoverContent = lazy(() => import("./textarea-popover-content"))
//#endregion

interface TextareaPopoverProps
	extends Omit<React.ComponentPropsWithoutRef<typeof TextareaPopoverContent>, "closePopover"> {
	classNames?: Partial<Record<"content" | "trigger" | "wrapper", string>>

	label?: string

	size?: React.ComponentPropsWithoutRef<typeof Button>["size"]

	tooltip?: string
}

/**
 * Component used to render a textarea field inside popover
 *
 * @example
 *
 *  <TextareaPopover
 *		label='Sample Content *'
 *		onValueChange={(v) => setValue(v)}
 *		size='lg'
 *		tooltip='Tooltip Content Here...'
 *		value={value}
 *	/>
 *
 */
const TextareaPopover = ({
	classNames,
	label,
	onValueChange,
	placeholder,
	size,
	tooltip,
	value,
}: TextareaPopoverProps) => {
	const { t } = useTranslation("ui", { keyPrefix: "textareaTooltip" })

	const [open, setOpen] = useState(false)

	const placeholderValue = placeholder ?? t("placeholder")

	return (
		<div className={twMerge("relative w-[340px] max-w-full", classNames?.wrapper)}>
			{!!label?.length && (
				<Label className='flex items-center gap-2' size={size}>
					{label}

					{!!tooltip?.length && <IconTooltip content={tooltip} />}
				</Label>
			)}

			<Popover onOpenChange={setOpen} open={open}>
				<Popover.Trigger asChild>
					<Button
						className={twMerge("w-full justify-between font-normal", classNames?.trigger)}
						hasValue={!!value?.length}
						size={size}
						variant='outline-grey'>
						<span className='truncate'>{value?.length ? value : placeholderValue}</span>

						<MaterialSymbolsAddCircleOutlineRounded className='transition-basic group-hover:!text-primary-700 group-data-[hasvalue=true]:text-gray-400' />
					</Button>
				</Popover.Trigger>

				<Popover.Content align='end' className={twMerge("border border-gray-300 p-3", classNames?.content)}>
					<TextareaPopoverContent
						closePopover={() => setOpen(false)}
						onValueChange={onValueChange}
						placeholder={placeholderValue}
						value={value}
					/>
				</Popover.Content>
			</Popover>
		</div>
	)
}

export default TextareaPopover
