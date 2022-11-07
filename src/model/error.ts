export class StatusError extends Error {
  public status: number;

  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const ERR_NOT_ENOUGH_QUESTION = new StatusError(
  400,
  'NOT_ENOUGH_QUESTION'
);
export const ERR_POST_NOT_FOUND = new StatusError(400, 'POST_NOT_FOUND');
export const ERR_USER_NOT_FOUND = new StatusError(400, 'USER_NOT_FOUND');
export const ERR_TAG_NOT_FOUND = new StatusError(400, 'TAG_NOT_FOUND');
