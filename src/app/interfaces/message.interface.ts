

export interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number,
    errores: string[],
    message: string,
  }
}
