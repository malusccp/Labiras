import { useContext } from "react"
import { ROSContext, ROSState } from "./ros_context"


export const useRos = () => {
  const USE_MOCKED = process.env.VITE_BASE_USE_MOCKED
  const context = useContext(ROSContext)
  if (USE_MOCKED === "true") {
    // Generate a mocked ROSContext based on the ROSState interface
    return {
      ...context,
      // ros: {} as any, // Mocked Ros object
      isConnected: true,
      isConnecting: false,
      autoconnect: false,
      error: "",
      url: "ws://mocked-ros-url",
      topics: [
        {
          path: "/mocked/topic1",
          messageType: "std_msgs/String",
          type: "topic"
        },
        {
          path: "/mocked/topic2",
          messageType: "sensor_msgs/Image",
          type: "topic"
        },
      ],
      listeners: []
    } as ROSState
  }

  return useContext(ROSContext)
}