import { create } from 'zustand';

interface RobotControlState {
  isMovingForward: boolean;
  isMovingBackward: boolean;
  isRotating: boolean;
  velocity: number;
  topicPath: string;
  setVelocity: (v: number) => void;
  setTopicPath: (p: string) => void;
  setMovingForward: (b: boolean) => void;
  setMovingBackward: (b: boolean) => void;
  setRotating: (b: boolean) => void;
  resetMovement: () => void;
}

export const useRobotControlStore = create<RobotControlState>((set) => ({
  isMovingForward: false,
  isMovingBackward: false,
  isRotating: false,
  velocity: 0.5,
  topicPath: '/diff_cont/cmd_vel',
  setVelocity: (v) => set({ velocity: v }),
  setTopicPath: (p) => set({ topicPath: p }),
  setMovingForward: (b) => set({ isMovingForward: b }),
  setMovingBackward: (b) => set({ isMovingBackward: b }),
  setRotating: (b) => set({ isRotating: b }),
  resetMovement: () => set({ 
    isMovingForward: false, 
    isMovingBackward: false, 
    isRotating: false 
  }),
}));
