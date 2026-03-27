import { SimpleGrid, Stack } from "@chakra-ui/react";
import { useRos } from "../../shared/contexts/ros/ros_hook";
import { Header } from "../roomba/header";
import { TopicCard } from "./components/card";
import { RobotsState } from "../../shared/fakeSates/robots";

// Inicialmente eu vou considerar só um robo,
//mas posteriormente eu devo salvar em um banco quais os
// tópicos que o robô deve escutar, assim, por meio do id
// dele eu sei quais tópicos eu devo começar a ouvir e pegar
// seu estado.

export function BrowseTopics() {
  // const { topics } = useRos();

  const topics = RobotsState.flatMap((robot) => robot.topics);

  return (
    <Stack p={".6rem"} color={"myWhite.100"} gap={".6rem"}>
      <Header>Tópicos Conectados</Header>
      <SimpleGrid
        templateColumns={"repeat(3, 1fr)"}
        spacing={4}
      >
        {topics.map((topic, index) => (
          <TopicCard
            key={index}
            index={index}
            messageType={topic.messageType}
            path={topic.path}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
