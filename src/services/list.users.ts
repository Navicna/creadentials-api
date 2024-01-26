import prismaClient from "../prisma";

export class ListUsersService {
  async execute() {
    const users = await prismaClient.users.findMany();

    return users.map((user) => ({
      ...user,
      password: undefined,
    }));
  }
}
