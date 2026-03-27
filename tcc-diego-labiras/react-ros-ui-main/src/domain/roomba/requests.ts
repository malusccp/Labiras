import axios from "../../axios/api";
import { ApiRequest } from "../api/types";
import { ActivityTime } from "./roombaTypes/robot";

export async function getActiveTime(): Promise<ApiRequest<ActivityTime[]>> {
  const response = await axios.get("/logs/active-time");

  const data: ApiRequest<ActivityTime[]> = response.data;

  return data;
}
