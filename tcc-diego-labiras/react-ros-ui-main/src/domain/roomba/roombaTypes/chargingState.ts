export interface RobotState {
  // header: string;
  state: number;
}

export class ChargingState implements RobotState {
  // private _header: string;
  private _state: number;

  constructor(message: any) {
    // this._header = message.header;
    this._state = message.state;
  }

  // Getters
  // get header(): string {
  //   return this._header;
  // }

  get state(): number {
    return this._state;
  }

  // Setters
  // set header(value: string) {
  //   this._header = value;
  // }

  set state(value: number) {
    this._state = value;
  }
}
