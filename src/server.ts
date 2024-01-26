import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { routes } from "./routes";

const app = fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(fastifyCors);
  await app.register(routes);

  try {
    await app.listen({
      port: process.env.PORT ? Number(process.env.PORT) : 3333,
    });
    console.log("RODANDO APLICAÇÃO");
  } catch (e) {
    process.exit(1);
  }
};

start();
