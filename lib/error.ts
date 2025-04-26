export class BaseError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
  ) {
    super(message);
    this.name = "BaseError";
  }
}
export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 403);
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}
