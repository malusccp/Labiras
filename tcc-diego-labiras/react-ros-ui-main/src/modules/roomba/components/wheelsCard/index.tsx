import { Flex, Stack } from "@chakra-ui/react";
import { WheelSensors } from "../../../../domain/roomba/roombaTypes/wheels";
import { Subtitle } from "../../../../shared/components/Subtitles";
import { DropWheels } from "./components/Drop_wheels";
import { VelocityCard } from "./components/Velocity_card";
import { SensorCard } from "../sensor_card";

interface WheelsCardProps {
  wheelsSensors: WheelSensors;
}

export function WheelsCard({ wheelsSensors }: WheelsCardProps) {
  return (
    <SensorCard title="Rodas">
      <Stack justifyContent={"space-around"} h={"full"} px={{base: "none", md: "3%"}}>
        <Flex justifyContent={"space-around"} alignItems={"center"} gap={"1rem"}>
            <DropWheels
              height={"100%"}
              drop_left={wheelsSensors?.drop_left}
              drop_right={wheelsSensors?.drop_right}
              flex={1}
            />
          <Stack justifyContent={"space-around"} height={"100%"}>
            <Subtitle color="myGreen.100">True</Subtitle>
            <Subtitle color="myRed.400">False</Subtitle>
          </Stack>
        </Flex>
        <Flex justifyContent={"space-around"} gap={".2rem"}>
          <VelocityCard
            encounderCounts={wheelsSensors?.encoder_counts_left}
            velocity={wheelsSensors?.velocity_left}
          />
          <VelocityCard
            encounderCounts={wheelsSensors?.encoder_counts_right}
            velocity={wheelsSensors?.velocity_right}
          />
        </Flex>
      </Stack>
    </SensorCard>
  );
}
