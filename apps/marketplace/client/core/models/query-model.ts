import { BehaviorSubject } from 'rxjs'

export interface QueryState<T> {
	status: QueryStatus
	loading: boolean
	response?: T
	error?: unknown
}

export type QueryAction<T> =
	| { type: QueryStatus.idle }
	| { type: QueryStatus.loading }
	| { type: QueryStatus.success; payload: T }
	| { type: QueryStatus.failure; payload: unknown }

export enum QueryStatus {
	idle = 'IDLE',
	loading = 'LOADING',
	success = 'SUCCESS',
	failure = 'FAILURE',
}

export class QueryModel<R> {
	readonly queryObs: BehaviorSubject<QueryState<R>>

	constructor(initialAction: QueryAction<R> = { type: QueryStatus.idle }) {
		this.queryObs = new BehaviorSubject<QueryState<R>>(this.#reduce(initialAction))
	}

	#reduce = (action: QueryAction<R>) => {
		switch (action.type) {
			case QueryStatus.idle:
				return { status: QueryStatus.idle, loading: false, response: undefined, error: undefined }

			case QueryStatus.loading:
				return { status: QueryStatus.loading, loading: true, response: undefined, error: undefined }

			case QueryStatus.success:
				return { status: QueryStatus.success, loading: false, response: action.payload }

			case QueryStatus.failure:
				return { status: QueryStatus.failure, loading: false, error: action.payload }
		}
	}

	#dispatch = (action: QueryAction<R>): void => {
		this.queryObs.next(this.#reduce(action))
	}

	// Public

	async run(callback: () => Promise<R>): Promise<R> {
		try {
			this.#dispatch({ type: QueryStatus.loading })
			const res = await callback()
			this.#dispatch({ type: QueryStatus.success, payload: res })
			return res
		} catch (error: unknown) {
			this.#dispatch({ type: QueryStatus.failure, payload: error })
			throw error
		}
	}

	reset(): void {
		this.#dispatch({ type: QueryStatus.idle })
	}
}
