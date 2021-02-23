export interface SaveListDTO {
  filename: string;
  data: any[];
}

export interface UploadFeedback {
  message: string;
  success: boolean | undefined;
}

export type Status = 'Error' | 'Loading' | 'Success' | undefined;
