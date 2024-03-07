//#region Import
import type { ExportOptOutSmsSendersParams } from "@/features/channels/sms-senders-management/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { clearSelection } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { useExportOptOutSmsSendersMutation } from "@/features/channels/sms-senders-management/api"
import { Button, Form, Input, useForm } from "@/ui"
import { cleanObject, generateFileName } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import * as z from "zod"
//#endregion

const companyName = import.meta.env.VITE_APP_PREFIX

export interface ExportOptOutSmsSendersDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

const exportOptOutSchema = z.object({
	fileName: z.string().min(1, { message: "File name Required" }).max(50, { message: "Max 50 characters allowed" }),
})

type ExportOptOutSchemaType = z.infer<typeof exportOptOutSchema>

const ExportOptOutSmsSendersDialogContent = ({ onClose }: ExportOptOutSmsSendersDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.exportOptOutSmsSenders" })

	const { dataViewKey } = useDataViewContext()

	const dispatch = useDispatch()

	// Send Filters as part of Payload
	const {
		// filters, searchTerm,
		selection,
	} = useSelector(({ dataView }) => dataView[dataViewKey])

	const defaultFileName = generateFileName(companyName, "opt-out")

	const form = useForm<ExportOptOutSchemaType>({
		defaultValues: {
			fileName: defaultFileName,
		},
		mode: "onSubmit",
		resolver: zodResolver(exportOptOutSchema),
	})

	const [submitExport, { isLoading }] = useExportOptOutSmsSendersMutation()

	const onSubmit = async ({ fileName }: ExportOptOutSchemaType) => {
		const body: ExportOptOutSmsSendersParams = {
			fileName,
			ids: !!selection && selection !== "ALL" ? selection : undefined,
			// TODO: Send Search & filters as well
		}

		// Cleaning Body from all undefined/empty/nullish objects/nested objects
		const cleanBody = cleanObject(body)

		await submitExport(cleanBody).unwrap()

		// Clearing Selection list if contacts were selected using their Ids
		if (cleanBody?.ids) dispatch(clearSelection(dataViewKey))

		toast.success("Success!")

		form.reset()
		onClose()
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-1 flex-col justify-between gap-6 overflow-y-auto p-2'
				onSubmit={form.handleSubmit(onSubmit)}>
				<Form.Field
					control={form.control}
					name='fileName'
					render={({ field }) => (
						<Form.Item>
							<Form.Label className='font-bold' size='lg'>
								{t("label")}
							</Form.Label>
							<Form.Control>
								<Input placeholder={t("placeholder")} size='lg' {...field} />
							</Form.Control>
							<Form.Message />
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

export default ExportOptOutSmsSendersDialogContent
