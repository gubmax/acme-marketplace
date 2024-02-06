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

export class QueryModel<R> {
	store: BehaviorSubject<QueryState<R>>

	constructor(initialAction: QueryAction<R> = { type: 'idle' }) {
		this.store = new BehaviorSubject<QueryState<R>>(this.reduce(initialAction))
	}

	private reduce(action: QueryAction<R>) {
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

	private dispatch(action: QueryAction<R>): void {
		this.store.next(this.reduce(action))
	}

	// Actions

	async run(callback: () => Promise<R>): Promise<R> {
		try {
			this.dispatch({ type: 'loading' })
			const res = await callback()
			this.dispatch({ type: 'success', payload: res })
			return res
		} catch (error: unknown) {
			this.dispatch({ type: 'failure', payload: error })
			throw error
		}
	}

	reset(): void {
		this.dispatch({ type: 'idle' })
	}
}
