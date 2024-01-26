import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateUserController } from "./controllers/create.user.controller";
import { ListeUsersController } from "./controllers/list.users.controller";

export const routes = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  fastify.get(
    "/teste",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return {
        ok: true,
      };
    }
  );

  fastify.post(
    "/create-user",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(request, reply);
    }
  );

  fastify.get(
    "/users",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListeUsersController().handle(request, reply);
    }
  );
};
