import type { Segment } from "../types"

const segmentFieldsLocaleMap: Partial<Record<keyof Segment, string>> = {
	name: "segments:fields.name",
	description: "segments:fields.description",
	createdAt: "segments:fields.createdAt",
}

export default segmentFieldsLocaleMap
