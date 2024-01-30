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
	CAMPAIGNS_MANAGER: "/campaigns-manager",
	TEMPLATE_MANAGER: "/template-manager",
	CHANNELS: "/channels",
	CHATBOT: "/chatbot",
}

export default appPaths
