//#region Import
import { formatBytes } from "@/utils"
import RadixIconsCross2 from "~icons/radix-icons/cross-2"
import { lazy, useMemo } from "react"
import { useTranslation } from "react-i18next"

import Button from "../button/button"
import Tooltip from "../tooltip/tooltip"
import { ImagePreview } from "./drop-file-card-image-preview"
//#endregion
// import TeenyiconsCsvSolid from '~icons/teenyicons/csv-solid'

const fallbackIcon = lazy(() => import("~icons/material-symbols/unknown-document-sharp"))

export interface DropFileCardProps {
	/**
	 * An accepted Uploaded File by the user
	 */
	file: File

	/**
	 * @description Callback function used to remove file
	 * @returns void
	 */
	onRemove: () => void

	/**
	 * String literal to handle preview component for the card
	 */
	preview?: "icon" | "image"
}

const DropFileCard = ({ file, onRemove, preview = "icon" }: DropFileCardProps) => {
	const { t } = useTranslation("ui", { keyPrefix: "drop-file-area" })

	const { name, size, type } = file

	const PreviewComponent = useMemo(
		() => (preview === "icon" ? fileIconsMapper[type as keyof typeof fileIconsMapper] || fallbackIcon : ImagePreview),
		[preview, type]
	)

	return (
		<div className='flex h-max w-full max-w-[400px] gap-4 rounded-xl border-2 border-primary-600 bg-primary-50/30 p-4 transition-basic'>
			<PreviewComponent className='shrink-0 text-3xl text-primary-600' file={preview === "image" ? file : undefined} />

			<div className='flex-1 truncate'>
				<p className='mb-1 truncate text-black'>{name}</p>
				<p className='truncate text-sm text-black/30'>{formatBytes(size, 2)}</p>
			</div>

			<Tooltip content={t("buttons.remove")} side='right' sideOffset={4}>
				<Button className='h-max w-max !bg-transparent p-0' onClick={onRemove} variant='ghost'>
					<RadixIconsCross2 />
				</Button>
			</Tooltip>
		</div>
	)
}

export default DropFileCard

const fileIconsMapper = {
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": lazy(
		() => import("~icons/tabler/file-spreadsheet")
	),
	"image/jpeg": lazy(() => import("~icons/ion/image-sharp")),
	"image/png": lazy(() => import("~icons/ant-design/file-text-outlined")),
	"text/csv": lazy(() => import("~icons/teenyicons/csv-solid")),
	"text/plain": lazy(() => import("~icons/ant-design/file-pdf-filled")),
}
