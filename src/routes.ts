import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateUserController } from "./controllers/create.user.controller";
import { ListeUsersController } from "./controllers/list.users.controller";
import { DeleteUserController } from "./controllers/delete.user.controller";
import { LoginController } from "./controllers/login.controller";
import verifyToken from "./services/verify-token";
import { removeBearerToken } from "./utils/string";

const authenticationHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: any
) => {
  const token = request.headers.authorization
    ? removeBearerToken(request.headers.authorization)
    : undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const user = await verifyToken(token);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  done();
};

export const routes = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  fastify.post(
    "/create-user",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(request, reply);
    }
  );

  fastify.get(
    "/users",
    {
      preHandler: authenticationHandler,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListeUsersController().handle(request, reply);
    }
  );

  fastify.delete(
    "/users",
    {
      preHandler: authenticationHandler,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteUserController().handle(request, reply);
    }
  );

  fastify.post(
    "/login",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new LoginController().handle(request, reply);
    }
  );
};
