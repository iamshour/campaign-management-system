//#region Import
import { lazy } from "react"
import Dropzone from "react-dropzone"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import Spinner from "../spinner/spinner"

import PajamasImport from "~icons/pajamas/import"

const DropFileCard = lazy(() => import("./drop-file-card"))
//#endregion

interface DropFileAreaProps extends React.ComponentPropsWithoutRef<typeof Dropzone> {
	/**
	 * Name of input componenet. Useful when integrated with react-hook-form
	 */
	name: string

	/**
	 * List of accepted files
	 */
	acceptedFiles: File[]

	/**
	 * @description Callback function used to remove file from list of accepted files
	 * @param i Index of file to be removed
	 * @returns void
	 */
	onRemove: (i: number) => void

	/**
	 * classNames object, used to pass classNames for each element in DropFileArea
	 */
	classNames?: Partial<Record<"wrapper" | "droparea" | "dropareaButton", string>>

	/**
	 * Boolean used if an asychronous action is pending
	 */
	loading?: boolean

	preview?: React.ComponentPropsWithoutRef<typeof DropFileCard>["preview"]
}

const DropFileArea = ({
	name,
	acceptedFiles,
	onRemove,
	loading = false,
	preview,
	classNames,
	...props
}: DropFileAreaProps) => {
	const { t } = useTranslation("ui", { keyPrefix: "drop-file-area" })

	return (
		<Dropzone {...props}>
			{({ getRootProps, getInputProps, isDragActive }) => (
				<section
					className={twMerge(
						"group h-full w-full max-w-full overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-white text-[#888888] transition-basic",
						!props?.disabled && !loading && "hover:border-primary-600 hover:text-primary-600",
						classNames?.wrapper
					)}>
					{loading ? (
						<div className='h-full w-full px-4 text-inherit flex-center'>
							<Spinner size='xl' className='text-gray-300' />
						</div>
					) : acceptedFiles?.length ? (
						<div className='mt-1 flex h-[calc(100%-8px)] w-[calc(100%-4px)] flex-wrap gap-4 overflow-y-auto p-4'>
							{acceptedFiles.map((file, i) => (
								<DropFileCard key={`${file.name}-${i}`} file={file} onRemove={() => onRemove(i)} preview={preview} />
							))}
						</div>
					) : (
						<div
							className={twMerge(
								"flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 px-4 py-6 text-inherit",
								isDragActive && "bg-primary-600",
								(!!props?.disabled || loading) && "pointer-events-none",
								classNames?.droparea
							)}
							{...getRootProps()}>
							<input id={name} name={name} {...getInputProps()} />
							<div
								className={twMerge(
									"flex items-center gap-2 text-inherit prevent-selection",
									props?.disabled && "opacity-40"
								)}>
								<PajamasImport className='inline text-base' />
								<p className='inline'>{t("message")}</p>
							</div>
							<div
								className={twMerge(
									"h-max whitespace-nowrap rounded-md bg-primary-700 bg-opacity-90 px-4 py-2 text-center text-sm text-white transition-basic group-hover:bg-opacity-100",
									classNames?.dropareaButton
								)}>
								Choose File
							</div>
						</div>
					)}
				</section>
			)}
		</Dropzone>
	)
}

export default DropFileArea