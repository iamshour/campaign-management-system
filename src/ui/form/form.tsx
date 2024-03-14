//#region Import
import { Slot, type SlotProps } from "@radix-ui/react-slot"
import { createContext, forwardRef, useContext, useId } from "react"
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	type FormProviderProps,
	useFormContext,
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

	const { formState, getFieldState } = useFormContext()

	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>")
	}

	const { id } = itemContext

	return {
		formDescriptionId: `${id}-form-item-description`,
		formItemId: `${id}-form-item`,
		formMessageId: `${id}-form-item-message`,
		id,
		name: fieldContext.name,
		...fieldState,
	}
}

type FormItemContextValue = { id: string }

export const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	const id = useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div {...props} className={twMerge("flex w-full max-w-[340px] flex-col", className)} />
		</FormItemContext.Provider>
	)
}

const FormLabel = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Label>) => {
	const { error, formItemId } = useFormField()

	return <Label htmlFor={formItemId} {...props} className={twMerge(className, error && "text-red-500")} />
}

const FormControl = forwardRef<React.ElementRef<typeof Slot>, SlotProps>((props, ref) => {
	const { error, formDescriptionId, formItemId, formMessageId } = useFormField()

	return (
		<Slot
			aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
			aria-invalid={!!error}
			id={formItemId}
			ref={ref}
			{...props}
		/>
	)
})

FormControl.displayName = "FormControl"

const FormDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
	const { formDescriptionId } = useFormField()

	return <p className={twMerge("text-sm text-slate-500", className)} id={formDescriptionId} {...props} />
}

const FormMessage = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
	const { error, formMessageId } = useFormField()

	const body = error ? String(error?.message) : children

	if (!body) return null

	return (
		<p className={twMerge("ps-0.5 pt-0.5 text-xs font-medium text-red-500", className)} id={formMessageId} {...props}>
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
