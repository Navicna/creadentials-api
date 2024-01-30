import { FastifyRequest, FastifyReply } from "fastify";
import { LoginService } from "../services/login";

export class LoginController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const loginService = new LoginService();

    try {
      const { user, token } = await loginService.execute({ email, password });

      reply.send({ user, token });
    } catch (error: any) {
      reply
        .status(401)
        .send({ error: error.message ?? "Erro ao realizar o login." });
    }
  }
}
