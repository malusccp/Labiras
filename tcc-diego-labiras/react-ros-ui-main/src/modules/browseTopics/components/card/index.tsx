import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface ITopicCard {
  path: string;
  messageType: string;
  index: number;
}

export const TopicCard = ({ path, messageType, index }: ITopicCard) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/robots/${encodeURIComponent(path)}`, {
      state: { topicNumber: index },
    });
  };

  return (
    <Card
      backgroundColor={"myBlack.300"}
      color={"myWhite.100"}
      transition="transform 0.2s"
      _hover={{
        transform: "scale(1.03)",
      }}
      onClick={handleNavigate}
    >
      <CardHeader>
        <Heading size="md">Tópico {index}</Heading>
      </CardHeader>
      <CardBody>
        <div>
          <Text color={"white"}>Path:</Text>
          <Text>{path}</Text>
        </div>
        <div>
          <Text pt={2} color={"white"}>
            Tipo de Mesagem:
          </Text>
          <Text>{messageType}</Text>
        </div>
      </CardBody>
    </Card>
  );
};
