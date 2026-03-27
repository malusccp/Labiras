export interface Topics {
  name: string;
  path: string;
  messageType: string;
}

export interface IRobotState {
  id: string;
  name: string;
  topics: Topics[];
}

export const RobotsState: IRobotState[] = [
  {
    id: "1",
    name: "Robot1",
    topics: [
      { name: "Navigation", path: "/navigation", messageType: "Navigation" },
      { name: "Object Recognition", path: "/object_recognition", messageType: "ObjectRecognition" },
      { name: "Battery Management", path: "/battery_management", messageType: "BatteryManagement" },
      { name: "Battery", path: "/battery", messageType: "Battery" },
      { name: "Management", path: "/management", messageType: "Management" },
    ],
  },
  // {
  //   id: "2",
  //   name: "Robot2",
  //   topics: [
  //     { name: "Path Planning" },
  //     { name: "SLAM" },
  //     { name: "Obstacle Avoidance" },
  //   ],
  // },
  // {
  //   id: "3",
  //   name: "Robot3",
  //   topics: [
  //     { name: "Grasping" },
  //     { name: "Manipulation" },
  //     { name: "Force Sensing" },
  //   ],
  // },
  // {
  //   id: "4",
  //   name: "Robot4",
  //   topics: [
  //     { name: "Voice Command" },
  //     { name: "Natural Language Processing" },
  //     { name: "Speech Synthesis" },
  //   ],
  // },
  // {
  //   id: "5",
  //   name: "Robot5",
  //   topics: [
  //     { name: "Face Recognition" },
  //     { name: "Emotion Detection" },
  //     { name: "Behavior Modeling" },
  //   ],
  // },
];
