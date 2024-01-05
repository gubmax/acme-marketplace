import { email, minLength, object, type Output, string } from 'valibot'

export const LoginSchema = object({
	email: string([email()]),
	password: string([minLength(8, 'Password must has at least 8 characters')]),
})

export type LoginData = Output<typeof LoginSchema>
