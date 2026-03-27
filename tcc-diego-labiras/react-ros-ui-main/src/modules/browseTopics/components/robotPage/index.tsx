import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRos } from "../../../../shared/contexts/ros/ros_hook";

interface IRobotPage {}
export function RobotPage({}: IRobotPage) {
  const { ros } = useRos();

  const percentage = (ros.battery.charge / ros.battery.capacity) * 100;

  return (
    <Stack w={"100%"} height={"100%"} p={"1rem"} color={"myWhite.100"} gap={6}>
      <Text fontSize={35} textTransform={"uppercase"}>
        {/* Ainda não estou pegando os dados de lugar nenhum, mas vou ter de pegar de alguma api */}
        Roomba
      </Text>
      <Grid
        templateColumns={"repeat(3, 1fr)"}
        templateRows={"repeat(3, 1fr)"}
        gap={"1rem"}
        w={"100%"}
      >
        <GridItem
          rowSpan={2}
          colSpan={2}
          backgroundColor={"myBlack.300"}
          color={"myWhite.100"}
          borderRadius={"md"}
        >
          <Stack w={"100%"} p={"1rem"}>
            <Stack
              w={"30%"}
              h={"100%"}
              backgroundColor={percentage < 50 ? "#FF0000" : "#64A15F"}
              color={"myWhite.100"}
              p={"1rem"}
              gap={5}
              borderRadius={"20px"}
            >
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  pathColor: "#ffffff",
                  textColor: "#ffffff",
                  pathTransitionDuration: 0.5,
                })}
              />
              <Divider />
              <Stack
                w={"100%"}
                justifyContent={"space-between"}
                color={"myWhite.200"}
                p={".3rem"}
              >
                <Box w={"30%"} backgroundColor={"myWhite.200"} color={"myBlack.200"}>
                  <Text >Temperature</Text>
                  <Text
                    // color={`${
                    //   ros.battery.temperature < 30 ? "myGreen.100" : "myRed.100"
                    // }`}
                  > 
                    {ros.battery.temperature} °C
                  </Text>
                </Box>
              </Stack>
            </Stack>
            <Text>{ros.battery.voltage} V</Text>
            <Text>{ros.battery.current} A</Text>
          </Stack>
          <Divider orientation="vertical" />
          <Stack>
            <Flex
              w={"100%"}
              justifyContent={"space-between"}
              color={"myWhite.200"}
              p={".3rem"}
            >
              <Text>{ros.battery.voltage} V</Text>
              <Text>{ros.battery.current} mA</Text>
            </Flex>
          </Stack>
          {/* Battery state */}
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          backgroundColor={"myBlack.300"}
          color={"myWhite.100"}
          borderRadius={"md"}
        >
          ad
          {/* Gráfico de Pizza dos sensores de do bumb */}
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          backgroundColor={"myBlack.300"}
          color={"myWhite.100"}
          borderRadius={"md"}
        >
          asd
          {/* Gráfico de pizza dos sensores de clif */}
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={3}
          backgroundColor={"myBlack.300"}
          color={"myWhite.100"}
          borderRadius={"md"}
        >
          adf
          {/* Alguma maneira de mostrar os os valores das rodas, tem boolead e number */}
        </GridItem>
      </Grid>
    </Stack>
  );
}
