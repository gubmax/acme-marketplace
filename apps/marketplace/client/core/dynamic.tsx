import { type ComponentType, lazy, type PropsWithRef, type ReactNode, Suspense } from 'react'

export interface DynamicProps {
	fallback?: ReactNode
}

type MapDynamicModule<P = unknown, E = never> = [E] extends [never]
	? DynamicModule<P>
	: DynamicModule<P> & E

export type DynamicComponent<P = unknown, E = never> = ComponentType<P & DynamicProps> & {
	loader: DynamicFactory<P, E>
	fulfilled: MapDynamicModule<P, E> | null
}

export interface DynamicModule<P = unknown> {
	default: ComponentType<P>
}

export type DynamicFactory<P = unknown, E = never> = () => Promise<MapDynamicModule<P, E>>

export function dynamic<P, E = never>(factory: DynamicFactory<P, E>): DynamicComponent<P, E> {
	const Dynamic: DynamicComponent<P, E> = ({ fallback, ...rest }: P & DynamicProps) => {
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
