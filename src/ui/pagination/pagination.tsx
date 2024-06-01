//#region Import
import { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import LucideChevronLeft from "~icons/lucide/chevron-left"
import LucideChevronRight from "~icons/lucide/chevron-right"
import LucideChevronsLeft from "~icons/lucide/chevrons-left"
import LucideChevronsRight from "~icons/lucide/chevrons-right"
import { memo } from "react"
import { useTranslation } from "react-i18next"

import Button from "../button/button"
import Select from "../select/select"
//#endregion

type Pagination = Partial<Pick<PaginationAndSorting<any>, "limit" | "offset">>

export interface PaginationProps {
	children?: React.ReactNode
	count: number
	pageLimits?: number[]
	pagination: Pagination
	updatePagination: (updatedPagination: Pagination) => void
}

const Pagination = memo(
	({
		children,
		count,
		pageLimits = [25, 50, 75, 100],
		pagination: { limit = 25, offset = 0 },
		updatePagination,
	}: PaginationProps) => {
		const currentPage = offset / limit + 1

		const pageCount = Math.ceil(count / limit)

		const highestPossibleOffset = limit * (pageCount - 1)

		const { t } = useTranslation("ui")

		return (
			<div className='flex flex-wrap justify-between gap-4 border-t'>
				{children}

				<div className='flex flex-1 items-center justify-end gap-4 py-4 sm:gap-6'>
					<div className='flex items-center gap-2'>
						<p className='whitespace-nowrap text-sm font-medium'>{t("table.pagination.limit-selectbar")}</p>
						<Select
							onValueChange={(limit) => updatePagination({ limit: Number(limit), offset: 0 })}
							value={String(limit)}>
							<Select.Trigger className='h-[32px] w-[74px] px-2' hasValue={!!String(limit)?.length}>
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
						{t("table.pagination.pageCounter", {
							// show "Page 0 of 0" when no data is found
							currentPage: pageCount === 0 ? 0 : currentPage,
							totalPages: pageCount,
						})}
					</div>
					<div className='flex items-center gap-2'>
						<Button
							className='hidden h-8 w-8 p-0 lg:flex'
							disabled={currentPage === 1}
							onClick={() => updatePagination({ limit, offset: 0 })}
							title={t("table.pagination.buttons.first-page")}
							variant='outline'>
							<span className='sr-only'>{t("table.pagination.buttons.first-page")}</span>
							<LucideChevronsLeft className='h-4 w-4 rtl:rotate-180' />
						</Button>
						<Button
							className='h-8 w-8 p-0'
							disabled={currentPage === 1}
							onClick={() => updatePagination({ limit, offset: Math.max(offset - limit, 0) })}
							title={t("table.pagination.buttons.previous-page")}
							variant='outline'>
							<span className='sr-only'>{t("table.pagination.buttons.previous-page")}</span>
							<LucideChevronLeft className='h-4 w-4 rtl:rotate-180' />
						</Button>
						<Button
							className='h-8 w-8 p-0'
							disabled={pageCount === currentPage || pageCount === 0}
							onClick={() => updatePagination({ limit, offset: Math.min(offset + limit, highestPossibleOffset) })}
							title={t("table.pagination.buttons.next-page")}
							variant='outline'>
							<span className='sr-only'>{t("table.pagination.buttons.next-page")}</span>
							<LucideChevronRight className='h-4 w-4 rtl:rotate-180' />
						</Button>
						<Button
							className='hidden h-8 w-8 p-0 lg:flex'
							disabled={pageCount === currentPage || pageCount === 0}
							onClick={() => updatePagination({ limit, offset: highestPossibleOffset })}
							title={t("table.pagination.buttons.last-page")}
							variant='outline'>
							<span className='sr-only'>{t("table.pagination.buttons.last-page")}</span>
							<LucideChevronsRight className='h-4 w-4 rtl:rotate-180' />
						</Button>
					</div>
				</div>
			</div>
		)
	}
)

Pagination.displayName = "Pagination"

export default Pagination
