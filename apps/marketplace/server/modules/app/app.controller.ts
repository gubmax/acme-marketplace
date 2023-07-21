import type { FastifyInstance } from 'fastify'

export default (server: FastifyInstance): void => {
	server.get('/health', async (req, res) => res.status(200).send())
}
