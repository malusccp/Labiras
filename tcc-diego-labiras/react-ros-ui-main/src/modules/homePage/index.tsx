import { Button, Flex, Icon, Stack, Text, useToast } from "@chakra-ui/react";
import { GoDot } from "react-icons/go";
import { useRos } from "../../shared/contexts/ros/ros_hook";
import { useEffect } from "react";

export function HomePage() {
  const { isConnected, toggleConnection, error, isConnecting, ros } = useRos();

  const toast = useToast({ position: "bottom-right" });

  const handleClick = () => {
    toggleConnection();
  };

  useEffect(() => {
    if (error !== "") {
      toast({
        title: "Erro",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [error]);

  return (
    <Stack
      w={"100%"}
      h={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack
        backgroundColor={"myBlack.300"}
        w={{ base: "90%", sm: "80%", lg: "40%" }}
        h={"40%"}
        borderRadius={"xl"}
        color={"myWhite.100"}
        p={"2rem"}
        gap={"3rem"}
        position={"relative"}
      >
        <Text position={"absolute"} fontSize={30}>
          Conexão
        </Text>
        <Stack
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={7}
        >
          <Flex alignItems={"center"}>
            <Icon
              color={isConnected ? "green" : "red"}
              as={GoDot}
              boxSize={10}
            />
            <Text fontSize={24}>{isConnected ? "Conectado" : "Desconectado"}</Text>
          </Flex>

          <Button
            color={"myWhite.100"}
            backgroundColor={"myBlack.200"}
            _hover={{
              backgroundColor: "myBlack.300",
              borderColor: "myWhite.100",
            }}
            p={"2rem"}
            borderRadius={"xl"}
            fontSize={20}
            onClick={handleClick}
            isLoading={isConnecting}
            disabled={isConnecting}
          >
            {!isConnected ? "Conectar" : "Desconectar"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
