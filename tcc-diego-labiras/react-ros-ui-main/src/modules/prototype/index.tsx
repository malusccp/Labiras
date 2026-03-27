import { useContext, useEffect, useState } from "react";
import { ROSContext } from "../../shared/contexts/ros/ros_context";
import { Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { GridCard } from "./components";
import { createMessageClassByType } from "../../utils/handleMessageClassByType";
import { RobotBattery } from "../../domain/roomba/roombaTypes/battery";
import { BumperSensors } from "../../domain/roomba/roombaTypes/bumper";
import { ChargingState } from "../../domain/roomba/roombaTypes/chargingState";
import { CliffSensors } from "../../domain/roomba/roombaTypes/cliff";
import { WheelSensors } from "../../domain/roomba/roombaTypes/wheels";

interface RobotTopicsMessages {
  battery: RobotBattery;
  bumper: BumperSensors;
  chargingState: ChargingState;
  cliff: CliffSensors;
  wheels: WheelSensors;
}

export function Prototype() {
  const { ros, isConnected, topics, listeners, createListener } =
    useContext(ROSContext);

  const [allMessages, setAllMessages] = useState({} as RobotTopicsMessages);

  const handleNewMessage = (topicMessage: any) => {
    if (topicMessage instanceof RobotBattery) {
      setAllMessages((oldMessage) => ({ ...oldMessage, battery: topicMessage }))
    }
    if (topicMessage instanceof BumperSensors) {
      setAllMessages((oldMessage) => ({ ...oldMessage, bumper: topicMessage }))
    }
    if (topicMessage instanceof ChargingState) {
      setAllMessages((oldMessage) => ({ ...oldMessage, chargingState: topicMessage }))
    }
    if (topicMessage instanceof CliffSensors) {
      setAllMessages((oldMessage) => ({ ...oldMessage, cliff: topicMessage }))
    }
    if (topicMessage instanceof WheelSensors) {
      setAllMessages((oldMessage) => ({ ...oldMessage, wheels: topicMessage }))
    }
  };

  useEffect(() => {
    if (isConnected) {
      if (topics.length > 0) {
        topics.forEach((topic) => {
          
          const newListener = createListener(topic);

          newListener.subscribe((message) => {

            const classMessage = createMessageClassByType(message, topic.messageType);

            handleNewMessage(classMessage);

          });
        });
      }
    }
  }, [isConnected, topics]);

  // useEffect(() => {
  //   ros.getTopics((result) => {
  //     console.log(result.topics);
  //   });
  // }, [ros]);

  return (
    <Stack style={{ color: "#FFFFFF" }} w={"100%"} height={"100%"}>
      <Grid
        w={"100%"}
        height={"100%"}
        templateColumns={"repeat(3, 1fr)"}
        p={"3rem"}
        gap={5}
      >
        <GridCard>
          <Heading marginBottom={"1rem"}>Battery</Heading>
          {/* <Text> Battery Header: {allMessages.battery?.header}</Text> */}
          <Text> Battery Voltage: {allMessages.battery?.voltage}</Text>
          <Text> Battery Current: {allMessages.battery?.current}</Text>
          <Text> Battery Temperature: {allMessages.battery?.temperature}</Text>
          <Text> Battery Charge: {allMessages.battery?.charge}</Text>
          <Text> Battery Capacity: {allMessages.battery?.capacity}</Text>
        </GridCard>
        <GridCard>
          <Heading marginBottom={"1rem"}>Bumper</Heading>
          <Text>
            Bumper Light Left: {allMessages.bumper?.is_light_left.toString()}
          </Text>
          <Text>
            Bumper Light Front Left:
            {allMessages.bumper?.is_light_front_left.toString()}
          </Text>
          <Text>
            Bumper Light Center Left:
            {allMessages.bumper?.is_light_center_left.toString()}
          </Text>
          <Text>
            Bumper Light Center Right:
            {allMessages.bumper?.is_light_center_right.toString()}
          </Text>
          <Text>
            Bumper Light Front Right:
            {allMessages.bumper?.is_light_front_right.toString()}
          </Text>
          <Text>
            Bumper Light Right: {allMessages.bumper?.is_light_right.toString()}
          </Text>
        </GridCard>
        <GridCard>
          <Heading marginBottom={"1rem"}>Charging State</Heading>
          {/* <Text>Charging State Header: {allMessages.chargingState?.header}</Text> */}
          <Text> Charging State: {allMessages.chargingState?.state}</Text>
        </GridCard>
        <GridCard>
          <Heading marginBottom={"1rem"}>Cliff</Heading>
          {/* <Text> Cliff Header: {allMessages.cliff?.header}</Text> */}
          <Text>
            Cliff Front Left: {allMessages.cliff?.is_cliff_front_left.toString()}
          </Text>
          <Text>
            Cliff Left: {allMessages.cliff?.is_cliff_front_left.toString()}
          </Text>
          <Text>
            Cliff Right: {allMessages.cliff?.is_cliff_right.toString()}
          </Text>
          <Text>
            Cliff Front Right:
            {allMessages.cliff?.is_cliff_front_right.toString()}
          </Text>
        </GridCard>
        <GridCard>
          <Heading marginBottom={"1rem"}>Rodas</Heading>
          {/* <Text> Wheels Header: {allMessages.wheels?.header}</Text> */}
          <Text>
            Wheels Drop Left: {allMessages.wheels?.drop_left.toString()}
          </Text>
          <Text>
            Wheels Encoder Counts Left: {allMessages.wheels?.encoder_counts_left}
          </Text>
          <Text> Wheels Velocity Left: {allMessages.wheels?.velocity_left}</Text>
          <Text>
            Wheels Drop Right: {allMessages.wheels?.drop_right.toString()}
          </Text>
          <Text>
            Wheels Encoder Counts Right:
            {allMessages.wheels?.encoder_counts_right}
          </Text>
          <Text>
            Wheels Velocity Right: {allMessages.wheels?.velocity_right}
          </Text>
        </GridCard>
      </Grid>
    </Stack>
  );
}
