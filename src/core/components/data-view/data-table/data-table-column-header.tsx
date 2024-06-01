//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"

import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { Dropdown } from "@/ui"
import RadixIconsArrowDown from "~icons/radix-icons/arrow-down"
import RadixIconsArrowUp from "~icons/radix-icons/arrow-up"
import RadixIconsCaretSort from "~icons/radix-icons/caret-sort"
import RadixIconsReset from "~icons/radix-icons/reset"
import { useTranslation } from "react-i18next"

import type { RowData } from "./types"

import { useDataViewContext } from "../data-view-context"
import { selectPaginationAndSorting, updatePaginationAndSorting } from "../data-view-slice"
//#endregion

export interface DataTableColumnHeaderProps<TData extends RowData> {
	children: React.ReactNode
	newSort?: keyof TData
}

const DataTableColumnHeader = <TData extends RowData>({ children, newSort }: DataTableColumnHeaderProps<TData>) => {
	const dispatch = useDispatch()

	const { t } = useTranslation("ui")

	const { dataViewKey } = useDataViewContext<TData>()

	const paginationAndSorting = useSelector<PaginationAndSorting<any | TData>>((state) =>
		selectPaginationAndSorting(state, dataViewKey)
	)

	const updateSortAndOrder = (sortAndOrder?: Partial<Pick<PaginationAndSorting<TData>, "order" | "sort">>) =>
		dispatch(updatePaginationAndSorting({ [dataViewKey]: sortAndOrder }))

	return (
		<Dropdown>
			<Dropdown.Trigger
				className='data-[state=open]:bg-accent h-8 w-max px-2 [float:inline-start] [&>svg]:shrink-0 [&>svg]:text-sm'
				showArrow={false}
				size='sm'
				variant='ghost'>
				<span className='whitespace-nowrap uppercase'>{children}</span>
				{paginationAndSorting?.sort !== newSort || !paginationAndSorting?.order ? (
					<RadixIconsCaretSort />
				) : paginationAndSorting?.order === "desc" ? (
					<RadixIconsArrowDown />
				) : paginationAndSorting?.order === "asc" ? (
					<RadixIconsArrowUp />
				) : null}
			</Dropdown.Trigger>

			<Dropdown.Content align='start' alignOffset={2}>
				<Dropdown.Item
					active={paginationAndSorting?.sort === newSort && paginationAndSorting?.order === "asc"}
					onClick={() => updateSortAndOrder({ order: "asc", sort: newSort as any })}>
					<RadixIconsArrowUp className='text-muted-foreground/70 me-2 h-3.5 w-3.5' />
					{t("table.actions.sort.ascending")}
				</Dropdown.Item>
				<Dropdown.Item
					active={paginationAndSorting?.sort === newSort && paginationAndSorting?.order === "desc"}
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
