import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUserService } from "../services/delete.user";

export class DeleteUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.body as { id: string };
    console.log("chegou aqqq");

    const userService = new DeleteUserService();

    const user = await userService.execute(id);

    reply.send(user);
  }
}
