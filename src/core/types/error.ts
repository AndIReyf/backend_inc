export interface IError {
  message?: string;
  field?: string;
}

export interface IErrorMsg {
  errorsMessages: IError[];
}
