//#region Import
import LucideCheck from "~icons/lucide/check"
import { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import type { OptionType } from "../../types"

import Button from "../../button/button"
import Command from "../../command/command"
import Skeleton from "../../skeleton/skeleton"
import { useSelectAsyncPopover } from "./select-async-popover"
//#endregion

// TODO: Handle Infinite Loading in Component to handle changing offset/limit Values
const SelectAsyncPopoverContent = ({
	loading,
	onSearch,
	options = [],
	searchTerm,
}: {
	children?: React.ReactNode
	loading?: boolean
	onSearch?: (v?: string) => void
	options?: OptionType[]
	searchTerm?: string
}) => {
	const { t } = useTranslation("ui")

	const { creatable, isMulti, maxLimit, selection, updateSelection } = useSelectAsyncPopover()

	/**
	 * Boolean to check if Limit of selected Entries has been reached (Only passed in case of Multi Selection)
	 */
	const maxLimitReached = useMemo(
		() => isMulti && !!maxLimit && maxLimit === selection?.length,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isMulti, maxLimit, selection]
	)

	const isSelected = useCallback(
		(entry: string) => {
			if (isMulti) return selection?.some((obj) => obj?.value === entry)

			return selection?.value === entry
		},
		[isMulti, selection]
	)

	const onSelect = (option: OptionType) => {
		if (isSelected(option?.value)) {
			if (isMulti) return updateSelection(selection?.filter((obj) => obj?.value !== option?.value))

			return updateSelection(undefined)
		}

		// Else, wasn't selected...
		if (isMulti) {
			// Can't add new entries if max limit was reached
			if (maxLimitReached) return

			const updatedSelection = new Set([...selection, option])

			return updateSelection([...updatedSelection])
		}

		return updateSelection(option)
	}

	const optionsList = useMemo(() => {
		if (!creatable) return options

		let listToRender = []

		if (!selection) {
			listToRender = options
		} else if (isMulti) {
			listToRender = [...options, ...selection]
		} else {
			listToRender = [...options, selection]
		}

		// Stringifying entries so that duplicated would be nicely removed using Set
		const stringifiedSet = new Set(listToRender.map((item) => JSON.stringify(item)))

		// Parsing entries back to objects
		const parsedArray: OptionType[] = Array.from(stringifiedSet).map((item) => JSON.parse(item))

		// remove entries not found after search operation
		if (!!searchTerm?.length && !options?.length)
			return parsedArray?.filter((op) => op?.value?.toLocaleLowerCase()?.includes(searchTerm?.toLocaleLowerCase()))

		return parsedArray
	}, [options, isMulti, selection, creatable, searchTerm])

	const canShowCreatable = Boolean(
		creatable &&
			searchTerm?.length &&
			((!isMulti && selection?.value !== searchTerm) ||
				(isMulti && selection?.every((op) => op?.value !== searchTerm))) &&
			(!optionsList || optionsList?.every((op) => op?.value !== searchTerm))
	)

	const onCreate = () => {
		if (!canShowCreatable || !onSearch) return

		onSelect({ label: searchTerm!, value: searchTerm! })
		onSearch("")
	}

	return (
		<Command className='!h-full' shouldFilter={onSearch === undefined}>
			<Command.Input
				onValueChange={onSearch}
				placeholder={t(`selectAsyncOptionsPopover.${creatable ? "placeholderCreatable" : "placeholder"}`)}
				value={searchTerm}
			/>

			<Command.List className='flex-1 [&>div]:flex [&>div]:!h-full [&>div]:flex-col'>
				{canShowCreatable && (
					<div className='bg-primary-50/50'>
						<Button className='w-full justify-start' onClick={onCreate} size='sm' variant='ghost'>
							Create: <span className='max-w-full truncate font-light'>{searchTerm}</span>
						</Button>
					</div>
				)}

				{loading ? (
					<Command.Loading className='w-full flex-1 p-2 pb-0 [&>div]:space-y-2'>
						<Skeleton className='h-8 w-full rounded-lg' />
						<Skeleton className='h-8 w-full rounded-lg' />
					</Command.Loading>
				) : !optionsList?.length ? (
					<div className='flex-1 overflow-hidden uppercase text-gray-500 flex-center'>{t("noResultsComponent")}</div>
				) : (
					<Command.Group className='h-full flex-1 overflow-y-auto'>
						{optionsList
							?.sort((a, b) => (isSelected(b.value) ? 1 : -1) - (isSelected(a.value) ? 1 : -1))
							?.map((op) => (
								<Command.Item
									disabled={!isSelected(op?.value) && maxLimitReached}
									key={op?.value}
									onSelect={() => onSelect(op)}>
									<div
										className={twMerge(
											"me-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary transition-all duration-100",
											isSelected(op?.value) ? "bg-primary text-white" : "opacity-50 [&_svg]:invisible"
										)}>
										<LucideCheck className='h-4 w-4' />
									</div>
									<span className='truncate'>{op?.label}</span>
								</Command.Item>
							))}
					</Command.Group>
				)}
			</Command.List>

			{
				// Clear All Entries. Shown only for Multi-selection, and if entries were already selected
				!!isMulti && !!selection?.length && !!optionsList?.length && (
					<Command.Group className='border-t'>
						<Command.Item
							className='cursor-pointer justify-center text-center hover:text-primary-900'
							onSelect={() => updateSelection([])}>
							{t("selectAsyncOptionsPopover.clearButton")}
						</Command.Item>
					</Command.Group>
				)
			}
		</Command>
	)
}

export default SelectAsyncPopoverContent
