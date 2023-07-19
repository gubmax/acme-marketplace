type MapEl<T> = T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : never

export type AsProp<K extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements> =
	| { as?: K }
	| ({ as: K } & MapEl<K>)
