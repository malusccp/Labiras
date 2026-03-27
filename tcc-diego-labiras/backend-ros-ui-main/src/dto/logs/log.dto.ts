import { EventType } from "../../models/enums/eventType";

export interface CreateLogInput {
    user_id: number;
    session_id?: string;
    event: EventType;
    ts: string;
  }

// export interface UpdateLogBySessionIdInput {
//     user_id: number;
//     session_id?: string;
//     event: EventType;
//     ts?: string | null;
//   }
  
export class LogDto {
  session_id?: string;
  event: EventType;
  ts: string;

  constructor(event: EventType, ts: string, session_id?: string) {
    this.session_id = session_id;
    this.event = event;
    this.ts = ts;
  }

  createLog(userId: string) {
    return { ...this, user_id: userId } as unknown as CreateLogInput;
  }
}
