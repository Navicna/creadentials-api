import prismaClient from "../prisma";

export class DeleteUserService {
  async execute(id: string) {
    if (!id) {
      throw new Error("Id inexistente.");
    }

    const existingUser = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!existingUser) {
      throw new Error("Este usuário não existe.");
    }

    const user = await prismaClient.user.delete({
      where: {
        ...existingUser,
      },
    });

    return user;
  }
}
