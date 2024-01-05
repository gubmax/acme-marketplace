import { memo } from 'react'
import { type LoginData, LoginSchema } from '@acme/shared/schemas/login-schema.js'
import Button from '@acme/ui/components/buttons/button/button.js'
import Dialog from '@acme/ui/components/dialog/dialog.js'
import TextField from '@acme/ui/components/form/text-field/text-field.js'
import { flatten, safeParse } from 'valibot'

import { noop } from 'client/common/helpers/noop.js'
import { useForm } from 'client/common/hooks/use-form.js'

interface AuthDialogProps {
	onSubmit?: () => void
}

const DEFAULT_LOGIN_DATA: LoginData = { email: 'admin', password: 'admin' }

function AuthDialog({ onSubmit = noop }: AuthDialogProps) {
	const [register, submit, errors] = useForm<LoginData>({ defaultValues: DEFAULT_LOGIN_DATA })

	const handleSubmit = submit((data) => {
		const result = safeParse(LoginSchema, data)
		if (!result.success) return flatten(result.issues).nested

		onSubmit()
	})

	return (
		<Dialog>
			<form onSubmit={handleSubmit}>
				<Dialog.Body className="flex flex-col max-w-[24rem]">
					<span className="text-display-sm mb-2">Sign In</span>
					<span className="mb-8 text-secondary">Enter your credentials to access your account</span>
					<TextField className="mb-5">
						<TextField.Label>Login</TextField.Label>
						<TextField.Input required {...register('email')} />
						<TextField.Error>{errors?.email}</TextField.Error>
					</TextField>
					<TextField>
						<TextField.Label>Password</TextField.Label>
						<TextField.Input type="password" required {...register('password')} />
						<TextField.Error>{errors?.password}</TextField.Error>
					</TextField>
					<a className="ui-link ml-auto mt-5 mb-8" href="/forgot-password">
						Forgot password?
					</a>
					<Button className="mb-5" variant="filled" size="lg" type="submit">
						Continue
					</Button>
					<span className="text-center mb-5">
						Don&apos;t have an account?{' '}
						<a className="ui-link" href="/sign-up">
							Sign up
						</a>
					</span>
					<p className="text-secondary text-center leading-normal">
						Click &quot;Continue&quot; to agree to{' '}
						<a className="ui-link" href="/terms">
							Terms of Service
						</a>{' '}
						and acknowledge that{' '}
						<a className="ui-link" href="/privacy">
							Privacy Policy
						</a>{' '}
						applies to you
					</p>
				</Dialog.Body>
			</form>
		</Dialog>
	)
}

export default memo(AuthDialog)
