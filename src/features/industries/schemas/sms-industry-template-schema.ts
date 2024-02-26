//#region Import
import SmsTemplateSchema from "@/features/templates/sms-templates/schemas/sms-template-schema"
import * as z from "zod"
//#endregion

const SmsIndustryTemplateSchema = SmsTemplateSchema.extend({
	background: z.instanceof(File).optional(),
	backgroundImage: z.string().optional(),
	mostPopular: z.boolean().optional().default(false),
}).refine(({ background, backgroundImage }) => !!background || !!backgroundImage, {
	message: "Required",
	path: ["background"],
})

export default SmsIndustryTemplateSchema

export type SmsIndustryTemplateSchemaType = z.infer<typeof SmsIndustryTemplateSchema>
