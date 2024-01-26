import prismaClient from "../prisma";

export interface CreateUserProps {
  username: string;
  password: string;
}

export class CreateUserService {
  async execute({ username, password }: CreateUserProps) {
    if (!username || !password) {
      throw new Error("Preencha os campos corretamente.");
    }

    const existingUser = await prismaClient.users.findFirst({
      where: {
        username,
      },
    });

    if (existingUser) {
      throw new Error("Este username já está em uso. Escolha outro.");
    }

    const user = await prismaClient.users.create({
      data: {
        username,
        password,
      },
    });

    return user;
  }
}
