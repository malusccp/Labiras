import { Log } from "../models/logs";

export interface ActiviveTimeFromLog {
  id: string;
  month: number;
  days: number;
}

export async function logConverter(logs: Log[]) {
  const activeDaysFromLog: ActiviveTimeFromLog[] = [];

  logs.forEach((log) => {
    const month = new Date(log.startedAt).getMonth();

    const oldActiveTime = activeDaysFromLog[month]?.days || 0;

    activeDaysFromLog[month] = {
      id: month.toString(),
      month,
      days: oldActiveTime + 1,
    };
  });

  activeDaysFromLog.map((log, index) => {
    if (!log) {
      activeDaysFromLog[index] = {
        id: index.toString(),
        month: index,
        days: 0,
      };
      return;
    }

    return log;
  });

  console.log("active days from log", activeDaysFromLog);

  return activeDaysFromLog;
}
