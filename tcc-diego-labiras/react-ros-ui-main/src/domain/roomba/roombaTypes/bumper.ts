export interface RobotBumperSensors {
  is_light_left: boolean;
  is_light_front_left: boolean;
  is_light_center_left: boolean;
  is_light_center_right: boolean;
  is_light_front_right: boolean;
  is_light_right: boolean;
}

export class BumperSensors implements RobotBumperSensors {
  private _is_light_left: boolean = false;
  private _is_light_front_left: boolean = false;
  private _is_light_center_left: boolean = false;
  private _is_light_center_right: boolean = false;
  private _is_light_front_right: boolean = false;
  private _is_light_right: boolean = false;

  constructor(message: any) {
    this._is_light_left = message.is_light_left;
    this._is_light_front_left = message.is_light_front_left;
    this._is_light_center_left = message.is_light_center_left;
    this._is_light_center_right = message.is_light_center_right;
    this._is_light_front_right = message.is_light_front_right;
    this._is_light_right = message.is_light_right;
  }

  // Getters
  get is_light_left(): boolean {
    return this._is_light_left;
  }

  get is_light_front_left(): boolean {
    return this._is_light_front_left;
  }

  get is_light_center_left(): boolean {
    return this._is_light_center_left;
  }

  get is_light_center_right(): boolean {
    return this._is_light_center_right;
  }

  get is_light_front_right(): boolean {
    return this._is_light_front_right;
  }

  get is_light_right(): boolean {
    return this._is_light_right;
  }

  // Setters
  set is_light_left(value: boolean) {
    this._is_light_left = value;
  }

  set is_light_front_left(value: boolean) {
    this._is_light_front_left = value;
  }

  set is_light_center_left(value: boolean) {
    this._is_light_center_left = value;
  }

  set is_light_center_right(value: boolean) {
    this._is_light_center_right = value;
  }

  set is_light_front_right(value: boolean) {
    this._is_light_front_right = value;
  }

  set is_light_right(value: boolean) {
    this._is_light_right = value;
  }

  toJson() {
    return {
      light_left: this.is_light_left,
      light_front_left: this.is_light_front_left,
      light_center_left: this.is_light_center_left,
      light_center_right: this.is_light_center_right,
      light_front_right: this.is_light_front_right,
      light_right: this.is_light_right,
    };
  }

  get labeledData(): Array<{ name: string; state: boolean }> {
    return [
      { name: "light_left", state: this.is_light_left },
      { name: "light_front_left", state: this.is_light_front_left },
      { name: "light_center_left", state: this.is_light_center_left },
      { name: "light_center_right", state: this.is_light_center_right },
      { name: "light_front_right", state: this.is_light_front_right },
      { name: "light_right", state: this.is_light_right },
    ];
  }
}
