import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/users.controller";

export default function usersRoutes(fastify: FastifyInstance) {
  fastify.get("/users", UserController.getAllUsers);

  fastify.get("/users/:id", UserController.getUserById);

  fastify.post("/users", UserController.createUser);
} 
