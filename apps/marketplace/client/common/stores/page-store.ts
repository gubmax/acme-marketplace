import { atom } from 'nanostores'

export const pageStore = atom<{ title: string }>({ title: '' })

export function setPageTitle(value: string): void {
	pageStore.set({ ...pageStore.get(), title: value })
}
