export declare namespace Response {
  export enum EStatus {
    SUCCESS = 1,
    FAIL = 0,
  }

  export interface Common<T> {
    code: number;
    data: T;
    message?: string;
    success?: EStatus;
  }

  export interface Pagination<T> {
    data: T[];
    total: number;
    page: number;
    per_page: number;
    success: EStatus;
    message?: string;
    error?: string;
  }
}
