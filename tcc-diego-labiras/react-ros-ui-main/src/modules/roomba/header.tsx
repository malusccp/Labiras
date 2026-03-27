import {
  Box,
  Button,
  Flex,
  Heading,
  HeadingProps,
  Tooltip,
} from "@chakra-ui/react";
import { useRos } from "../../shared/contexts/ros/ros_hook";
import { useNavbarController } from "../../shared/contexts/navbar/navbar_context";
import { MdOutlinePower, MdOutlinePowerOff } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
interface HeaderProps extends HeadingProps {}

export function Header({ children, ...rest }: HeaderProps) {
  const { isConnected, toggleConnection, isConnecting } = useRos();
  const { onOpen } = useNavbarController();

  return (
    <Flex flex={1} justifyContent={"space-between"} alignItems={"center"}>
      <Flex gap={2} alignItems={"center"}>
        <Box
          display={{ base: "block", md: "none" }}
          border={"1px solid"}
          borderRadius={"lg"}
          p={1}
          cursor={"pointer"}
          onClick={onOpen}
        >
          <AiOutlineMenu size={20} />
        </Box>
        <Heading {...rest} fontWeight={"600"}>
          {children}
        </Heading>
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        {/* <Select
          defaultValue={vizualizationType.vizualizationType}
          variant={"unstyled"}
          onChange={(e) =>
            vizualizationType.setVizualizationType(
              e.target.value as VizualizationType
            )
          }
          // // backgroundColor={"myBlack.300"}
          // borderColor={"myWhite.100"}
          // borderWidth={2}
          // border={"none"}
          // borderRadius={"lg"}
          color={"myWhite.100"}
        >
          <option value="roomba">Roomba</option>
          <option value="logs">Logs</option>
        </Select> */}
        <Tooltip
          label={isConnected ? "Desconectar" : "Conectar"}
          hasArrow
          backgroundColor={"myBlack.100"}
        >
          <Button
            variant={"link"}
            _hover={{
              color: "myWhite.100",
            }}
            disabled={isConnecting}
            onClick={toggleConnection}
            isLoading={isConnecting}
          >
            {isConnected ? (
              <MdOutlinePowerOff size={30} />
            ) : (
              <MdOutlinePower size={30} />
            )}
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
