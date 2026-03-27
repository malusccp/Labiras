import { Flex, Stack } from "@chakra-ui/react";
import { CliffSensors } from "../../../../domain/roomba/roombaTypes/cliff";
import { SensorCard } from "../sensor_card";
import { Subtitle } from "../../../../shared/components/Subtitles";
import { TooltipCircle } from "./components/tootip_circle";
interface CliffCardProps {
  cliffSensors: CliffSensors;
}
export function CliffCard({ cliffSensors }: CliffCardProps) {
  return (
    <SensorCard title="Inclinação">
      <Flex justifyContent={"space-around"} mt={"2.5rem"}>
        <Flex
          width={"70%"}
          h={2}
          bgColor={"myWhite.100"}
          alignItems={"center"}
          justifyContent={"space-around"}
          borderRadius={"rounded"}
        >
          <TooltipCircle
            name="Cliff front left"
            cliffSensorsDependecy={cliffSensors}
            cliffSensor={cliffSensors?.is_cliff_front_left}
          />
          <TooltipCircle
            name="Cliff left"
            cliffSensorsDependecy={cliffSensors}
            cliffSensor={cliffSensors?.is_cliff_left}
          />
          <TooltipCircle
            cliffSensorsDependecy={cliffSensors}
            cliffSensor={cliffSensors?.is_cliff_right}
            name="Cliff right"
          />
          <TooltipCircle
            cliffSensorsDependecy={cliffSensors}
            cliffSensor={cliffSensors?.is_cliff_front_right}
            name="Cliff front right"
          />
        </Flex>
        <Stack
          // alignContent={"flex-start"}
          justifyContent={""}
          // h={"100%"}
          // py={".1rem"}
        >
          <Subtitle color="myGreen.100">True</Subtitle>
          <Subtitle color="myRed.400">False</Subtitle>
        </Stack>
      </Flex>
    </SensorCard>
    //  <Flex
    //     w={"75%"}
    //     height={"80%"}
    //     backgroundColor={"red"}
    //     // paddingTop={"10rem"}
    //     alignItems={"start"}
    //     justifyContent={"center"}
    //   >
    //     <Flex w={"95%"} h={"40%"} backgroundColor={"blue"} borderBottomRadius={"100px"} p={".2rem"}/>
    //   </Flex>
    //   <Stack
    //     w={"25%"}
    //     alignContent={"flex-start"}
    //     justifyContent={"flex-start"}
    //     h={"80%"}
    //     py={".1rem"}
    //   >
    //     <Subtitle color="myGreen.100">True</Subtitle>
    //     <Subtitle color="myRed.400">False</Subtitle>
    //   </Stack>
    // </Flex>
  );
}
