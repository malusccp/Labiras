/* Postgres-backed Log repository (TypeScript) */
import { pool } from "../database/db";
import { CreateLogInput } from "../dto/logs/log.dto";
import { EventType } from "../models/enums/eventType";

export interface LogRow {
  id: number;
  user_id: number;
  session_id: string;
  event: EventType;
  ts: string;
}

export class LogRepository {
  static async create(input: CreateLogInput): Promise<LogRow> {
    //Se nao tiver sessin_id, gera um uuid
    if (!input.session_id) {
      input.session_id = crypto.randomUUID();
    }
    console.log("i got here", input);

    const query = `INSERT INTO logs (user_id, session_id, event, ts)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, user_id, session_id, event, ts`;

    const values = [input.user_id, input.session_id, input.event];

    const result = await pool.query(query, values);

    console.log("i got here result", result.rows);

    return result.rows[0] as unknown as LogRow;
  }

  static async findAdminUserId(): Promise<number | null> {
    const result = await pool.query(
      `SELECT id FROM users WHERE username = $1 LIMIT 1`,
      ["user.admin"]
    );
    if (result.rowCount && result.rows[0]) return Number(result.rows[0].id);
    return null;
  }

  static async findAll(): Promise<LogRow[]> {
    const result = await pool.query(
      `SELECT id, user_id, session_id, event, ts FROM logs ORDER BY ts DESC`
    );
    return result.rows as unknown as LogRow[];
  }

  static async findBySessionId(sessionId: string): Promise<LogRow[]> {
    const result = await pool.query(
      `SELECT id, user_id, session_id, event, ts FROM logs WHERE session_id = $1 ORDER BY ts ASC`,
      [sessionId]
    );
    return result.rows as unknown as LogRow[];
  }

  static async getSessionStats(): Promise<
    Array<{
      session_id: string;
      user_id: number;
      connected_at: string | null;
      disconnected_at: string | null;
      duration_minutes: number | null;
    }>
  > {
    const result = await pool.query(
      `WITH session_stats AS (
         SELECT session_id,
                user_id,
                MIN(CASE WHEN event = 'connected' THEN ts END)  AS connected_at,
                MAX(CASE WHEN event = 'disconnected' THEN ts END) AS disconnected_at
         FROM logs
         GROUP BY session_id, user_id
       )
       SELECT session_id,
              user_id,
              connected_at,
              disconnected_at,
              CASE WHEN disconnected_at IS NOT NULL
                   THEN ROUND(EXTRACT(EPOCH FROM (disconnected_at - connected_at)) / 60.0, 2)
                   ELSE NULL END AS duration_minutes
       FROM session_stats
       ORDER BY connected_at DESC`
    );
    return result.rows as any;
  }

  static async getLogsByYear(year: number): Promise<Array<{ year: number; month: string; duration_hours: string }>> {
    const result = await pool.query(
      `WITH session_stats AS (
         SELECT session_id,
                user_id,
                MIN(CASE WHEN event = 'connected' THEN ts END)  AS connected_at,
                MAX(CASE WHEN event = 'disconnected' THEN ts END) AS disconnected_at
         FROM logs
         GROUP BY session_id, user_id
       ),
       monthly_stats AS (
         SELECT EXTRACT(MONTH FROM connected_at) AS month,
                SUM(EXTRACT(EPOCH FROM (disconnected_at - connected_at))) / 3600.0 AS total_hours
         FROM session_stats
         WHERE connected_at IS NOT NULL
           AND disconnected_at IS NOT NULL
           AND EXTRACT(YEAR FROM connected_at) = $1
         GROUP BY EXTRACT(MONTH FROM connected_at)
       ),
       all_months AS (
         SELECT generate_series(1, 12) AS month
       )
       SELECT am.month::text AS month,
              $1 AS year,
              COALESCE(ROUND(ms.total_hours, 2), 0.00)::text AS duration_hours
       FROM all_months am
       LEFT JOIN monthly_stats ms ON am.month = ms.month
       ORDER BY am.month`,
      [year]
    );
    return result.rows as any;
  }
}
