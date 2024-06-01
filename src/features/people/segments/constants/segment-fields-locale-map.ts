import type { Segment } from "../types"

const segmentFieldsLocaleMap: Partial<Record<keyof Segment, string>> = {
	createdAt: "segments:fields.createdAt",
	description: "segments:fields.description",
	name: "segments:fields.name",
}

export default segmentFieldsLocaleMap
