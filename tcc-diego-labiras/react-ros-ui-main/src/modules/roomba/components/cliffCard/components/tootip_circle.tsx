import { useMemo } from "react";
import { CliffSensors } from "../../../../../domain/roomba/roombaTypes/cliff";
import { Circle, Tooltip } from "@chakra-ui/react";

interface TooltipCircleProps {
  cliffSensorsDependecy: CliffSensors;
  cliffSensor: boolean;
  name: string;
}

export function TooltipCircle({
  cliffSensorsDependecy,
  cliffSensor,
  name,
}: TooltipCircleProps) {
  const backgroundColor = useMemo(() => {
    return cliffSensor ? "myGreen.200" : "myRed.400";
  }, [cliffSensorsDependecy]);

  return (
    <Tooltip label={name} hasArrow>
      <Circle
        size={4}
        bgColor={backgroundColor}
        _hover={{ transform: "scale(1.05)" }}
        transform={"transition 2s"}
      />
    </Tooltip>
  );
}
