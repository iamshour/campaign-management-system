//#region Import
import type { ExportChannelSourceOptOutListParams } from "@/features/channels/sms-senders-management/types/api.types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { clearSelection } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useExportChannelSourceOptOutListMutation } from "@/features/channels/sms-senders-management/api"
import { Button, Form, Input, useForm } from "@/ui"
import { cleanObject, generateFileName } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
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

	const dispatch = useDispatch()

	const { channelSourceId } = useParams()

	const { dataViewKey } = useDataViewContext<
		any,
		"international-sms-channel-source-opted-out-list" | "local-sms-channel-source-opted-out-list"
	>()

	const { filters, searchTerm, selection } = useSelector(({ dataView }) => dataView[dataViewKey])

	const defaultFileName = generateFileName(companyName, "opt-out")

	const form = useForm<ExportOptOutSchemaType>({
		defaultValues: {
			fileName: defaultFileName,
		},
		mode: "onSubmit",
		resolver: zodResolver(exportOptOutSchema),
	})

	const [submitExport, { isLoading }] = useExportChannelSourceOptOutListMutation()

	const onSubmit = async ({ fileName }: ExportOptOutSchemaType) => {
		if (!channelSourceId) return

		const params: ExportChannelSourceOptOutListParams = {
			channelSourceId,
			fileName,
			optOutsIdsList: !!selection && selection !== "ALL" ? selection : undefined,
			...filters,
			...getSearchFilter<["recipient"]>(searchTerm, ["recipient"]),
		}

		// Cleaning Body from all undefined/empty/nullish objects/nested objects
		const cleanBody = cleanObject(params)

		await submitExport(cleanBody).unwrap()

		// Clearing Selection list if contacts were selected using their Ids
		if (cleanBody?.optOutsIdsList) dispatch(clearSelection(dataViewKey))

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
						<Form.Item label={t("label")} required size='lg'>
							<Input placeholder={t("placeholder")} {...field} />
						</Form.Item>
					)}
				/>

				<Button className='ms-auto w-full shrink-0 px-10 sm:w-max' loading={isLoading} type='submit'>
					{t("submit")}
				</Button>
			</form>
		</Form>
	)
}

export default ExportOptOutSmsSendersDialogContent
