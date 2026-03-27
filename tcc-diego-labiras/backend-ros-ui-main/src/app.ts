import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import logsRoutes from "./routes/logs.routes";
import usersRoutes from "./routes/users.routes";
import fastifyCors from "@fastify/cors";

const app = Fastify();

app.register(fastifyCors);
app.register(logsRoutes, { prefix: "/api" });
app.register(usersRoutes, { prefix: "/api" });
 
app.get("/health", async () => {
  return { status: "OK", timestamp: new Date().toISOString() };
});

export default app;
