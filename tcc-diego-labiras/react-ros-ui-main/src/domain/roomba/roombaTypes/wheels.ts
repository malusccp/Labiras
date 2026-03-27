export interface RobotWheelSensors {
  // header: string;
  drop_left: boolean;
  encoder_counts_left: number;
  velocity_left: number;
  drop_right: boolean;
  encoder_counts_right: number;
  velocity_right: number;
}

export class WheelSensors implements RobotWheelSensors {
  // private _header: string;
  private _drop_left: boolean;
  private _encoder_counts_left: number;
  private _velocity_left: number;
  private _drop_right: boolean;
  private _encoder_counts_right: number;
  private _velocity_right: number;

  constructor(message: any) {
    // this._header = message.header;
    this._drop_left = message.drop_left;
    this._encoder_counts_left = message.encoder_counts_left;
    this._velocity_left = message.velocity_left;
    this._drop_right = message.drop_right;
    this._encoder_counts_right = message.encoder_counts_right;
    this._velocity_right = message.velocity_right;
  }

  // Getters
  // get header(): string {
  //   return this._header;
  // }

  get drop_left(): boolean {
    return this._drop_left;
  }

  get encoder_counts_left(): number {
    return this._encoder_counts_left;
  }

  get velocity_left(): number {
    return this._velocity_left;
  }

  get drop_right(): boolean {
    return this._drop_right;
  }

  get encoder_counts_right(): number {
    return this._encoder_counts_right;
  }

  get velocity_right(): number {
    return this._velocity_right;
  }

  // Setters
  // set header(value: string) {
  //   this._header = value;
  // }

  set drop_left(value: boolean) {
    this._drop_left = value;
  }

  set encoder_counts_left(value: number) {
    this._encoder_counts_left = value;
  }

  set velocity_left(value: number) {
    this._velocity_left = value;
  }

  set drop_right(value: boolean) {
    this._drop_right = value;
  }

  set encoder_counts_right(value: number) {
    this._encoder_counts_right = value;
  }

  set velocity_right(value: number) {
    this._velocity_right = value;
  }
}
