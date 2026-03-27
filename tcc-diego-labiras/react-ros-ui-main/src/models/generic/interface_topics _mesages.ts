import { RobotBattery } from "../../domain/roomba/roombaTypes/battery";
import { BumperSensors } from "../../domain/roomba/roombaTypes/bumper";
import { ChargingState } from "../../domain/roomba/roombaTypes/chargingState";
import { CliffSensors } from "../../domain/roomba/roombaTypes/cliff";
import { WheelSensors } from "../../domain/roomba/roombaTypes/wheels";

export interface IRobotTopicsMessages {
  battery: RobotBattery;
  bumper: BumperSensors;
  chargingState: ChargingState;
  cliff: CliffSensors;
  wheels: WheelSensors;
}
