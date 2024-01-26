import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserProps, CreateUserService } from "../services/create.user";

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { username, password } = request.body as CreateUserProps;

    console.log({ username, password });

    const userService = new CreateUserService();

    const user = await userService.execute({
      username,
      password,
    });

    reply.send(user);
  }
}
