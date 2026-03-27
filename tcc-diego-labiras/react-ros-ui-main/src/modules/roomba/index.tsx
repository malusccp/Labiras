import {
  Button,
  Center,
  Grid,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import { useCallback, useEffect, useRef, useState } from "react";
import { RobotBattery } from "../../domain/roomba/roombaTypes/battery";
import { BumperSensors } from "../../domain/roomba/roombaTypes/bumper";
import { ChargingState } from "../../domain/roomba/roombaTypes/chargingState";
import { WheelSensors } from "../../domain/roomba/roombaTypes/wheels";
import { createMessageClassByType } from "../../utils/handleMessageClassByType";
import { SmallCard } from "./components/Small_card";
import { BatteryCard } from "./components/batteryCard";
import { BumperCard } from "./components/bumperCard";
import { WheelsCard } from "./components/wheelsCard";
import { CliffSensors } from "../../domain/roomba/roombaTypes/cliff";
import { CliffCard } from "./components/cliffCard";
import { Item } from "./components/grid_item";
import { ActivityCard } from "./components/activityCard";
import { useVizualizationTypeStore } from "../../stores/useVizualizationTypeStore";
import { Logs } from "./components/Logs";
import { useRos } from "../../shared/contexts/ros/ros_hook";
import { blockedTopic } from "../../utils/blockedTopics";
import { fakeRoombaTopics } from "../../shared/fakeSates/fake_roomba_topics";
// Inicialmente eu vou considerar só um robo,
//mas posteriormente eu devo salvar em um banco quais os
// tópicos que o robô deve escutar, assim, por meio do id
// dele eu sei quais tópicos eu devo começar a ouvir e pegar
// seu estado.
type AllMessages = {
  battery: RobotBattery;
  bumper: BumperSensors;
  chargingState: ChargingState;
  cliff: CliffSensors;
  wheels: WheelSensors;
};
export function Roomba() {
  const { isConnected, topics, createListener } = useRos();
  const [allMessages, setAllMessages] = useState<AllMessages>(fakeRoombaTopics);
  // const [allMessages, setAllMessages] = useState<AllMessages>(
  //   {} as AllMessages
  // );
  const [selectedYear, setSelectedYear] = useState<string>("2025");

  const navigate = useNavigate();
  const listenersRef = useRef<ROSLIB.Topic<any>[]>([]);

  const handleNewMessage = useCallback((topicMessage: any) => {
    if (topicMessage instanceof RobotBattery) {
      setAllMessages((oldMessage) => ({
        ...oldMessage,
        battery: topicMessage,
      }));
    }
    if (topicMessage instanceof BumperSensors) {
      setAllMessages((oldMessage) => ({ ...oldMessage, bumper: topicMessage }));
    }
    if (topicMessage instanceof ChargingState) {
      setAllMessages((oldMessage) => ({
        ...oldMessage,
        chargingState: topicMessage,
      }));
    }
    if (topicMessage instanceof CliffSensors) {
      setAllMessages((oldMessage) => ({ ...oldMessage, cliff: topicMessage }));
    }
    if (topicMessage instanceof WheelSensors) {
      setAllMessages((oldMessage) => ({ ...oldMessage, wheels: topicMessage }));
    }
  }, []);

  useEffect(() => {
    if (isConnected && topics.length > 0) {
      // reset local listeners and subscribe to current topics
      listenersRef.current = [];
      topics.forEach((topic) => {
        if (blockedTopic(topic.path)) return;

        const listener = createListener(topic);
        listener.subscribe((message) => {
          const classMessage = createMessageClassByType(
            message,
            topic.messageType
          );
          handleNewMessage(classMessage);
        });
        listenersRef.current.push(listener);
      });
    }

    return () => {
      // unsubscribe exactly the listeners created in this component
      listenersRef.current.forEach((listener) => {
        try {
          listener.unsubscribe();
        } catch {}
      });
      listenersRef.current = [];

      console.log("the return for unsubscribe were called");
    };
  }, [isConnected, topics]);

  const vizualizationType = useVizualizationTypeStore();

  if (vizualizationType.vizualizationType === "logs") {
    return <Logs />;
  }

  return (
    <Stack p={".6rem"} color={"myWhite.100"} gap={".6rem"}>
      <Header>Roomba</Header>
      {isConnected && (
        <Center
          justifyContent={"space-between"}
          backgroundColor={"myBlack.300"}
          p={".6rem"}
          borderRadius={"lg"}
        >
          <Text>
            O robô está conectado, abra a página de controle para movimentá-lo.
          </Text>
          <Button
            onClick={() => navigate("/roomba/control")}
            color={"myWhite.200"}
            // backgroundColor={"myBlack.200"}
            backgroundColor={"myBlue.50"}
            alignSelf="start"
          >
            Página de controle
          </Button>
        </Center>
      )}
      <Grid
        templateColumns={{
          base: "repeat(3, 1fr)",
          md: "calc(85% - .6rem) calc(15% - .6rem)",
          lg: "calc(90% - .6rem) calc(10% - .6rem)",
        }}
        gap={".6rem"}
        templateRows={"repeat(3, 1fr)"}
        justifyContent={"center"}
      >
        <Item rowSpan={3} colSpan={{ base: 3, md: 1 }} position={"relative"}>
          <ActivityCard year={selectedYear} />
          <Select
            position={"absolute"}
            top={".6rem"}
            right={".6rem"}
            w={"100px"}
            h={"30px"}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </Select>
        </Item>
        <Item rowSpan={1}>
          <SmallCard
            title="Temperature"
            // color={
            //   allMessages.battery?.temperature > 70
            //     ? "myBlack.300"
            //     : "myWhite.100"
            // }
            backgroundColor={
              allMessages.battery?.temperature > 70 ? "myRed.400" : "myBlue.100"
            }
          >
            {allMessages.battery?.temperature}°C
          </SmallCard>
        </Item>
        <Item rowSpan={1}>
          <SmallCard title="Current" backgroundColor={"myGreen.200"}>
            {allMessages.battery?.current}A
          </SmallCard>
        </Item>
        <Item rowSpan={1}>
          <SmallCard title="Voltage" backgroundColor={"myYellow.100"}>
            {allMessages.battery?.voltage}V
          </SmallCard>
        </Item>
      </Grid>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "calc(60% - .6rem) calc(40% - .6rem)",
        }}
        gap={".6rem"}
        templateRows={"repeat(3, 1fr)"}
        justifyContent={"center"}
      >
        <Item rowSpan={3}>
          <CliffCard cliffSensors={allMessages.cliff} />
        </Item>
        <Item rowSpan={3}>
          <BatteryCard
            charge={allMessages.battery?.charge}
            total={allMessages.battery?.capacity}
          />
        </Item>
      </Grid>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "calc(50% - .6rem) calc(50% - .6rem)",
        }}
        templateRows={"repeat(3, 1fr)"}
        gap={".6rem"}
        justifyContent={"center"}
      >
        <Item rowSpan={3}>
          <BumperCard bumperSensors={allMessages?.bumper} />
        </Item>
        <Item rowSpan={3}>
          <WheelsCard wheelsSensors={allMessages?.wheels} />
        </Item>
      </Grid>
    </Stack>
  );
}
