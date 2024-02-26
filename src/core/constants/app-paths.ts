const appPaths = {
	CAMPAIGNS_MANAGER: "/campaigns-manager",
	CHANNELS: "/channels",
	CHATBOT: "/chatbot",
	// #start People
	CONTACTS: "/people/contacts",

	DASHBOARD: "/dashboard",

	EXPORTS: "/people/exports",
	GROUP: "/people/groups/:id",
	GROUP_ADD_CONTACTS: "/people/groups/:id/add-contacts",

	GROUPS: "/people/groups",
	HOME: "/",
	INBOX: "/inbox",
	INDUSTRIES: "./industries",
	INTEGRATIONS: "/integrations",
	// #end People

	SEGMENT_EDIT: "/people/segments/:id/edit-segment",
	SEGMENT_VIEW: "/people/segments/:id",
	SEGMENTS: "/people/segments",
	// #end Templates

	SEGMENTS_NEW: "/people/segments/new-segment",

	// #start Templates
	SMS_TEMPLATES: "/templates/sms-templates",
	SMS_TEMPLATES_MY_TEMPLATES: "/templates/sms-templates/my-templates",
	SMS_TEMPLATES_PREBUILT_TEMPLATES: "/templates/sms-templates/prebuilt-templates",
}

export default appPaths
