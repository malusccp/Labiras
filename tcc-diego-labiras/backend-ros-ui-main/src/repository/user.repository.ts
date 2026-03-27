// Postgres-backed UserRepository (TypeScript)
import { User } from "../models/user";
import { pool } from "../database/db";
import { createUserDto } from "../dto/user/user.dto";

export class UserRepository {
  static async create(userData: createUserDto): Promise<string> {
    const query = `INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING id`;
    const values = [userData.name, userData.username, userData.password];
    const result = await pool.query(query, values);
    return result.rows[0].id as string;
  }

  static async findAll(): Promise<User[]> {
    const result = await pool.query(
      `SELECT id, username, password FROM users ORDER BY id ASC`
    );
    return result.rows as unknown as User[];
  }

  static async findByUsername(username: string): Promise<User | undefined> {
    const result = await pool.query(
      `SELECT id, username, password FROM users WHERE username = $1 LIMIT 1`,
      [username]
    );
    const row = result.rows[0];
    if (!row) return undefined;
    return { id: String(row.id), username: row.username, password: row.password } as User;
  }

  static async findById(id: string): Promise<User | undefined> {
    const result = await pool.query(
      `SELECT id, username, password FROM users WHERE id = $1 LIMIT 1`,
      [id]
    );
    const row = result.rows[0];
    if (!row) return undefined;
    return { id: String(row.id), username: row.username, password: row.password } as User;
  }

  static async getUser(id: string): Promise<User | undefined> {
    return await this.findById(id);
  }
}
