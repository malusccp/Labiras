import { RobotBattery } from "../domain/roomba/roombaTypes/battery";
import { BumperSensors } from "../domain/roomba/roombaTypes/bumper";
import { ChargingState } from "../domain/roomba/roombaTypes/chargingState";
import { CliffSensors } from "../domain/roomba/roombaTypes/cliff";
import { WheelSensors } from "../domain/roomba/roombaTypes/wheels";

export function createMessageClassByType(message: any, messageType: string) {

  switch (messageType) {
    case "create_msgs/msg/Battery":

      return new RobotBattery(message);

    case "create_msgs/msg/Bumper":

      return new BumperSensors(message);

    case "create_msgs/msg/ChargingState":
      
      return new ChargingState(message);

    case "create_msgs/msg/Cliff":
      
      return new CliffSensors(message);

    case "create_msgs/msg/Wheels":
      
      return new WheelSensors(message);
  }
}
