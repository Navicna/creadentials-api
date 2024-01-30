import { FastifyRequest, FastifyReply } from "fastify";
import { ListUsersService } from "../services/list.users";

export class ListeUsersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userService = new ListUsersService();

    const user = await userService.execute();

    return reply.send(user);
  }
}
