import { Stack, Center, Box, Text } from "@chakra-ui/react";
import { Header } from "../roomba/header";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRos } from "../../shared/contexts/ros/ros_hook";
import { mockBigJson } from "../../shared/fakeSates/fake_canva_topic";
import { fakeRoombaTopics } from "../../shared/fakeSates/fake_roomba_topics";

export function RobotsTopic() {
  const { path = "" } = useParams();
  const location = useLocation() as { state?: { topicNumber?: number } };
  const topicNumber = location.state?.topicNumber;

  const { isConnected, topics, createListener } = useRos();

  const [latestMessage, setLatestMessage] = useState<any>();
  const decodedPath = decodeURIComponent(path);

  const topic = useMemo(() => {
    return topics.find((t) => t.path === decodedPath);
  }, [topics, path]);

  useEffect(() => {
    if (!isConnected || !topic) return;
    const listener = createListener(topic);
    listener.subscribe((message: any) => {
      setLatestMessage(message);
    });
    return () => {
      try {
        listener.unsubscribe();
      } catch {}
    };
  }, [isConnected, topic, createListener]);

  const pageTitle = `Tópico ${topicNumber}`;

  return (
    <Stack p={".6rem"} color={"myWhite.100"} gap={".6rem"}>
      <Header>{pageTitle}</Header>
      <Box padding={".3rem"}>
        <Text>URL do tópico: {decodedPath}</Text>
      </Box>

      <Center>
        <Box
          borderRadius={"md"}
          backgroundColor={"myBlack.300"}
          p={".6rem"}
          w={{ base: "100%", md: "100%" }}
          maxW={{ base: "100%", md: "container.md", lg: "container.lg" }}
          minH={{ base: "50vh", md: "60vh" }}
          maxH={{ base: "70vh", md: "70vh" }}
          overflowY="scroll"
        >
          {topic && (
            <Box
              as="pre"
              m={0}
              color={"myWhite.100"}
              fontFamily="mono"
              fontSize="sm"
              whiteSpace="pre-wrap"
              wordBreak="break-word"
            >
              {latestMessage
                ? JSON.stringify(latestMessage, null, 2)
                : "Waiting for messages..."}
            </Box>
          )}
          {!topic && (
            <Text pt={".6rem"} color={"myWhite.200"}>
              Topic not found or not connected.
            </Text>
          )}
        </Box>
      </Center>
    </Stack>
  );
}
