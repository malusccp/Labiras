import { Stack, Text, type StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface SensorCardProps extends StackProps {
  title: string;
  children: ReactNode;
}

export function SensorCard({ title, children, ...rest }: SensorCardProps) {
  return (
    <Stack w={"100%"} h={"100%"} p={".6rem"} {...rest}>
      <Text
        w={"100%"}
        marginLeft={".6rem"}
        // marginTop={".5rem"}
        textAlign={"start"}
        fontSize={{ base: "1xl", lg: "2xl" }}
        size={"lg"}
      >
        {title}
      </Text>
      {children}
    </Stack>
  );
}
