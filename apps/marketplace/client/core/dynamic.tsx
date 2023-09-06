import { type ComponentType, lazy, type PropsWithRef, type ReactNode, Suspense } from 'react'

export interface DynamicProps {
	fallback?: ReactNode
}

export type DynamicComponent<P = unknown, E = never> = ComponentType<P & DynamicProps> & {
	loader: DynamicFactory<P, E>
	fulfilled: DynamicModule<P> | null
}

export interface DynamicModule<P = unknown> {
	default: ComponentType<P>
}

export type DynamicFactory<P = unknown, E = never> = () => Promise<
	[E] extends [never] ? DynamicModule<P> : DynamicModule<P> & E
>

export function dynamic<P>(factory: DynamicFactory<P>): DynamicComponent<P> {
	const Dynamic: DynamicComponent<P> = ({ fallback, ...rest }: P & DynamicProps) => {
		const LazyComponent = lazy(async function dynamicFactory() {
			if (Dynamic.fulfilled !== null) return Dynamic.fulfilled

			const component = await factory()
			Dynamic.fulfilled = component
			return component
		})

		const Component = Dynamic.fulfilled?.default ?? LazyComponent
		const componentProps = rest as P & PropsWithRef<P> & JSX.IntrinsicAttributes

		return (
			<Suspense fallback={fallback}>
				<Component {...componentProps} />
			</Suspense>
		)
	}

	Dynamic.loader = factory
	Dynamic.fulfilled = null

	return Dynamic
}
