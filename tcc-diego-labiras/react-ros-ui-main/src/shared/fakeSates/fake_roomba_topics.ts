import { RobotBattery } from "../../domain/roomba/roombaTypes/battery";
import { BumperSensors } from "../../domain/roomba/roombaTypes/bumper";
import { ChargingState } from "../../domain/roomba/roombaTypes/chargingState";
import { CliffSensors } from "../../domain/roomba/roombaTypes/cliff";
import { WheelSensors } from "../../domain/roomba/roombaTypes/wheels";

const BumpSensorMessage = {
  is_light_left: true,
  is_light_front_left: false,
  is_light_center_left: true,
  is_light_center_right: false,
  is_light_front_right: false,
  is_light_right: false,
};

const bumpSensors = new BumperSensors(BumpSensorMessage);

const cliffSensorMessage = {
  header: "some_header_string",
  is_cliff_left: false,
  is_cliff_front_left: true,
  is_cliff_right: true,
  is_cliff_front_right: false,
};

const cliffSensors = new CliffSensors(cliffSensorMessage);

const BatteryChargeStateMessage = {
  header: "some_header_string",
  state: 1,
};

const batteryChargeState = new ChargingState(BatteryChargeStateMessage);

const wheelSensorMessage = {
  header: "some_header_string",
  drop_left: false,
  encoder_counts_left: 100,
  velocity_left: 10,
  drop_right: true,
  encoder_counts_right: 90,
  velocity_right: 9,
};

const wheelSensors = new WheelSensors(wheelSensorMessage);

const batteryStatusmessage: any = {
  header: "Some header Status",
  voltage: 12.6,
  current: 1.5,
  temperature: 90,
  charge: 2350,
  capacity: 5000,
};

const batteryStatus = new RobotBattery(batteryStatusmessage);

export const fakeRoombaTopics = {
  battery: batteryStatus,
  bumper: bumpSensors,
  wheels: wheelSensors,
  cliff: cliffSensors,
  chargingState: batteryChargeState,
};