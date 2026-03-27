export class ApiResponse {
  message: string;
  data: any;
  success?: boolean;

  constructor(
    message: string = "Success",
    data: any = null,
    success: boolean = true
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
