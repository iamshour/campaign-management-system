//#region Import
import { useTranslation } from "react-i18next"

import Button from "../button"
import Select from "../select"

import LucideChevronLeft from "~icons/lucide/chevron-left"
import LucideChevronRight from "~icons/lucide/chevron-right"
import LucideChevronsLeft from "~icons/lucide/chevrons-left"
import LucideChevronsRight from "~icons/lucide/chevrons-right"
//#endregion

type Pagination = Record<"offset" | "limit", number>

export interface TablePaginationProps {
	pagination: Pagination
	updatePagination: (updatedPagination: Pagination) => void
	count: number
	pageLimits?: number[]
	children?: React.ReactNode
}

function TablePagination({
	pagination: { offset = 0, limit = 25 },
	count,
	updatePagination,
	pageLimits = [25, 50, 75, 100],
	children,
}: TablePaginationProps) {
	const currentPage = offset / limit + 1
	const pageCount = Math.ceil(count / limit)
	const highestPossibleOffset = limit * (pageCount - 1)

	const { t } = useTranslation("ui")

	return (
		<div className='flex flex-wrap items-center justify-between gap-4 border-t py-4'>
			{children}

			<div className='flex flex-1 items-center justify-end gap-4 sm:gap-6'>
				<div className='flex items-center gap-2'>
					<p className='whitespace-nowrap text-sm font-medium'>{t("table.pagination.limit-selectbar")}</p>
					<Select
						value={String(limit)}
						onValueChange={(limit) => updatePagination({ offset: 0, limit: Number(limit) })}>
						<Select.Trigger className='h-max w-[80px]'>
							<Select.Value />
						</Select.Trigger>
						<Select.Content sideOffset={8}>
							{pageLimits.map((pageSize, idx) => (
								<Select.Item key={pageSize + idx} value={String(pageSize)}>
									<Select.Text>{pageSize}</Select.Text>
								</Select.Item>
							))}
						</Select.Content>
					</Select>
				</div>
				<div className='flex w-[100px] items-center justify-center text-sm font-medium'>
					{t("table.pagination.message", { currentPage, totalPages: Math.ceil(count / limit) })}
				</div>
				<div className='flex items-center gap-2'>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						title={t("table.pagination.buttons.first-page")}
						onClick={() => updatePagination({ offset: 0, limit })}
						disabled={currentPage === 1}>
						<span className='sr-only'>{t("table.pagination.buttons.first-page")}</span>
						<LucideChevronsLeft className='h-4 w-4 rtl:rotate-180' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						title={t("table.pagination.buttons.previous-page")}
						onClick={() => updatePagination({ offset: Math.max(offset - limit, 0), limit })}
						disabled={currentPage === 1}>
						<span className='sr-only'>{t("table.pagination.buttons.previous-page")}</span>
						<LucideChevronLeft className='h-4 w-4 rtl:rotate-180' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						title={t("table.pagination.buttons.next-page")}
						onClick={() => updatePagination({ offset: Math.min(offset + limit, highestPossibleOffset), limit })}
						disabled={pageCount === currentPage}>
						<span className='sr-only'>{t("table.pagination.buttons.next-page")}</span>
						<LucideChevronRight className='h-4 w-4 rtl:rotate-180' />
					</Button>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						title={t("table.pagination.buttons.last-page")}
						onClick={() => updatePagination({ offset: highestPossibleOffset, limit })}
						disabled={pageCount === currentPage}>
						<span className='sr-only'>{t("table.pagination.buttons.last-page")}</span>
						<LucideChevronsRight className='h-4 w-4 rtl:rotate-180' />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default TablePagination
