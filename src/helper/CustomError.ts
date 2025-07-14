export class CustomError extends Error {
  statusCode: number;
  text?: string;

  constructor(message: string, statusCode: number, text?: string) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.text = text;
  }
}
