//#region Import
import CreateSmsSenderRequestView, {
	SmsSenderRequestsForm,
} from "../views/create-sms-sender-request-view/create-sms-sender-request-view"
//#endregion

const CreateSmsSenderRequestRoute = () => {
	// Call API TO SUBMIT NEW BULK LISTING DATA
	const onSubmit = (data: SmsSenderRequestsForm) => {
		// eslint-disable-next-line no-console
		console.log(data)

		// ON SUBMIT
		// NAVIGATE TO: state?.from || `/admin/channels/${channel?.type}-${channel?.name}/listing-requests`
	}

	return <CreateSmsSenderRequestView onSubmit={onSubmit} />
}

export default CreateSmsSenderRequestRoute
