import { Flex, Square, Text } from "@chakra-ui/react";

interface SubtitleProps {
  children: React.ReactNode;
  color: string;
}

export function Subtitle({ children, color }: SubtitleProps) {
  return (
    <Flex
      w={"100%"}
      // height={"100%"}
      justifyContent={"start"}
      alignItems={"center"}
      textAlign={"start"}
      gap={".5rem"}
    >
      <Square
        size={{ base: "15px", lg: "20px" }}
        bg={color}
        borderColor={"myBlack.100"}
        borderWidth={1}
      />
      <Text fontSize={{ base: 13, lg: 16 }}>{children}</Text>
    </Flex>
  );
}
