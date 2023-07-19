import { type ComponentType, lazy, type PropsWithRef, type ReactNode, Suspense } from 'react'

export interface DynamicProps {
	fallback?: ReactNode
}

export type DynamicComponentType<P = unknown, E = never> = ComponentType<P & DynamicProps> & {
	loader: DynamicFactory<P, E>
}

export interface DynamicModule<P = unknown> {
	default: ComponentType<P>
}

export type DynamicFactory<P = unknown, E = never> = () => Promise<
	[E] extends [never] ? DynamicModule<P> : DynamicModule<P> & E
>

export function dynamic<P>(factory: DynamicFactory<P>): DynamicComponentType<P> {
	let cache: DynamicModule<P> | null = null

	function Dynamic({ fallback, ...rest }: P & DynamicProps) {
		const LazyComponent = lazy(async function dynamicFactory() {
			if (cache !== null) return cache

			const component = await factory()
			cache = component
			return component
		})

		const Component = cache?.default ?? LazyComponent
		const componentProps = rest as P & PropsWithRef<P> & JSX.IntrinsicAttributes

		return (
			<Suspense fallback={fallback}>
				<Component {...componentProps} />
			</Suspense>
		)
	}

	Dynamic.loader = factory

	return Dynamic
}
