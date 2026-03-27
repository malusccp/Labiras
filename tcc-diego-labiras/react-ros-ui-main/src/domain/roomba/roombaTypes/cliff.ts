export interface RobotCliffSensors {
  // header: string;
  is_cliff_left: boolean;
  is_cliff_front_left: boolean;
  is_cliff_right: boolean;
  is_cliff_front_right: boolean;
}

export class CliffSensors implements RobotCliffSensors {
  // private _header: string;
  private _is_cliff_left: boolean;
  private _is_cliff_front_left: boolean;
  private _is_cliff_right: boolean;
  private _is_cliff_front_right: boolean;

  constructor(message: any) {
    // this._header = message.header;
    this._is_cliff_left = message.is_cliff_left;
    this._is_cliff_front_left = message.is_cliff_front_left;
    this._is_cliff_right = message.is_cliff_right;
    this._is_cliff_front_right = message.is_cliff_front_right;
  }

  get is_cliff_left(): boolean {
    return this._is_cliff_left;
  }

  get is_cliff_front_left(): boolean {
    return this._is_cliff_front_left;
  }

  get is_cliff_right(): boolean {
    return this._is_cliff_right;
  }

  get is_cliff_front_right(): boolean {
    return this._is_cliff_front_right;
  }

  // Setters
  // set header(value: string) {
  //   this._header = value;
  // }

  set is_cliff_left(value: boolean) {
    this._is_cliff_left = value;
  }

  set is_cliff_front_left(value: boolean) {
    this._is_cliff_front_left = value;
  }

  set is_cliff_right(value: boolean) {
    this._is_cliff_right = value;
  }

  set is_cliff_front_right(value: boolean) {
    this._is_cliff_front_right = value;
  }
}
