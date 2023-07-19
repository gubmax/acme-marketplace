import type { PrismaClient, User } from '@prisma/client'

export default class UserRepository {
	constructor(private prisma: PrismaClient) {}

	getUserById(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } })
	}
}
