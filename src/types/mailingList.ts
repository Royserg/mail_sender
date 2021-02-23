export interface SaveListDTO {
  filename: string;
  data: any[];
}

export type Status = 'Error' | 'Loading' | 'Success' | undefined;

export enum StatusKind {
  uploadStatus = 'uploadStatus',
  deleteStatus = 'deleteStatus',
}
