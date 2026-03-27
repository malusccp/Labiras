import {
  Box,
  Button,
  Flex,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Text,
  useTheme,
  useToast,
  Center,
} from "@chakra-ui/react";
import { Header } from "../roomba/header";
import { Joystick } from "react-joystick-component";
import { IoIosInformationCircle } from "react-icons/io";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { useRobotControlStore } from "../../stores/useRobotControlStore";
import { useRos } from "../../shared/contexts/ros/ros_hook";
import ROSLIB from "roslib";

export function RoombaControl() {
  const theme = useTheme();
  const toast = useToast();
  const { isConnected, createListener } = useRos();

  const {
    isMovingForward,
    isMovingBackward,
    isRotating,
    velocity,
    topicPath,
    setVelocity,
    setTopicPath,
    setMovingForward,
    setMovingBackward,
    setRotating,
    resetMovement,
  } = useRobotControlStore();

  const [isActive, setIsActive] = useState(false);
  const [x, setX] = useState<number | null>(null);
  const [y, setY] = useState<number | null>(null);
  const [direction, setDirection] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const cmdVelTopicRef = useRef<ROSLIB.Topic | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const listenerRef = useRef<ROSLIB.Topic | null>(null);

  const stickColor = useMemo(() => {
    return theme?.colors?.myWhite?.[100] ?? "#CDCCCD";
  }, [theme]);

  const baseColor = useMemo(
    () => theme?.colors?.myBlack?.[300] ?? "#1D1C21",
    [theme]
  );

  // ROS command functions
  const handleForward = useCallback(() => {
    if (isMovingForward) {
      handleStop();
    } else {
      resetMovement();
      setMovingForward(true);
      setPosition({
        x: 0,
        y: 1,
      });
      sendCommand({
        linear: { x: 4, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: 0 },
      });
    }
  }, [isMovingForward, velocity, resetMovement, setMovingForward]);

  const handleBackward = useCallback(() => {
    if (isMovingBackward) {
      handleStop();
    } else {
      resetMovement();
      setMovingBackward(true);
      setPosition({
        x: 0,
        y: -1,
      });
      sendCommand({
        linear: { x: -velocity, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: 0 },
      });
    }
  }, [isMovingBackward, velocity, resetMovement, setMovingBackward]);

  const handleRotate = useCallback(
    (direction: "left" | "right") => {
      if (isRotating) {
        handleStop();
      } else {
        resetMovement();
        setRotating(true);
        const angularZ = direction === "left" ? velocity : -velocity;
        setPosition({
          x: direction === "left" ? -1 : 1,
          y: 0,
        });
        sendCommand({
          linear: { x: 0, y: 0, z: 0 },
          angular: { x: 0, y: 0, z: angularZ },
        });
      }
      // listenerRef.current?.publish({
      //   linear: { x: 0, y: 0, z: 0 },
      //   angular: {
      //     x: 0,
      //     y: 0,
      //     z: direction === "left" ? velocity : -velocity,
      //   },
      // });

      console.log("rotate", direction);
    },
    [isRotating, velocity, resetMovement, setRotating]
  );

  const handleStop = useCallback(() => {
    resetMovement();
    setPosition({
      x: 0,
      y: 0,
    });
    sendCommand({
      linear: { x: 0, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: 0 },
    });

    listenerRef.current?.publish({
      linear: { x: 0, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: 0 },
    });
  }, [resetMovement]);

  const sendCommand = useCallback(
    (cmd: any) => {
      console.log(
        "sendCommand",
        cmd,
        "isSubscribed",
        isSubscribed,
        "cmdVelTopic",
        cmdVelTopicRef.current
      );

      if (cmdVelTopicRef.current && isSubscribed) {
        console.log(cmdVelTopicRef.current.messageType);

        cmdVelTopicRef.current.publish(cmd);
        listenerRef.current?.publish(cmd);
        console.log("published");
      }
    },
    [isSubscribed]
  );

  const handleSubscribe = useCallback(() => {
    console.log("handleSubscribe");

    if (!isConnected) {
      toast({
        title: "Erro",
        description: "Não conectado ao ROS",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const listener = createListener({
      path: topicPath,
      messageType: "geometry_msgs/Twist",
      type: "topic",
    });
    listener.subscribe((message) => {
      console.log("message", message);
    });

    listenerRef.current = listener;

    if (isSubscribed) {
      // Unsubscribe
      if (cmdVelTopicRef.current) {
        cmdVelTopicRef.current.unadvertise();
        cmdVelTopicRef.current = null;
      }
      setIsSubscribed(false);
      toast({
        title: "Desconectado",
        description: "Desconectado do tópico",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Subscribe
      const topic = new ROSLIB.Topic({
        ros: new ROSLIB.Ros({ url: "ws://192.168.18.137:9090" }),
        name: topicPath,
        messageType: "geometry_msgs/Twist",
      });
      topic.advertise();
      cmdVelTopicRef.current = topic;
      setIsSubscribed(true);
      toast({
        title: "Conectado",
        description: "Conectado ao tópico com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isConnected, isSubscribed, topicPath, toast]);

  const handleStart = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleMove = useCallback((evt: any) => {
    const vx = evt?.x ?? null;
    const vy = evt?.y ?? null;
    const d = evt?.direction ?? null;
    const dist = evt?.distance ?? null;
    setX(vx);
    setY(vy);
    setDirection(d);
    setDistance(dist);
  }, []);

  const handleJoystickStop = useCallback(() => {
    setIsActive(false);
    setX(null);
    setY(null);
    setDirection(null);
    setDistance(null);
  }, []);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("key down", e.key);

      switch (e.key.toLowerCase()) {
        case "w":
          e.preventDefault();
          handleForward();
          break;
        case "s":
          e.preventDefault();
          handleBackward();
          break;
        case "a":
          e.preventDefault();
          handleRotate("left");
          break;
        case "d":
          e.preventDefault();
          handleRotate("right");
          break;
        case " ":
          e.preventDefault();
          handleStop();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleForward, handleBackward, handleRotate, handleStop]);

  useEffect(() => {
    return () => {
      if (cmdVelTopicRef.current) {
        cmdVelTopicRef.current.unadvertise();
      }
    };
  }, []);

  const getDirectionText = () => {
    if (isMovingForward) return "Frente";
    if (isMovingBackward) return "Trás";
    if (isRotating) return "Girando";
    if (direction) return `Joystick: ${direction}`;
    return "Parado";
  };

  return (
    <Stack p={".6rem"} color={"myWhite.100"} gap={4}>
      <Header>Roomba Control</Header>

      <Center>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          align={{ base: "stretch", md: "center" }}
          wrap="wrap"
          mt={"1rem"}
        >
          <Flex direction="column" gap={2} flex="1" minW="200px">
            <Text fontSize="sm" color="myWhite.200">
              Control Topic path
            </Text>
            <Input
              value={topicPath}
              onChange={(e) => setTopicPath(e.target.value)}
              placeholder="/diff_cont/cmd_vel"
              bg="myBlack.300"
              color="myWhite.100"
              borderColor="myBlack.200"
              _focus={{ borderColor: "myBlue.100" }}
            />
          </Flex>

          <Flex direction="column" gap={2} minW="120px">
            <Text fontSize="sm" color="myWhite.200">
              Velocidade
            </Text>
            <NumberInput
              value={velocity}
              onChange={(_, value) => setVelocity(value)}
              min={0}
              max={4}
              step={0.1}
              precision={1}
              bg="myBlack.300"
              color="myWhite.100"
            >
              <NumberInputField
                borderColor="myBlack.200"
                _focus={{ borderColor: "myBlue.100" }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper color="myWhite.100" />
                <NumberDecrementStepper color="myWhite.100" />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Button
            onClick={handleSubscribe}
            colorScheme={isSubscribed ? "red" : "green"}
            size="md"
            alignSelf={{ base: "stretch", md: "flex-end" }}
          >
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </Button>
        </Flex>
      </Center>

      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={8}
        align="center"
        justify="center"
        flex="1"
        my={"3rem"}
      >
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            position="absolute"
            top="-40px"
            left="50%"
            transform="translateX(-50%)"
            fontSize="2xl"
            fontWeight="bold"
            color="myWhite.100"
          >
            W
          </Text>
          <Text
            position="absolute"
            left="-40px"
            top="50%"
            transform="translateY(-50%)"
            fontSize="2xl"
            fontWeight="bold"
            color="myWhite.100"
          >
            A
          </Text>
          <Text
            position="absolute"
            right="-40px"
            top="50%"
            transform="translateY(-50%)"
            fontSize="2xl"
            fontWeight="bold"
            color="myWhite.100"
          >
            D
          </Text>
          <Text
            position="absolute"
            bottom="-40px"
            left="50%"
            transform="translateX(-50%)"
            fontSize="2xl"
            fontWeight="bold"
            color="myWhite.100"
          >
            S
          </Text>

          <Joystick
            size={150}
            sticky={false}
            baseColor={baseColor}
            stickColor={stickColor}
            throttle={50}
            move={handleMove}
            pos={position}
            start={handleStart}
            stop={handleJoystickStop}
          />
        </Box>
      </Flex>
      <Center>
        <Box
          bg="gray.800"
          color="white"
          p={6}
          borderRadius="md"
          minW="300px"
          maxW="400px"
        >
          <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
            Status
          </Text>
          <Stack spacing={2}>
            {/* <Text>X: {x ?? "-"}</Text>
            <Text>Y: {y ?? "-"}</Text> */}
            <Text>Direção: {getDirectionText()}</Text>
            {/* <Text>Distância ao centro: {distance ?? "-"}</Text> */}
            <Text>Active: {isActive ? "true" : "false"}</Text>
            <Text>Conectado: {isSubscribed ? "Sim" : "Não"}</Text>
            <Text>Velocidade: {velocity}</Text>
          </Stack>
        </Box>
      </Center>

      <Center>
        <Flex
          alignItems={"center"}
          gap={".6rem"}
          width={"70%"}
          justifyContent={"center"}
          p={"1rem"}
          border={"1px solid"}
          borderRadius={"lg"}
        >
          <IoIosInformationCircle size={20} />
          <Text>
            Use as teclas WASD ou o joystick para controlar o robô. Barra de
            espaço para parar.
          </Text>
        </Flex>
      </Center>
    </Stack>
  );
}
