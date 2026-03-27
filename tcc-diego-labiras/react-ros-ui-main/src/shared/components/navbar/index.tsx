import { Stack, Link, Image, Flex, Box, Icon } from "@chakra-ui/react";
import logo from "../../../assets/logos/labiras_logo.png";
import { HiMiniHome } from "react-icons/hi2";
import { LiaRobotSolid } from "react-icons/lia";
import { PiRobot } from "react-icons/pi";
import { NavLink } from "./components/nav_link";

export const NavBar = () => {
  return (
      <Box
        position={"relative"}
        backgroundColor={"myBlack.100"}
        height={"100%"}
      >
        <Stack
          maxH={"100vh"}
          height={"100%"}
          w={"100%"}
          p={".5rem"}
          flexGrow={1}
          gap={"1rem"}
          alignItems={"center"}
          position={"sticky"}
          top={0}
        >
          <Flex w={"100%"} justifyContent={"center"} alignContent={"center"}>
            <Link
              w={{ base: "55%", md: "90%", lg: "70%" }}
              justifyContent={"center"}
              href="/"
            >
              <Image src={logo} objectFit={"contain"} w={"100%"} />
            </Link>
          </Flex>
          <Stack alignItems={"start"} gap={3} w={{ base: "100%" }}>
            <NavLink text="Home" icon={HiMiniHome} href="/" />
            <NavLink text="Roomba" icon={LiaRobotSolid} href="/roomba" />
            <NavLink text="Tópicos" icon={PiRobot} href="/robots" />

            {/* <NavLink
            text="Prototype"
            icon={LiaRobotSolid}
            href="/robots/prototype"
            /> */}
          </Stack>
        </Stack>
      </Box>
  );
};
