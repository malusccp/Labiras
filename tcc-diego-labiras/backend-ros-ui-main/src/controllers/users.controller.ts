import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/users.service";
import { ApiResponse } from "../dto/apiResponse";

export class UserController {
  static async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await UserService.getAllUsers();

      return reply
        .code(200)
        .send(new ApiResponse("Usuários encontrados com sucesso", users));
    } catch (error: any) {
      return reply.code(500).send(new ApiResponse(error.message, null, false));
    }
  }

  static async getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = await UserService.getUserById(id);

      if (!user) {
        return reply.code(404).send({
          success: false,
          message: "User not found",
        });
      }

      return reply.send({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error: any) {
      return reply.code(500).send({
        success: false,
        message: error.message,
      });
    }
  }

  static async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, username, password } = request.body as {
        name: string;
        username: string;
        password: string;
      };

      if (!name || !username || !password) {
        return reply.code(400).send({
          success: false,
          message: "Name, username, and password are required",
        });
      }

      const userId = await UserService.createUser({
        name,
        username,
        password,
      });

      return reply.code(201).send({
        success: true,
        message: "User created successfully",
        data: { id: userId },
      });
    } catch (error: any) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }
  }
}
