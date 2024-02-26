//#region Import
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import { updatePaginationAndSorting } from "@/core/slices/data-grid-slice/data-grid-slice"
import { Dropdown } from "@/ui"
import RadixIconsArrowDown from "~icons/radix-icons/arrow-down"
import RadixIconsArrowUp from "~icons/radix-icons/arrow-up"
import RadixIconsCaretSort from "~icons/radix-icons/caret-sort"
import RadixIconsReset from "~icons/radix-icons/reset"
import { useTranslation } from "react-i18next"

import { useDataGridContext } from "../data-grid"
import { RowData } from "../types"
//#endregion

export interface TableColumnHeaderProps<TData extends RowData> {
	children: React.ReactNode
	newSort?: keyof TData
}

function DataTableColumnHeader<TData extends RowData>({ children, newSort }: TableColumnHeaderProps<TData>) {
	const dispatch = useDispatch()

	const { t } = useTranslation("ui")

	const { dataGridKey } = useDataGridContext<TData>()

	const { order, sort: prevSort } = useSelector(({ dataGrid }) => dataGrid[dataGridKey].paginationAndSorting)

	const updateSortAndOrder = (
		sortAndOrder?: Partial<Pick<PaginationAndSorting<typeof dataGridKey>, "order" | "sort">>
	) => dispatch(updatePaginationAndSorting({ [dataGridKey]: sortAndOrder }))

	return (
		<Dropdown>
			<Dropdown.Trigger
				className='data-[state=open]:bg-accent h-8 w-max px-2 [float:inline-start] [&>svg]:shrink-0 [&>svg]:text-sm'
				showArrow={false}
				size='sm'
				variant='ghost'>
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
					onClick={() => updateSortAndOrder({ order: "asc", sort: newSort as any })}>
					<RadixIconsArrowUp className='text-muted-foreground/70 me-2 h-3.5 w-3.5' />
					{t("table.actions.sort.ascending")}
				</Dropdown.Item>
				<Dropdown.Item
					active={prevSort === newSort && order === "desc"}
					onClick={() => updateSortAndOrder({ order: "desc", sort: newSort as any })}>
					<RadixIconsArrowDown className='text-muted-foreground/70 me-2 h-3.5 w-3.5' />
					{t("table.actions.sort.descending")}
				</Dropdown.Item>
				<Dropdown.Separator />
				<Dropdown.Item onClick={() => updateSortAndOrder({ order: undefined, sort: undefined })}>
					<RadixIconsReset className='text-muted-foreground/70 me-2 h-3.5 w-3.5' />
					{t("table.actions.sort.reset")}
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default DataTableColumnHeader
