//#region Import
import Dropzone from "react-dropzone"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import Spinner from "../spinner"

import DropFileCard from "./drop-file-card"

import PajamasImport from "~icons/pajamas/import"
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
	 * className attribute used to style component
	 */
	className?: string

	/**
	 * Boolean used if an asychronous action is pending
	 */
	loading?: boolean
}

const DropFileArea = ({ name, acceptedFiles, onRemove, className, loading = false, ...props }: DropFileAreaProps) => {
	const { t } = useTranslation("ui", { keyPrefix: "drop-file-area" })

	return (
		<Dropzone {...props}>
			{({ getRootProps, getInputProps, isDragActive }) => (
				<section
					className={twMerge(
						"h-full w-full max-w-full overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-white text-gray-400 transition-basic",
						!props?.disabled && !loading && "hover:border-primary-600 hover:text-primary-600",
						className
					)}>
					{loading ? (
						<div className='h-full w-full px-4 text-inherit flex-center'>
							<Spinner size='xl' className='text-gray-300' />
						</div>
					) : acceptedFiles?.length ? (
						<div className='mt-1 flex h-[calc(100%-8px)] w-[calc(100%-4px)] flex-wrap gap-4 overflow-y-auto p-4'>
							{acceptedFiles.map((file, i) => (
								<DropFileCard key={`${file.name}-${i}`} file={file} onRemove={() => onRemove(i)} />
							))}
						</div>
					) : (
						<div
							className={twMerge(
								"h-full w-full cursor-pointer px-4 py-6 text-inherit flex-center",
								isDragActive && "bg-primary-600",
								(!!props?.disabled || loading) && "pointer-events-none"
							)}
							{...getRootProps()}>
							<input id={name} name={name} {...getInputProps()} />
							<div
								className={twMerge(
									"flex items-center gap-4 text-inherit prevent-selection",
									props?.disabled && "opacity-40"
								)}>
								<PajamasImport className='inline text-2xl' />
								<p className='inline'>{t("message")}</p>
							</div>
						</div>
					)}
				</section>
			)}
		</Dropzone>
	)
}

export default DropFileArea

// const fileIconMap = {
// 	""
// }

// import { Controller, useFormContext } from "react-hook-form";
// import { useDropzone } from "react-dropzone";
// import { ChangeEventHandler, FC } from "react";

// export const DropzoneField: FC<{ name: string; multiple?: boolean }> = ({
//     name,
//     multiple,
//     ...rest
// }) => {
//     const { control } = useFormContext();

//     return (
//         <Controller
//             render={({ field: { onChange } }) => (
//                 <Dropzone
//                     multiple={multiple}
//                     onChange={(e) =>
//                         onChange(
//                             multiple
//                                 ? e.target.files
//                                 : e.target.files?.[0] ?? null
//                         )
//                     }
//                     {...rest}
//                 />
//             )}
//             name={name}
//             control={control}
//             defaultValue=""
//         />
//     );
// };

// const Dropzone: FC<{
//     multiple?: boolean;
//     onChange?: ChangeEventHandler<HTMLInputElement>;
// }> = ({ multiple, onChange, ...rest }) => {
//     const { getRootProps, getInputProps } = useDropzone({
//         multiple,
//         ...rest,
//     });

//     return (
//         <div {...getRootProps()}>
//             <input {...getInputProps({ onChange })} />
//         </div>
//     );
// };
