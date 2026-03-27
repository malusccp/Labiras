import { createContext } from "react";
import ROSLIB, { Ros } from "roslib";
import { Topic } from "../../../domain/bridge/bridgeTypes";

export interface ROSState {
  ros: Ros;
  isConnected: boolean;
  isConnecting: boolean;
  autoconnect: boolean;
  error: string;
  url: string;
  toggleConnection: () => void;
  createListener: (topic: Topic) => ROSLIB.Topic<ROSLIB.Message>;
  topics: Topic[];
  listeners: ROSLIB.Topic<ROSLIB.Message>[];
}

export const ROSContext = createContext<ROSState>({} as ROSState);
