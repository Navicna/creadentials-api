import prismaClient from "../prisma";

export interface CreateUserProps {
  name: string;
  password: string;
  email: string;
}

export class CreateUserService {
  async execute({ email, password, name }: CreateUserProps) {
    if (!email || !password || !name) {
      throw new Error("Preencha os campos corretamente.");
    }

    const existingUser = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("Este username já está em uso. Escolha outro.");
    }

    const user = await prismaClient.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return user;
  }
}
