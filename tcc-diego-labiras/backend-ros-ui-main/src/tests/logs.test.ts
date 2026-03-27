import request from "supertest";
import app from "../app";
import {
  createLogsService,
  //  finishLogService
} from "../services/logs.service";
import { pool } from "../database/db";

describe("React ROS Ui App", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a log and return an id", async () => {
    const logId = await createLogsService("1");

    expect(logId).toBeDefined();

    const result = await pool.query(
      `SELECT * FROM user_connection_logs WHERE user_id = $1 AND connection_log_id = $2`,
      ["1", logId]
    );
    expect(result.rowCount).toBe(1); // Confirma que o relacionamento existe
  });

  // it("should finish a log by setting finished_at", async () => {
  //   // Primeiro, cria um usuário e um log
  //   const logId = await createLogsService("1");

  //   // Finaliza o log criado
  //   await finishLogService(logId);

  //   // Consulta o log para verificar se finished_at foi atualizado
  //   const result = await pool.query(
  //     `SELECT finished_at FROM connection_logs WHERE id = $1`,
  //     [logId]
  //   );

  //   // Verifica se finished_at não é nulo
  //   expect(result.rows[0].finished_at).not.toBeNull();
  // });
});
