import { type FormEventHandler, memo } from 'react'
import Button from '@acme/ui/components/buttons/button/button.js'
import Dialog from '@acme/ui/components/dialog/dialog.js'
import Modal, { type ModalProps } from '@acme/ui/components/floating/modal/modal.js'
import Input from '@acme/ui/components/form/input/input.js'

interface AuthModalProps extends Omit<ModalProps, 'onSubmit'> {
	onSubmit: FormEventHandler<HTMLFormElement>
}

function AuthModal({ onSubmit, ...rest }: AuthModalProps) {
	return (
		<Modal {...rest}>
			<Dialog>
				<form onSubmit={onSubmit}>
					<Dialog.Body className="flex flex-col max-w-[24rem]">
						<span className="text-display-sm mb-2">Sign In</span>
						<span className="mb-8 text-secondary">
							Enter your credentials to access your account
						</span>
						<div className="mb-5">
							<label className="block text-label-lg mb-2">Login</label>
							<Input className="w-full" type="text" name="login" defaultValue="admin" required />
						</div>
						<div>
							<label className="block text-label-lg mb-2">Password</label>
							<Input
								className="w-full mb-5"
								type="password"
								name="password"
								defaultValue="admin"
								required
							/>
						</div>
						<a className="ui-link ml-auto mb-8" href="/forgot-password">
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
		</Modal>
	)
}

export default memo(AuthModal)
