import prismaClient from "../prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class LoginService {
  async execute({ email, password }: { email: string; password: string }) {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("Este usuário não existe.");
    }

    const isSamePassword = bcrypt.compareSync(password, existingUser.password);

    if (!isSamePassword) {
      throw new Error("Senha inválida.");
    }

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      "@login",
      {
        expiresIn: "1h",
      }
    );

    return { user: existingUser, token };
  }
}
