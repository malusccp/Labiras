export interface Activity {
  id: string;
  startedAt: Date;
  endedAt: Date;
}
export interface ActivityTime {
  id: string;
  month: number;
  days: number;
}

export interface ActiveTimeRegistration {
  id: string;
  //MOnth of registration
  name: string;
  activeTime: string;
  activityHistory: Activity[];
}

export interface Robot {
  id: string;
  name: string;
  activity: ActiveTimeRegistration[];
}
