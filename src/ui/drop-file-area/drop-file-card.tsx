//#region Import
import { lazy, useMemo } from "react"
import { useTranslation } from "react-i18next"

import { formatBytes } from "@/utils"

import Button from "../button"
import Tooltip from "../tooltip"

import RadixIconsCross2 from "~icons/radix-icons/cross-2"
//#endregion
// import TeenyiconsCsvSolid from '~icons/teenyicons/csv-solid'

const fileIconsMapper = {
	"text/plain": lazy(() => import("~icons/ant-design/file-pdf-filled")),
	"image/png": lazy(() => import("~icons/ant-design/file-text-outlined")),
	"image/jpeg": lazy(() => import("~icons/ion/image-sharp")),
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": lazy(
		() => import("~icons/tabler/file-spreadsheet")
	),
	"text/csv": lazy(() => import("~icons/teenyicons/csv-solid")),
}

const fallbackIcon = lazy(() => import("~icons/material-symbols/unknown-document-sharp"))

interface DropFileCardProps {
	/**
	 * An accepted Uploaded File by the user
	 */
	file: File

	/**
	 * @description Callback function used to remove file
	 * @returns void
	 */
	onRemove: () => void
}

const DropFileCard = ({ file, onRemove }: DropFileCardProps) => {
	const { t } = useTranslation("ui", { keyPrefix: "drop-file-area" })
	const { name, size, type } = file

	// const fileExtension = useMemo(() => getFileExtension(name), [name])
	const Icon = useMemo(() => fileIconsMapper[type as keyof typeof fileIconsMapper] || fallbackIcon, [type])

	return (
		<div className='flex h-max w-[400px] max-w-full gap-4 rounded-xl border-2 border-primary-600 bg-primary-50/30 p-4 transition-basic'>
			<Icon className='shrink-0 text-3xl text-primary-600' />

			<div className='flex-1 truncate'>
				<p className='mb-1 truncate text-black'>{name}</p>
				<p className='truncate text-sm text-black/30'>{formatBytes(size, 2)}</p>
			</div>

			<Tooltip>
				<Tooltip.Trigger asChild>
					<Button variant='ghost' className='h-max w-max !bg-transparent p-0' onClick={onRemove}>
						<RadixIconsCross2 />
					</Button>
				</Tooltip.Trigger>

				<Tooltip.Content content={t("buttons.remove")} side='right' sideOffset={4} />
			</Tooltip>
		</div>
	)
}

export default DropFileCard