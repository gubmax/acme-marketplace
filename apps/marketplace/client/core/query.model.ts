import { BehaviorSubject } from 'rxjs'

export interface QueryState<T> {
	status: QueryStatuses
	loading: boolean
	response?: T
	error?: unknown
}

export type QueryAction<T> =
	| { type: QueryStatuses.IDLE }
	| { type: QueryStatuses.LOADING }
	| { type: QueryStatuses.SUCCESS; payload: T }
	| { type: QueryStatuses.FAILURE; payload: unknown }

export enum QueryStatuses {
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCESS = 'success',
	FAILURE = 'failure',
}

export abstract class QueryModel<R> {
	readonly queryObs = new BehaviorSubject<QueryState<R>>({
		status: QueryStatuses.IDLE,
		loading: false,
	})

	#reduce = (action: QueryAction<R>) => {
		switch (action.type) {
			case QueryStatuses.IDLE:
				return {
					status: QueryStatuses.IDLE,
					loading: false,
					response: undefined,
					error: undefined,
				}

			case QueryStatuses.LOADING:
				return {
					status: QueryStatuses.LOADING,
					loading: true,
					response: undefined,
					error: undefined,
				}

			case QueryStatuses.SUCCESS:
				return {
					status: QueryStatuses.SUCCESS,
					loading: false,
					response: action.payload,
				}

			case QueryStatuses.FAILURE:
				return {
					status: QueryStatuses.FAILURE,
					loading: false,
					error: action.payload,
				}
		}
	}

	#dispatch = (action: QueryAction<R>): void => {
		this.queryObs.next(this.#reduce(action))
	}

	// Public

	protected async run(callback: () => Promise<R>): Promise<R> {
		try {
			this.#dispatch({ type: QueryStatuses.LOADING })
			const res = await callback()
			this.#dispatch({ type: QueryStatuses.SUCCESS, payload: res })
			return res
		} catch (error: unknown) {
			this.#dispatch({ type: QueryStatuses.FAILURE, payload: error })
			throw error
		}
	}

	reset(): void {
		this.#dispatch({ type: QueryStatuses.IDLE })
	}
}
