import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { routes } from "./routes";

const port = process.env.PORT ? Number(process.env.PORT) : 3333;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

const app = fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(fastifyCors);
  await app.register(routes);

  try {
    await app.listen({
      port,
      host,
    });
    console.log("RODANDO APLICAÇÃO");
  } catch (e) {
    process.exit(1);
  }
};

start();
