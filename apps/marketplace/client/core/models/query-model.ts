import { BehaviorSubject } from 'rxjs'

export type QueryStatus = 'idle' | 'loading' | 'success' | 'failure'

export interface QueryState<T> {
	status: QueryStatus
	loading: boolean
	response?: T
	error?: unknown
}

export type QueryAction<T> =
	| { type: 'idle' }
	| { type: 'loading' }
	| { type: 'success'; payload: T }
	| { type: 'failure'; payload: unknown }

export function queryModel<R>(initialAction: QueryAction<R> = { type: 'idle' }) {
	const store = new BehaviorSubject<QueryState<R>>(reduce(initialAction))

	function reduce(action: QueryAction<R>) {
		switch (action.type) {
			case 'idle':
				return { status: 'idle', loading: false, response: undefined, error: undefined } as const
			case 'loading':
				return { status: 'loading', loading: true, response: undefined, error: undefined } as const
			case 'success':
				return { status: 'success', loading: false, response: action.payload } as const
			case 'failure':
				return { status: 'failure', loading: false, error: action.payload } as const
		}
	}

	function dispatch(action: QueryAction<R>): void {
		store.next(reduce(action))
	}

	// Public methods

	async function run(callback: () => Promise<R>): Promise<R> {
		try {
			dispatch({ type: 'loading' })
			const res = await callback()
			dispatch({ type: 'success', payload: res })
			return res
		} catch (error: unknown) {
			dispatch({ type: 'failure', payload: error })
			throw error
		}
	}

	function reset(): void {
		dispatch({ type: 'idle' })
	}

	return { store, run, reset } as const
}
