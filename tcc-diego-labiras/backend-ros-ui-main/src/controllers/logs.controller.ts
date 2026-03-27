import { FastifyRequest, FastifyReply } from "fastify";
import { AppError, DatabaseError } from "../errors/app.error";
import { LogService } from "../services/logs.service";
import { LogDto } from "../dto/logs/log.dto";
import { EventType } from "../models/enums/eventType";

export async function getLogs(req: FastifyRequest, res: FastifyReply) {
  try {
    const logs = await LogService.getAll();
    res.send({
      message: "Logs encontrados com sucesso",
      status: 200,
      data: logs,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.code(error.statusCode).send({
        status: error.statusCode,
        message: error.message,
      });
    } else {
      res.code(500).send({
        status: 500,
        message: "Um erro desconhecido ocorreu ao buscar os logs",
      });
    }
  }
}

export async function getActiveTime(req: FastifyRequest, res: FastifyReply) {
  try {
    const stats = await LogService.getSessionStats();
    res.send({
      message: "Logs encontrados com sucesso",
      status: 200,
      data: stats,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.code(error.statusCode).send({
        status: error.statusCode,
        message: error.message,
      });
    } else {
      res.code(500).send({
        status: 500,
        message: "Um erro desconhecido ocorreu ao buscar os logs",
      });
    }
  }
}

export async function createLog(req: FastifyRequest, res: FastifyReply) {
  try {
    const body = (req.body ?? {}) as {
      session_id?: string;
      event?: EventType;
      ts?: string;
    };

    if (!body.session_id || !body.event) {
      return res.code(400).send({
        status: 400,
        message: "session_id e event são obrigatórios",
      });
    }
    if (!["connected", "disconnected"].includes(body.event)) {
      return res.code(400).send({
        status: 400,
        message: "event deve ser 'connected' ou 'disconnected'",
      });
    }

    const newId = await LogService.createLog({
      session_id: body.session_id,
      event: body.event,
      ts: body.ts,
    } as any);

    return res.send({
      message: "Registro de conexão criado com sucesso",
      status: 201,
      data: newId,
    });
  } catch (error) {
    if (error instanceof DatabaseError) {
      return res.code(error.statusCode).send({
        status: error.statusCode,
        message: error.message,
      });
    }
    if (error instanceof AppError) {
      return res.code(500).send({
        status: 500,
        message: error.message,
      });
    }
    return res.code(500).send({
      status: 500,
      message: "Um erro desconhecido ocorreu ao criar o log",
    });
  }
}

export class LogController {
  static async createLog(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { session_id, event, ts } = request.body as LogDto;
      const log = await LogService.createLog({
        session_id,
        event,
        ts,
      } as any);

      return reply.code(201).send({
        success: true,
        message: "Log criado com sucesso",
        data: log,
      });
    } catch (error: any) {
      return reply.code(400).send({
        success: false,
        message: error?.message ?? "Erro ao criar log",
      });
    }
  }

  static async getAllLogs(request: FastifyRequest, reply: FastifyReply) {
    try {
      const logs = await LogService.getAll();

      return reply.send({
        success: true,
        message: "Logs retrieved successfully",
        data: logs,
      });
    } catch (error: any) {
      return reply.code(500).send({
        success: false,
        message: error?.message ?? "Erro ao buscar logs",
      });
    }
  }

  static async getLogsBySessionId(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { sessionId } = request.params as { sessionId: string };
      const logs = await LogService.getLogsBySessionId(sessionId);

      return reply.send({
        success: true,
        message: "Session logs retrieved successfully",
        data: logs,
      });
    } catch (error: any) {
      return reply.code(500).send({
        success: false,
        message: error?.message ?? "Erro ao buscar logs da sessão",
      });
    }
  }

  static async getSessionStats(request: FastifyRequest, reply: FastifyReply) {
    try {
      const stats = await LogService.getSessionStats();

      return reply.send({
        success: true,
        message: "Session statistics retrieved successfully",
        data: stats,
      });
    } catch (error: any) {
      return reply.code(500).send({
        success: false,
        message: error?.message ?? "Erro ao buscar estatísticas",
      });
    }
  }

  static async getLogsByYear(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { year } = request.query as { year: string };

      if (!year || isNaN(Number(year))) {
        return reply.code(400).send({
          success: false,
          message: "Year parameter is required and must be a valid number",
        });
      }

      const yearNumber = Number(year);
      const stats = await LogService.getLogsByYear(yearNumber);

      return reply.send({
        success: true,
        message: "Yearly log statistics retrieved successfully",
        data: stats,
      });
    } catch (error: any) {
      return reply.code(500).send({
        success: false,
        message: error?.message ?? "Erro ao buscar estatísticas anuais",
      });
    }
  }
}
