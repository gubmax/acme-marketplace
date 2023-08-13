import { produce } from 'immer'
import { BehaviorSubject } from 'rxjs'

interface PageState {
	title: string
}

export const pageStore = new BehaviorSubject<PageState>({ title: '' })

export function setPageTitle(value?: string): void {
	const state = produce(pageStore.value, (draft) => {
		draft.title = value ?? ''
	})

	pageStore.next(state)
}
