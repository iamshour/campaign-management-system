const appPaths = {
	HOME: "/",
	DASHBOARD: "/dashboard",
	INBOX: "/inbox",
	INTEGRATIONS: "/integrations",

	// #start People
	CONTACTS: "/people/contacts",

	GROUPS: "/people/groups",
	GROUP: "/people/groups/:id",
	GROUP_ADD_CONTACTS: "/people/groups/:id/add-contacts",

	EXPORTS: "/people/exports",
	SEGMENTS: "/people/segments",
	SEGMENTS_NEW: "/people/segments/new-segment",
	SEGMENT_VIEW: "/people/segments/:id",
	SEGMENT_EDIT: "/people/segments/:id/edit-segment",
	// #end People

	// #start Templates
	SMS_TEMPLATES: "/templates/sms-templates",
	SMS_TEMPLATES_MY_TEMPLATES: "/templates/sms-templates/my-templates",
	SMS_TEMPLATES_PREBUILT_TEMPLATES: "/templates/sms-templates/prebuilt-templates",
	// #end Templates

	CAMPAIGNS_MANAGER: "/campaigns-manager",
	CHANNELS: "/channels",
	CHATBOT: "/chatbot",
}

export default appPaths
