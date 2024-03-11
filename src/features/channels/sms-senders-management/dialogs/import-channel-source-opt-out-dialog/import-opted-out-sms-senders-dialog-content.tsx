//#region Import
import IconTooltip from "@/core/components/icon-tooltip/icon-tooltip"
import fileMimeTypes from "@/core/constants/file-mime-types"
import { useImportOptOutFileMutation } from "@/features/channels/sms-senders-management/api"
import { Button, DropFileArea, Form, useForm } from "@/ui"
import { getFileExtension } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import * as z from "zod"
//#endregion

export interface ImportChannelSourceOptOutDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const ImportOptoutSchema = z.object({
	file: z.instanceof(File, { message: "File required" }),
})

type ImportOptoutSchemaType = z.infer<typeof ImportOptoutSchema>

const ImportChannelSourceOptOutDialogContent = ({ closeDialog }: ImportChannelSourceOptOutDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.importChannelSourceOptOut" })

	const { channelSourceId } = useParams()

	const form = useForm<ImportOptoutSchemaType>({
		resolver: zodResolver(ImportOptoutSchema),
	})

	const [triggerImportOptedOutSmsSenders, { isLoading }] = useImportOptOutFileMutation()

	const onSubmit = async (data: ImportOptoutSchemaType) => {
		if (!data?.file) return

		const optOutFile = new FormData()

		optOutFile.append("optOutFile", data?.file, "optOutFile")

		await triggerImportOptedOutSmsSenders({ channelSourceId: channelSourceId!, optOutFile }).unwrap()

		toast.success(t("successToast"))

		closeDialog()
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-1 flex-col justify-between gap-8 overflow-y-auto p-2'
				onSubmit={form.handleSubmit(onSubmit)}>
				<Form.Field
					control={form.control}
					name='file'
					render={({ field: { onChange, value } }) => (
						<Form.Item className='flex h-full w-full flex-col'>
							<Form.Label className='inline-flex items-center gap-1 [&_svg]:text-primary-600' size='lg'>
								<span>{t("label")} *</span>
								<IconTooltip className='text-bold max-w-[150px]' content={t("tooltip")} />
							</Form.Label>
							<Form.Control>
								<DropFileArea
									accept={fileMimeTypes}
									acceptedFiles={value ? [value] : []}
									classNames={{
										droparea: "sm:flex-row",
										fileCard: !!value && "max-w-full",
										fileCardWrapper: !!value && "p-0 mt-0 w-full",
										wrapper: value ? "w-full flex-1 border-0 !transition-none" : "w-full flex-1 !transition-none",
									}}
									disabled={!!value?.name?.length}
									maxFiles={1}
									// maxSize={MAXSIZE}
									multiple={false}
									name='file'
									onDrop={(acceptedFiles) => onChange(acceptedFiles[0])}
									onDropRejected={(fileRejections) => {
										fileRejections[0].errors.forEach(({ code }) => toast.error(t(`errors.${code}`)))
									}}
									onRemove={() => onChange(undefined)}
									preventDropOnDocument
									validator={validator}
								/>
							</Form.Control>
							<span className='inline-flex w-full items-center justify-between pt-2'>
								<Form.Message />

								<p className='ms-auto block text-xs text-gray-400'>{t("validationMessage")}</p>
							</span>
						</Form.Item>
					)}
				/>

				<Button className='ms-auto w-max shrink-0 px-10' loading={isLoading} type='submit'>
					{t("submit")}
				</Button>
			</form>
		</Form>
	)
}

export default ImportChannelSourceOptOutDialogContent

const validator = (file: File) => {
	if (!file) return null

	const fileExtension = getFileExtension(file.name)

	const allowedExtensions = ["csv", "xlsx"]

	const allowedLimits: Record<(typeof allowedExtensions)[number], number> = {
		csv: 50000000,
		xlsx: 30000000,
	}

	if (!fileExtension || !allowedExtensions?.includes(fileExtension)) return null

	const fileSize = Number(file?.size)

	const currentLimit = allowedLimits[fileExtension]

	if (fileSize > Number(currentLimit))
		return {
			code: "file-too-large",
			message: `File is larger than ${currentLimit}`,
		}

	return null
}
