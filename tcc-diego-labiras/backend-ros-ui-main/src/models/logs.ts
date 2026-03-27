import { EventType } from "./enums/eventType";

export class Log {
  id: string;
  user_id: string;
  session_id: string;
  event: EventType;
  ts: string;

  constructor(
    id: string,
    user_id: string,
    session_id: string,
    event: EventType,
    ts: string
  ) {
    this.id = id;
    this.user_id = user_id;
    this.session_id = session_id;
    this.event = event;
    this.ts = ts;
  }

  static fromDb(data: any): Log {
    return new Log(data.id, data.user_id, data.session_id, data.event, data.ts);
  }

  static allFromDb(data: any[]): Log[] {
    return data.map(Log.fromDb);
  }
}
