import type { User } from '@prisma/client'
import type { FastifyInstance, RouteGenericInterface } from 'fastify'

import type UserRepository from './user.repository.js'

export default (server: FastifyInstance, userRepository: UserRepository) => {
	interface UserIdRoute extends RouteGenericInterface {
		Params: { id: string }
	}
	server.get<UserIdRoute>('/user/:id', async (req, res): Promise<User> => {
		const { id } = req.params
		const user = await userRepository.getUserById(id)

		if (user) return res.status(200).send(user)

		return res
			.status(404)
			.send({ message: `User "${id}" not found`, error: 'Not Found', statusCode: 404 })
	})
}
