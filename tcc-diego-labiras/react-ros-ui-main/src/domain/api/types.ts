export interface ApiRequest<T> {
  status: number;
  message: string;
  data: T;
}
