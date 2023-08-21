import type {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	HookHandlerDoneFunction,
} from 'fastify'
import hyperid from 'hyperid'

import type AsyncStorageService from 'server/modules/async-storage/async-storage.service.js'
import type LoggerService from 'server/modules/logger/logger.service.js'

export default function requestLoggingHook(
	server: FastifyInstance,
	asyncStorageService: AsyncStorageService,
	loggerService: LoggerService,
): void {
	const { storage } = asyncStorageService
	const { logger } = loggerService
	const uuid = hyperid()

	function logRequest(req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction): void {
		const store = new Map<string, unknown>()
		const reqId = String(req.id)
		const traceIdHeader = req.headers['x-trace-id']

		store.set('reqId', reqId)
		store.set('traceId', typeof traceIdHeader === 'string' ? traceIdHeader : uuid())

		const reqPayload = {
			reqId: String(req.id),
			req: {
				method: req.method,
				url: req.url,
			},
		}
		logger.info(reqPayload, 'Incoming request')

		storage.run(store, () => {
			done()
		})
	}

	function logResponse(
		req: FastifyRequest,
		res: FastifyReply,
		payload: unknown,
		done: HookHandlerDoneFunction,
	): void {
		const store = storage.getStore()
		const reqId = store?.get('reqId')

		const resPayload = {
			reqId,
			res: {
				statusCode: res.raw.statusCode,
				method: req.method,
				url: req.raw.url,
				durationMs: res.getResponseTime(),
			},
		}
		logger.info(resPayload, 'Request completed')

		void res.header('x-request-id', reqId)

		done()
	}

	server.addHook('onRequest', logRequest)
	server.addHook('onSend', logResponse)
}
