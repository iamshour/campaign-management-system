//#region Import
import { useTranslation } from "react-i18next"

import Dropdown from "../dropdown/dropdown"

import type { SortDirection } from "./types"

import RadixIconsArrowDown from "~icons/radix-icons/arrow-down"
import RadixIconsArrowUp from "~icons/radix-icons/arrow-up"
import RadixIconsCaretSort from "~icons/radix-icons/caret-sort"
import RadixIconsReset from "~icons/radix-icons/reset"
//#endregion

export interface TableColumnHeaderProps<TData> {
	children: React.ReactNode
	order?: SortDirection
	prevSort?: keyof TData
	newSort?: keyof TData
	onSort: (sortAndOrder: { sort?: keyof TData; order?: SortDirection }) => void
}

function DataTableColumnHeader<TData>({ children, order, prevSort, newSort, onSort }: TableColumnHeaderProps<TData>) {
	const { t } = useTranslation("ui")

	return (
		<Dropdown>
			<Dropdown.Trigger
				className='data-[state=open]:bg-accent h-8 w-max px-2 [float:inline-start] [&>svg]:shrink-0 [&>svg]:text-sm'
				variant='ghost'
				size='sm'
				showArrow={false}>
				<span className='whitespace-nowrap uppercase'>{children}</span>
				{prevSort !== newSort || !order ? (
					<RadixIconsCaretSort />
				) : order === "desc" ? (
					<RadixIconsArrowDown />
				) : order === "asc" ? (
					<RadixIconsArrowUp />
				) : null}
			</Dropdown.Trigger>

			<Dropdown.Content align='start' alignOffset={2}>
				<Dropdown.Item
					active={prevSort === newSort && order === "asc"}
					onClick={() => onSort({ sort: newSort, order: "asc" })}>
					<RadixIconsArrowUp className='text-muted-foreground/70 me-2 h-3.5 w-3.5' />
					{t("table.actions.sort.ascending")}
				</Dropdown.Item>
				<Dropdown.Item
					active={prevSort === newSort && order === "desc"}
					onClick={() => onSort({ sort: newSort, order: "desc" })}>
					<RadixIconsArrowDown className='text-muted-foreground/70 me-2 h-3.5 w-3.5' />
					{t("table.actions.sort.descending")}
				</Dropdown.Item>
				<Dropdown.Separator />
				<Dropdown.Item onClick={() => onSort({ sort: undefined, order: undefined })}>
					<RadixIconsReset className='text-muted-foreground/70 me-2 h-3.5 w-3.5' />
					{t("table.actions.sort.reset")}
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default DataTableColumnHeader
