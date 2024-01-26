import prismaClient from "../prisma";

export class ListUsersService {
  async execute() {
    const users = await prismaClient.user.findMany();

    return users.map((user) => ({
      ...user,
      password: undefined,
    }));
  }
}
