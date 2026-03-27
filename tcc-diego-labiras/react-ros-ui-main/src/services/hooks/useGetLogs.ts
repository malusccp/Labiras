import { useQuery } from "@tanstack/react-query";
import api from "../../axios/api";
import { ApiRequest } from "../../domain/api/types";

export const useGetLogs = (year: string) => {
  return useQuery({
    queryFn: async () => {
      const response = await api.get<
        ApiRequest<
          {
            month: string;
            year: string;
            duration_hours: string;
          }[]
        >
      >(`/logs/year?year=${year}`);
      return response.data;
    },
    queryKey: ["logs", year],
  });
};
