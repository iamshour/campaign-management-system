//#region Import
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useAddBulkChannelSourceRequestsMutation } from "../api"
import BulkRequestsForm from "../components/bulk-requests-form/bulk-requests-form"
import { AddBulkChannelSourceRequestsBody } from "../types/api.types"
//#endregion

const CreateChannelSourceRequestRoute = () => {
	const { t } = useTranslation("senders-management", { keyPrefix: `routes.createChannelSourceRequest` })

	const [triggerAddBulkSmsListingRequests] = useAddBulkChannelSourceRequestsMutation()

	const onSubmit = async (body: AddBulkChannelSourceRequestsBody) => {
		const promise = await triggerAddBulkSmsListingRequests(body).unwrap()

		toast.success("Requests added successfully")

		return promise
	}

	return (
		<div className='flex h-full w-full flex-col gap-6 overflow-hidden p-6'>
			<header>
				<h3 className='text-xl font-medium'>{t("header")}</h3>
			</header>

			<BulkRequestsForm funnelKey='CHANNEL_SOURCE_REQUEST' onSubmit={onSubmit} />
		</div>
	)
}

export default CreateChannelSourceRequestRoute
