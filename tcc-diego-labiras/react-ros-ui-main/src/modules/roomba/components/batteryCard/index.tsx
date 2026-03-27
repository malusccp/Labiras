import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
interface BatteryCardProps {
  total?: number;
  charge?: number;
}

export function BatteryCard({ total, charge }: BatteryCardProps) {
  const percentage = useMemo(() => {
    if (!total || !charge) {
      return 0;
    }

    const percentage = (charge / total) * 100;

    return Number(percentage.toFixed());
  }, [total, charge]);

  return (
    <Stack
      w={"100%"}
      h={"100%"}
      py={".3rem"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={"1rem"}
    >
      <Text fontSize={{ base: "1xl", lg: "2xl" }}>Progresso</Text>
      <Box
        w={"35%"}
        h={"100%"}
        color={"myWhite.100"}
        borderRadius={"20px"}
        _hover={{ transform: "scale(1.03)" }}
        transform={"transition 2s"}
        textAlign={"center"}
      >

        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: percentage < 30 ? "#FF0000" : "#64A15F",
            textColor: "#ffffff",
            pathTransitionDuration: 0.5,
            trailColor: "#CDCCCD"
          })}
        />

      </Box>
      <Flex w={"100%"} justifyContent={"space-around"} p={".4rem"}>
        <Stack
          w={"40%"}
          py={".4rem"}
          backgroundColor={"myBlack.200"}
          borderRadius={"lg"}
          textAlign={"center"}
          _hover={{ bg: "#7C7C7C", transition: ".3s" }}
        >
          <Text fontSize={{ base: 11, md: 14 }}>Charge</Text>
          <Text fontSize={{ base: 9, md: 11 }}>{charge}mAh</Text>
        </Stack>
        <Stack
          w={"40%"}
          py={".4rem"}
          backgroundColor={"myBlack.200"}
          borderRadius={"lg"}
          textAlign={"center"}
          _hover={{ bg: "#7C7C7C", transition: ".3s" }}
        >
          <Text fontSize={{ base: 11, md: 14 }}>Total</Text>
          <Text fontSize={{ base: 9, md: 11 }} color={"myWhite.100"}>
            {total}mAh
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
}
