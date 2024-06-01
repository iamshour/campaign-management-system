//#region Import
import { Button, Label, Popover } from "@/ui"
import MaterialSymbolsAddCircleOutlineRounded from "~icons/material-symbols/add-circle-outline-rounded"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

const TextareaPopoverContent = lazy(() => import("./textarea-popover-content"))
//#endregion

interface TextareaPopoverProps
	extends React.HTMLAttributes<HTMLDivElement>,
		Omit<React.ComponentPropsWithoutRef<typeof TextareaPopoverContent>, "closePopover"> {
	contentProps?: React.ComponentPropsWithoutRef<typeof Popover.Content>

	label?: React.ReactNode | string

	required?: boolean

	size?: React.ComponentPropsWithoutRef<typeof Button>["size"]

	triggerProps?: React.ComponentPropsWithoutRef<typeof Button>
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
	"aria-invalid": invalid,
	className,
	contentProps,
	label,
	onValueChange,
	placeholder,
	required,
	size,
	triggerProps,
	value,
	...props
}: TextareaPopoverProps) => {
	const { t } = useTranslation("ui", { keyPrefix: "textareaTooltip" })

	const [open, setOpen] = useState(false)

	const placeholderValue = placeholder ?? t("placeholder")

	return (
		<div className={twMerge("relative w-[340px] max-w-full", className)} {...props}>
			{!!label && (
				<Label aria-invalid={invalid} required={required} size={size}>
					{label}
				</Label>
			)}

			<Popover onOpenChange={setOpen} open={open}>
				<Popover.Trigger asChild>
					<Button
						aria-invalid={invalid}
						hasValue={!!value?.length}
						size={size}
						variant='outline-grey'
						{...triggerProps}
						className={twMerge("w-full justify-between font-normal", triggerProps?.className)}>
						<span className='truncate'>{value?.length ? value : placeholderValue}</span>

						<MaterialSymbolsAddCircleOutlineRounded className='transition-basic group-hover:!text-primary-700 group-data-[hasvalue=true]:text-gray-400' />
					</Button>
				</Popover.Trigger>

				<Popover.Content
					align='end'
					{...contentProps}
					className={twMerge("border border-gray-300 p-3", contentProps?.className)}>
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
