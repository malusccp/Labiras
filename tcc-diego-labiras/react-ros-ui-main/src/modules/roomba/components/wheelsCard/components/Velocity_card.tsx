import { Flex, Circle, Box, Text } from "@chakra-ui/react";

interface IVelocityCardProps {
  velocity?: number;
  encounderCounts?: number;
}

export function VelocityCard({
  velocity,
  encounderCounts,
}: IVelocityCardProps) {
  return (
    <Flex
      alignItems={"center"}
      justify={"space-around"}
      flex={1}
      p={1}
      bgColor={"myBlack.200"}
      borderRadius={"lg"}
      _hover={{ bg: "#7C7C7C", transition: ".3s" }}
      // minH={"50px"}
    >
      <Circle
        size={{ sm: 8, md: 10 }}
        borderColor={"myWhite.100"}
        borderWidth={"1px"}
        flexDir={"column"}
        // alignItems={"center"}
        fontSize={{ base: "8px", md: "11px" }}
        p={2}
      >
        <Box>{velocity}</Box>
        <Box>m/s</Box>
      </Circle>

      <Text fontSize={{ base: "10px", md: "13px" }}>
        {encounderCounts} passos
      </Text>
    </Flex>
  );
}
