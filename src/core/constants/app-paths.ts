/* eslint-disable perfectionist/sort-objects*/

const appPaths = {
	HOME: "/",

	// #start People
	CONTACTS: "/people/contacts",
	GROUPS: "/people/groups",
	GROUP: "/people/groups/:id",
	GROUP_ADD_CONTACTS: "/people/groups/:id/add-contacts",
	EXPORTS: "/people/exports",
	SEGMENTS: "/people/segments",
	SEGMENT_EDIT: "/people/segments/:id/edit-segment",
	SEGMENT_VIEW: "/people/segments/:id",
	SEGMENTS_NEW: "/people/segments/new-segment",
	// #end People

	// #start Templates
	SMS_TEMPLATES: "/templates/sms-templates",
	SMS_TEMPLATES_MY_TEMPLATES: "/templates/sms-templates/my-templates",
	SMS_TEMPLATES_PREBUILT_TEMPLATES: "/templates/sms-templates/prebuilt-templates",
	// #end Templates

	INDUSTRIES: "/industries",

	// #start channels
	CHANNELS: "/channels",
	// #end channels
}

export default appPaths
