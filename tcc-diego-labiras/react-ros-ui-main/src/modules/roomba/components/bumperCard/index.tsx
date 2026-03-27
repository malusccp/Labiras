import { Box, Flex, Stack } from "@chakra-ui/react";
import { BumperSensors } from "../../../../domain/roomba/roombaTypes/bumper";
import { Doughnut } from "react-chartjs-2";
import { FormatLabel } from "../../../../utils/formattedLabel";
import {
  Chart as ChartJs,
  ArcElement,
  ChartData,
  ChartOptions,
  Tooltip,
} from "chart.js";
import { SensorCard } from "../sensor_card";
import { Subtitle } from "../../../../shared/components/Subtitles";

interface BumperCardProps {
  bumperSensors?: BumperSensors;
}

ChartJs.register(ArcElement, Tooltip);

export function BumperCard({ bumperSensors }: BumperCardProps) {
  const labels = !bumperSensors
    ? []
    : bumperSensors?.labeledData.map((bumper) => FormatLabel(bumper.name));

  const colors: string[] = !bumperSensors
    ? []
    : bumperSensors?.labeledData.map((bumper) => {
        return bumper.state ? "#64A15F" : "#b70922";
      });

  const chartData: ChartData<"doughnut", boolean[]> = {
    labels: [...labels],
    datasets: [
      {
        data: [true, true, true, true, true, true],
        backgroundColor: [...colors],
        borderColor: "myBlack.100",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
        fullSize: true,
      },
      colors: {
        enabled: true,
        forceOverride: true,
      },
      tooltip: {
        // To remove the legend below the title of the toolip
        callbacks: { label: () => "" },
      },
      title: {
        display: false,
        text: "Doughnut Chart",
        color: "red",
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <SensorCard title="Bumper">
      <Flex justifyContent={"space-around"}>
        <Box w={{ base: "55%", sm: "50%" }} alignContent={"center"}>
          <Doughnut data={chartData} options={options} />
        </Box>
        <Stack
          // alignContent={"flex-start"}
          justifyContent={"start"}
          // h={"100%"}
          // py={".1rem"}
        >
          <Subtitle color="myGreen.100">True</Subtitle>
          <Subtitle color="myRed.400">False</Subtitle>
        </Stack>
      </Flex>
    </SensorCard>
  );
}
