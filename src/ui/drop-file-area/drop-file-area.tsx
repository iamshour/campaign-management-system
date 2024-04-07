//#region Import
import PajamasImport from "~icons/pajamas/import"
import { lazy } from "react"
import Dropzone from "react-dropzone"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import Spinner from "../spinner/spinner"

const DropFileCard = lazy(() => import("./drop-file-card"))
//#endregion

interface DropFileAreaProps extends React.ComponentPropsWithoutRef<typeof Dropzone> {
	/**
	 * List of accepted files
	 */
	acceptedFiles: File[]

	/**
	 * classNames object, used to pass classNames for each element in DropFileArea
	 */
	classNames?: Partial<Record<"droparea" | "dropareaButton" | "fileCard" | "fileCardWrapper" | "wrapper", string>>

	/**
	 * Boolean used if an asychronous action is pending
	 */
	loading?: boolean

	/**
	 * Name of input componenet. Useful when integrated with react-hook-form
	 */
	name: string

	/**
	 * @description Callback function used to remove file from list of accepted files
	 * @param i Index of file to be removed
	 * @returns void
	 */
	onRemove: (i: number) => void

	preview?: React.ComponentPropsWithoutRef<typeof DropFileCard>["preview"]
}

const DropFileArea = ({
	acceptedFiles,
	classNames,
	loading = false,
	name,
	onRemove,
	preview,
	...props
}: DropFileAreaProps) => {
	const { t } = useTranslation("ui", { keyPrefix: "drop-file-area" })

	return (
		<Dropzone {...props}>
			{({ getInputProps, getRootProps, isDragActive }) => (
				<section
					className={twMerge(
						"group h-full w-full max-w-full overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-white text-[#888888] transition-basic",
						!props?.disabled && !loading && "hover:border-primary-600 hover:text-primary-600",
						classNames?.wrapper
					)}>
					{loading ? (
						<div className='h-full w-full px-4 text-inherit flex-center'>
							<Spinner className='text-gray-300' size='xl' />
						</div>
					) : acceptedFiles?.length ? (
						<div
							className={twMerge(
								"mt-1 flex h-full w-[calc(100%-4px)] flex-wrap gap-4 overflow-y-auto p-4",
								classNames?.fileCardWrapper
							)}>
							{acceptedFiles.map((file, i) => (
								<DropFileCard
									className={classNames?.fileCard}
									file={file}
									key={`${file.name}-${i}`}
									onRemove={() => onRemove(i)}
									preview={preview}
								/>
							))}
						</div>
					) : (
						<div
							className={twMerge(
								"flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1.5 px-4 py-6 text-center text-inherit sm:gap-4 sm:text-start",
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
								<PajamasImport className='hidden text-base sm:inline' />
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
