import { Flex, Text, Spinner } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  ArcElement,
  ChartData,
  ChartOptions,
  Tooltip,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { SensorCard } from "../sensor_card";
import type { ActivityTime } from "../../../../domain/roomba/roombaTypes";
import { useMemo } from "react";
import { useGetLogs } from "../../../../services/hooks/useGetLogs";

ChartJs.register(
  LineController,
  LineElement,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement
);

export function ActivityCard({ year }: { year: string }) {
  const { data: logsData, isLoading, error } = useGetLogs(year);

  // Transform API response to ActivityTime format
  // Convert duration_hours to days (hours / 24)
  const activityData = useMemo<ActivityTime[]>(() => {
    if (!logsData?.data || !Array.isArray(logsData.data)) return [];

    // Create a map to store data by month
    const monthMap = new Map<number, number>();

    logsData.data.forEach((log) => {
      const month = parseInt(log.month, 10);
      const durationHours = parseFloat(log.duration_hours) || 0;
      // Convert hours to days (round to 2 decimal places)
      const days = Math.round((durationHours / 24) * 100) / 100;

      monthMap.set(month, days);
    });

    // Convert to ActivityTime array, filling in missing months with 0 days
    const result: ActivityTime[] = [];
    for (let month = 1; month <= 12; month++) {
      const days = monthMap.get(month) || 0;
      result.push({
        id: `${year}-${month}`,
        month,
        days,
      });
    }

    return result;
  }, [logsData, year]);

  const charData: ChartData<"line"> = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Days Connected",
        data: isLoading ? [] : activityData.map((time) => time.days),
        fill: true,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const option: ChartOptions<"line"> = {
    plugins: {
      // To remove the legend below the title of the toolip
      tooltip: {
        callbacks: {
          label: (item) => `Days Active: ${item.formattedValue}`,
        },
      },
    },
  };

  return (
    <SensorCard title="Atividade">
      <Flex
        flex={1}
        textAlign={"center"}
        justifyContent="center"
        alignItems="center"
      >
        {isLoading ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            gap="2rem"
            flexDirection="column"
          >
            <Text fontSize="xl" fontWeight="bold">
              Carregando dados...
            </Text>
            <Spinner size="lg" />
          </Flex>
        ) : error ? (
          <Text color="red.400" fontSize="xl">
            Erro ao carregar dados:{" "}
            {error instanceof Error ? error.message : "Erro desconhecido"}
          </Text>
        ) : (
          <Line width={"0.09%"} data={charData} options={option} />
        )}
      </Flex>
    </SensorCard>
  );
}
