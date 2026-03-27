import { createUserDto } from "../dto/user/user.dto";
import { AppError } from "../errors/app.error";
import { UserRepository } from "../repository/user.repository";

export class UserService {
  static async getAdminUser() {
    const adminUser = await UserRepository.findByUsername('user.admin');
    if (!adminUser) {
      throw new AppError("Admin user não encontrado", 404);
    }
    return adminUser;
  }

  static async getAllUsers() {
    return await UserRepository.findAll();
  }

  static async getUserById(id: string) {
    return await UserRepository.findById(id);
  }

  static async createUser(userData: createUserDto) {
    // Check if username already exists
    const existingUser = await UserRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new AppError("Username já existe", 400);
    }

    return await UserRepository.create(userData);
  }
}