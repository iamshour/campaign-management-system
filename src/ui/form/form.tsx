//#region Import
import { Slot, type SlotProps } from "@radix-ui/react-slot"
import { createContext, forwardRef, useContext, useId } from "react"
import {
	Controller,
	FormProvider,
	useFormContext,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	type FormProviderProps,
} from "react-hook-form"
import { twMerge } from "tailwind-merge"

import Label from "../label/label"
//#endregion

const Form = <
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues extends FieldValues = FieldValues,
>(
	props: FormProviderProps<TFieldValues, TContext, TTransformedValues>
) => <FormProvider {...props} />

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName }

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => (
	<FormFieldContext.Provider value={{ name: props.name }}>
		<Controller {...props} />
	</FormFieldContext.Provider>
)

// eslint-disable-next-line react-refresh/only-export-components
export const useFormField = () => {
	const fieldContext = useContext(FormFieldContext)
	const itemContext = useContext(FormItemContext)
	const { getFieldState, formState } = useFormContext()

	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>")
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}

type FormItemContextValue = { id: string }

export const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = (props: React.HTMLAttributes<HTMLDivElement>) => {
	const id = useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div {...props} />
		</FormItemContext.Provider>
	)
}

const FormLabel = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Label>) => {
	const { error, formItemId } = useFormField()

	return <Label htmlFor={formItemId} {...props} className={twMerge(className, error && "text-red-500")} />
}

const FormControl = forwardRef<React.ElementRef<typeof Slot>, SlotProps>((props, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
			aria-invalid={!!error}
			{...props}
		/>
	)
})
FormControl.displayName = "FormControl"

const FormDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
	const { formDescriptionId } = useFormField()

	return <p id={formDescriptionId} className={twMerge("text-sm text-slate-500", className)} {...props} />
}

const FormMessage = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message) : children

	if (!body) return null

	return (
		<p id={formMessageId} className={twMerge("text-xs font-medium text-red-500", className)} {...props}>
			{body}
		</p>
	)
}

Form.Item = FormItem
Form.Label = FormLabel
Form.Control = FormControl
Form.Description = FormDescription
Form.Message = FormMessage
Form.Field = FormField

export default Form
