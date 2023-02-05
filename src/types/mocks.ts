export type ErrorResponse = {
  code: number;
};

export interface ServerResponse<TData> {
  code: string;
  data: TData;
  error: string | null;
}
