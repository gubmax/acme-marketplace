import { type ChangeEvent, type FormEvent, useCallback, useRef, useState } from 'react'

export interface FormProps<T extends Record<string, string>> {
	defaultValues: T
}

export interface FieldProps {
	name: string
	defaultValue?: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function useForm<FormData extends Record<string, string>>(props: FormProps<FormData>) {
	const fieldsRef = useRef<FormData>(props.defaultValues)
	const [errors, setErrors] = useState<Partial<FormData> | undefined>()

	const register = useCallback((name: keyof FormData): FieldProps => {
		return {
			name: String(name),
			defaultValue: fieldsRef.current[name],
			onChange: (event: ChangeEvent<HTMLInputElement>) => {
				fieldsRef.current[name] = event.target.value as FormData[keyof FormData]
			},
		}
	}, [])

	const handleSubmit = useCallback(
		(callback: (data: Partial<FormData>) => Partial<FormData> | undefined) => {
			return (event: FormEvent<HTMLFormElement>) => {
				event.preventDefault()
				const issues = callback(fieldsRef.current)
				if (issues) setErrors(issues)
			}
		},
		[],
	)

	return [register, handleSubmit, errors] as const
}
