import ROSLIB from "roslib";
import { ROSContext, ROSState } from "./ros_context";
import { useEffect, useState } from "react";
import { ChildrenNode } from "../../../models/generic/children_node";
import { Topic } from "../../../domain/bridge/bridgeTypes";

interface ROSStatus
  extends Omit<ROSState, "toggleConnection" | "createListener"> {}

function ROSProvider({ children }: ChildrenNode) {
  const ros = new ROSLIB.Ros({});

  const url = "ws://localhost:9090";
  // const url = "ws://192.168.18.137:9090";

  // const [rosInstance, setRosInstance] = useState<ROSLIB.Ros>(ros);
  const [rosStatus, setRosStatus] = useState<ROSStatus>({
    ros,
    isConnected: false,
    isConnecting: false,
    error: "",
    autoconnect: true,
    url,
    // toggleConnection,
    // createListener,
    topics: [],
    listeners: [],
  });

  // useEffect(() => {
  //   setRosStatus({
  //     isConnected: rosInstance.isConnected,
  //     isConnecting: false,
  //     error: "",
  //     autoconnect: false,
  //     url,
  //     toggleConnection,
  //     createListener,
  //     topics: [],
  //     listeners: [],
  //   });
  // }, [rosInstance]);

  const rosConnectionVerifiers = () => {
    rosStatus.ros.on("connection", () => {
      console.log("Connected to ROS");
    });

    rosStatus.ros.on("error", (error) => {
      console.log("Error connecting to ROS: ", error);
      console.log("the ros instance on error: ", rosStatus.ros);
    });
  };

  function toggleConnection() {
    console.log("here");

    if (rosStatus.isConnected) {
      console.log("disconnection");

      handleDisconnect();
      return;
    }

    // rosStatus.isConnecting = true;
    handleConnect();
  }

  function createListener({ path, messageType }: Topic) {
    const newListener = new ROSLIB.Topic({
      ros: rosStatus.ros,
      name: path,
      messageType,
    });

    const existingListener = rosStatus.listeners.find(
      (listener) => listener.name === newListener.name
    );

    if (existingListener) {
      console.log(
        "Listener already available in ros.listeners[" +
          existingListener.name +
          "]"
      );
      return existingListener;
    }

    setRosStatus((oldState) => ({
      ...oldState,
      listeners: [...oldState.listeners, newListener],
    }));

    return newListener;
  }

  useEffect(() => {
    if (!rosStatus.isConnected) {
      if (rosStatus.autoconnect) {
        handleConnect();
      }
    }
  }, []);

  // useEffect(() => {
  //   if (rosStatus.isConnected) {
  //     getTopics();
  //   }
  // }, [rosStatus.isConnected]);

  const handleDisconnect = () => {
    console.log("disconnecting");

    try {
      rosStatus.ros.close();
      setRosStatus((oldState) => ({
        ...oldState,
        isConnected: false,
        topics: [],
        listeners: [],
      }));
      console.log("it even got gere");
    } catch (e) {
      console.log("Error in disconnection", e);
    }
  };

  async function getTopics() {
    console.log("getTopics called");

    const topicsPromise = new Promise<{ topics: Topic[] }>(
      (resolve, reject) => {
        rosStatus.ros.getTopics(
          (topics) => {
            const topicList: Topic[] = topics.topics.map((topicName, i) => {
              return {
                path: topicName,
                messageType: topics.types[i],
                type: "topic",
              } as Topic;
            });
            resolve({
              topics: topicList,
            });
            reject({
              topics: [],
            });
          },
          (message) => {
            console.error(message);
            setRosStatus((oldState) => ({
              ...oldState,
              topics: [],
            }));
          }
        );
      }
    );

    topicsPromise.then((topics) => {
      setRosStatus((oldState) => ({
        ...oldState,
        topics: [...topics.topics],
      }));
    });
    return rosStatus.topics;
  }

  function handleConnect() {
    try {
      rosStatus.ros.connect(rosStatus.url);

      setRosStatus((oldState) => ({
        ...oldState,
        isConnecting: true,
        error: "",
      }));

      console.log("connecting...");

      rosStatus.ros.on("connection", () => {
        console.log("connected");

        setRosStatus((oldState) => ({
          ...oldState,
          isConnected: true,
          isConnecting: false,
        }));

        getTopics();
      });

      rosStatus.ros.on("error", () => {
        console.log("error on ros provider");

        setRosStatus((oldState) => ({
          ...oldState,
          isConnected: false,
          isConnecting: false,
          error: "Um erro aconteceu, usuário não conectado",
        }));
      });
    } catch (e) {
      setRosStatus((oldState) => ({
        ...oldState,
        isConnected: false,
        isConnecting: false,
        error: "Erro ao conectar",
      }));
      console.log("on ros provider: ");
      console.log(e);
    }
  }

  // useEffect(() => {
  //   //Criar alguma verificacao para salvar o valor incial da sessao no banco de dados para armazenar a data incial

  //   // const rosStatus.ros = new ROSLIB.Ros({
  //   //   url,
  //   // });

  //   // console.log(
  //   //   "Use effect foi chamado e colocou a instacia com essa valor",
  //   //   rosStatus.ros
  //   // );
  //   rosConnectionVerifiers();

  //   setRosStatus({
  //     ros: rosStatus.ros,
  //     isConnected: rosStatus.ros.isConnected,
  //     isConnecting: false,
  //     error: "",
  //     autoconnect: false,
  //     url,
  //     // toggleConnection,
  //     // createListener,
  //     topics: [],
  //     listeners: [],
  //   });
  // }, [rosStatus.ros]);

  return (
    <ROSContext.Provider
      value={{
        ...rosStatus,
        ros: rosStatus.ros,
        toggleConnection,
        createListener,
      }}
    >
      {children}
    </ROSContext.Provider>
  );
}

export default ROSProvider;
