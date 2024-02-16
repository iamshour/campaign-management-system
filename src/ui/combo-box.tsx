//#region Import
import { Suspense, createContext, useCallback, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import Badge from "./badge"
import Button from "./button"
import Command from "./command"
import Label from "./label"
import Popover from "./popover"
import Skeleton from "./skeleton"
import type { OptionType } from "./types"

import LucideCheck from "~icons/lucide/check"
import LucideChevronDown from "~icons/lucide/chevron-down"
//#endregion

type ComboBoxSingleProps = {
	isMulti: false
	selection?: OptionType
	updateSelection: (option?: OptionType) => void
	maxLimit?: undefined
}
type ComboBoxMultiProps = {
	isMulti: true
	selection: OptionType[]
	updateSelection: (option: OptionType[]) => void
	maxLimit?: number
}

export type ComboBoxContextType = Pick<React.ComponentPropsWithoutRef<typeof Button>, "size"> & {
	isCreatable?: boolean
} & (ComboBoxSingleProps | ComboBoxMultiProps)

const ComboBoxContextProvider = createContext<ComboBoxContextType>({} as ComboBoxContextType)
const useComboBoxContext = () => useContext(ComboBoxContextProvider)

type ComboBoxProps = Pick<React.ComponentPropsWithoutRef<typeof Button>, "className" | "children"> & {
	label?: string
} & ComboBoxContextType

const ComboBox = ({ children, className, label, ...contextValue }: ComboBoxProps) => (
	<ComboBoxContextProvider.Provider value={contextValue}>
		<div className={twMerge("relative w-full max-w-[340px]", className)}>
			{!!label?.length && <Label size={contextValue?.size}>{label}</Label>}

			<Popover>{children}</Popover>
		</div>
	</ComboBoxContextProvider.Provider>
)

const ComboBoxTrigger = ({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Button>) => {
	const { size, isMulti, selection } = useComboBoxContext()

	return (
		<Popover.Trigger asChild>
			<Button
				variant='outline-grey'
				hasValue={(isMulti && !!selection?.length) || (!isMulti && !!selection?.value?.length)}
				size={size}
				{...props}
				className={twMerge(
					"w-full justify-between overflow-hidden py-0 !font-normal",
					props?.size === "lg" ? "text-base" : "px-3 text-sm",
					className
				)}>
				<div className='h-full flex-1 truncate py-2.5 text-start'>
					<div className='flex h-full items-center gap-1'>
						{(isMulti && !selection?.length) || (!isMulti && !selection?.value?.length) ? (
							children
						) : isMulti ? (
							selection.length > 2 ? (
								<Badge size={size}>{selection.length} selected</Badge>
							) : (
								selection.map((option) => (
									<Badge size={size} key={option.value} title={option.label}>
										{option.label}
									</Badge>
								))
							)
						) : (
							<Badge size={size}>{selection?.label}</Badge>
						)}
					</div>
				</div>

				<LucideChevronDown className='h-4 w-4' />
			</Button>
		</Popover.Trigger>
	)
}

const ComboBoxContent = ({ children, className, ...props }: React.ComponentPropsWithoutRef<typeof Popover.Content>) => (
	<Popover.Content
		className={twMerge("h-[250px] w-[300px] border border-gray-300 p-0 flex-center", className)}
		align='start'
		{...props}>
		<Suspense fallback={<Skeleton className='h-[90%] w-[90%] rounded-lg' />}>{children}</Suspense>
	</Popover.Content>
)

// TODO: Handle Infinite Loading in Component to handle changing offset/limit Values
export function ComboBoxPopper({
	options = [],
	searchTerm,
	onSearch,
	loading,
}: {
	options?: OptionType[]
	searchTerm?: string
	onSearch?: (v?: string) => void
	loading?: boolean
	children?: React.ReactNode
}) {
	const { t } = useTranslation("ui")

	const { selection, updateSelection, isMulti, maxLimit, isCreatable } = useComboBoxContext()

	/**
	 * Boolean to check if Limit of selected Entries has been reached (Only passed in case of Multi Selection Combobox)
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
		if (!isCreatable) return options

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
	}, [options, isMulti, selection, isCreatable, searchTerm])

	const canShowCreatable = Boolean(
		isCreatable &&
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
		<Command shouldFilter={onSearch === undefined} className='!h-full'>
			<Command.Input placeholder={t("comboBox.placeholder")} value={searchTerm} onValueChange={onSearch} />

			<Command.List className='flex-1 [&>div]:flex [&>div]:!h-full [&>div]:flex-col'>
				{canShowCreatable && (
					<div className='bg-primary-50/50'>
						<Button variant='ghost' size='sm' className='w-full justify-start' onClick={onCreate}>
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
					<div className='flex-1 overflow-hidden uppercase text-gray-500 flex-center'>
						{t("comboBox.message.noResults")}
					</div>
				) : (
					<Command.Group className='h-full flex-1 overflow-y-auto'>
						{optionsList
							?.sort((a, b) => (isSelected(b.value) ? 1 : -1) - (isSelected(a.value) ? 1 : -1))
							?.map((op) => (
								<Command.Item
									key={op?.value}
									onSelect={() => onSelect(op)}
									disabled={!isSelected(op?.value) && maxLimitReached}>
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
					<>
						<Command.Group className='border-t'>
							<Command.Item
								onSelect={() => updateSelection([])}
								className='cursor-pointer justify-center text-center hover:text-primary-900'>
								{t("comboBox.clearButton")}
							</Command.Item>
						</Command.Group>
					</>
				)
			}
		</Command>
	)
}

ComboBox.Trigger = ComboBoxTrigger
ComboBox.Content = ComboBoxContent

export default ComboBox
