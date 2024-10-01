export interface IError {
  name?: string;
  result: string;
  error: {
    isJoi?: boolean
  };
  message: string;
  stack: string;
}
