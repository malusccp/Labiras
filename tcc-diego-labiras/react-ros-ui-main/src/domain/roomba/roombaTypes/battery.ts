export interface RobotBatteryStatus {
  // header: string;
  voltage: number;
  current: number;
  temperature: number;
  charge: number;
  capacity: number;
}

export class RobotBattery implements RobotBatteryStatus {
  // private _header: string;
  private _voltage: number;
  private _current: number;
  private _temperature: number;
  private _charge: number;
  private _capacity: number;

  constructor(message: any) {
    // this._header = message.header;
    this._voltage = message.voltage;
    this._current = message.current;
    this._temperature = message.temperature;
    this._charge = message.charge;
    this._capacity = message.capacity;
  }
  // Getters
  get voltage(): number {
    return this._voltage;
  }

  get current(): number {
    return this._current;
  }

  get temperature(): number {
    return this._temperature;
  }

  get charge(): number {
    return this._charge;
  }

  get capacity(): number {
    return this._capacity;
  }

  // get header(): string {
  //   return this._header;
  // }

  // Setters
  set voltage(value: number) {
    this._voltage = value;
  }

  set current(value: number) {
    this._current = value;
  }

  set temperature(value: number) {
    this._temperature = value;
  }

  set charge(value: number) {
    this._charge = value;
  }

  set capacity(value: number) {
    this._capacity = value;
  }

  // set header(value: string) {
  //   this._header = value;
  // }
}
