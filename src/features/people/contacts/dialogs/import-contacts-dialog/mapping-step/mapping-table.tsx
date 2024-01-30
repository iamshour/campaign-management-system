//#region Import
import { twMerge, CompactTable, Select } from "@blueai/ui"
import { useTranslation } from "react-i18next"
import { v4 as newId } from "uuid"

import fileMappingHeadersOptions from "@/features/people/contacts/constants/file-mapping-headers-options"
import type { ContactScreamSnakeCaseKey } from "@/features/people/contacts/types"

import { useImportContactsDialogContext } from "../import-contacts-dialog-context"
//#endregion

const MappingTable = () => {
	const { t } = useTranslation("contacts")

	const {
		data: { fileHasHeader, columnNameToIndexMapping, previewRows },
		updateData,
	} = useImportContactsDialogContext()

	/**
	 * Function used to Select a header for the specified column based on the passed index: @param uniqueIndex
	 * Saved option will be added to `columnNameToIndexMapping` object in the following format:
	 * @example const columnNameToIndexMapping = { [key]: uniqueIndex }
	 *
	 * @param key Passed selection option from the SelectBar list
	 * @param uniqueIndex Index of the column to be added
	 */
	const onHeaderSelect = (key: ContactScreamSnakeCaseKey, uniqueIndex: number) => {
		const newEntry = { [key]: uniqueIndex }

		updateData((prev) => {
			const prevColumnNameToIndexMapping = prev?.columnNameToIndexMapping

			if (!prevColumnNameToIndexMapping) return { ...prev, columnNameToIndexMapping: newEntry }

			if (!Object.values(prevColumnNameToIndexMapping).includes(uniqueIndex))
				return {
					...prev,
					columnNameToIndexMapping: { ...prevColumnNameToIndexMapping, ...newEntry },
				}

			const found = Object.entries(prevColumnNameToIndexMapping).find(([, v]) => v === uniqueIndex)
			delete prevColumnNameToIndexMapping[found![0] as ContactScreamSnakeCaseKey]

			return {
				...prev,
				columnNameToIndexMapping: { ...prevColumnNameToIndexMapping, [key]: found?.[1] },
			}
		})
	}

	if (!previewRows?.length) return

	return (
		<CompactTable>
			<CompactTable.Header>
				<CompactTable.Row className='hover:bg-white'>
					{previewRows[0]?.split(",").map((_, idx) => {
						const selectedValue = columnNameToIndexMapping
							? (Object.entries(columnNameToIndexMapping).find(([, v]) => v === idx)?.[0] as ContactScreamSnakeCaseKey)
							: undefined

						return (
							<CompactTable.Head key={newId()} className='px-3 even:bg-gray-50/75'>
								<Select value={selectedValue} onValueChange={(contactKey) => onHeaderSelect(contactKey, idx)}>
									<Select.Trigger hasValue={!!selectedValue} className='h-[30px] w-full truncate px-2'>
										<Select.Value />
									</Select.Trigger>
									<Select.Content>
										{fileMappingHeadersOptions?.map(({ label, value }) => (
											<Select.Item
												key={value}
												value={value}
												showCheck={false}
												className={twMerge(
													!!columnNameToIndexMapping &&
														Object.keys(columnNameToIndexMapping)?.includes(value as ContactScreamSnakeCaseKey)
														? "data-[state=checked]:!bg-primary-50"
														: "pointer-events-all data-[state=checked]:!bg-transparent hover:!bg-slate-100"
												)}>
												<Select.Text>{t(label)}</Select.Text>
											</Select.Item>
										))}
									</Select.Content>
								</Select>
							</CompactTable.Head>
						)
					})}
				</CompactTable.Row>
			</CompactTable.Header>
			<CompactTable.Body>
				{previewRows.map((row, rowIndex) => (
					<CompactTable.Row key={rowIndex} className='hover:bg-transparent'>
						{row?.split(",").map((cell, cellIdx) => (
							<CompactTable.Cell
								title={cell}
								className={twMerge(
									"max-w-[200px] truncate px-2.5 py-2 text-xs",
									rowIndex === 0 && fileHasHeader ? "bg-primary-50/50 font-bold" : "even:bg-gray-50/75"
								)}
								key={cellIdx}>
								{cell}
							</CompactTable.Cell>
						))}
					</CompactTable.Row>
				))}
			</CompactTable.Body>
		</CompactTable>
	)
}

export default MappingTable
