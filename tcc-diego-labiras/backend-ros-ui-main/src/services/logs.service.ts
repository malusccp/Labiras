import { CreateLogInput, LogDto } from "../dto/logs/log.dto";
import { AppError } from "../errors/app.error";
import { LogRepository, LogRow } from "../repository/log.repository";

export class LogService {
  static async createLog(logData: LogDto): Promise<LogRow> {
    const adminId = await LogRepository.findAdminUserId();

    if (!adminId) {
      throw new AppError("Admin não encontrado. Execute as seeds.", 500);
    }

    const logRecord: CreateLogInput = {
      user_id: adminId,
      session_id: logData.session_id,
      event: logData.event,
      ts: logData.ts || new Date().toISOString(),
    };

    console.log("i got here logRecord", logRecord);

    // Validar se a sessão já tem 2 logs. Log de Desconexão já criado.
    if (logData.session_id) {
      const logs = await LogRepository.findBySessionId(logData.session_id);
      console.log("i have a session id");

      if (logs.length >= 2) {
        throw new AppError(
          "Sessão já tem 2 logs. Log de Desconexão já criado.",
          400
        );
      }
    }

    return (await LogRepository.create(logRecord)) as unknown as LogRow;
  }

  static async getSessionStats() {
    return await LogRepository.getSessionStats();
  }

  static async getAll() {
    return await LogRepository.findAll();
  }

  static async getLogsBySessionId(sessionId: string) {
    return await LogRepository.findBySessionId(sessionId);
  }

  static async getLogsByYear(year: number) {
    return await LogRepository.getLogsByYear(year);
  }
}
