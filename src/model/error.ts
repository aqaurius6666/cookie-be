export class StatusError extends Error {
  public status: number;

  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const NOT_ENOUGH_QUESTION = new StatusError(400, 'NOT_ENOUGH_QUESTION');
export const POST_NOT_FOUND = new StatusError(400, 'POST_NOT_FOUND');
export const USER_NOT_FOUND = new StatusError(400, 'USER_NOT_FOUND');
export const TAG_NOT_FOUND = new StatusError(400, 'TAG_NOT_FOUND');
