interface Robot {
  id: string;
  name: string;
  activity: {
    id: string;
    startedAt: Date;
    endedAt: Date;
  }[];
}

export const roombaData = [
  {
    id: "0",
    month: 1, // January
    days: 10,
  },
  {
    id: "2",
    month: 3, // March
    days: 100,
  },
  {
    id: "3",
    month: 4, // April
    days: 5,
  },
  {
    id: "4",
    month: 5, // May
    days: 25,
  },
  {
    id: "5",
    month: 6, // June
    days: 15,
  },
  {
    id: "6",
    month: 7, // July
    days: 12,
  },
];