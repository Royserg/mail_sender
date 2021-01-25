export interface Account {
  username: string;
  password: string;
}

export interface AccountConnectionFeedback {
  message: string;
  success: boolean;
}

export type ConnectionStatus = 'Not connected' | 'Loading' | 'Connected';
