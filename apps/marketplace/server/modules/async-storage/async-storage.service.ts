import { AsyncLocalStorage } from 'node:async_hooks'

export default class AsyncStorageService {
	storage = new AsyncLocalStorage<Map<string, unknown>>()
}
