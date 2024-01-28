import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserProps, CreateUserService } from "../services/create.user";
import bcrypt from "bcrypt";

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password, name } = request.body as CreateUserProps;

    console.log({ email, password, name });

    const userService = new CreateUserService();

    const user = await userService.execute({
      email,
      password: bcrypt.hashSync(password, 10),
      name,
    });

    reply.send(user);
  }
}
