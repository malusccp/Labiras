import { FastifyInstance } from "fastify";
import {
  createLog,
  // finishLog,
  getActiveTime,
  getLogs,
  LogController,
} from "../controllers/logs.controller";

export default function logsRoutes(fastify: FastifyInstance) {
  fastify.post('/logs', LogController.createLog);
  fastify.get("/logs", LogController.getAllLogs);

  fastify.get("/logs/stats", LogController.getSessionStats);
  fastify.get("/logs/year", LogController.getLogsByYear);

  fastify.get("/logs/active-time", getActiveTime);
  fastify.post("/logs/:id", createLog);
  // fastify.post("/logs/:id/finish", finishLog);
}
