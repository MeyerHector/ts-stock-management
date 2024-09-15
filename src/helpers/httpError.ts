import { HttpStatus } from "../constants/HTTPERRORS";

class BaseError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.FORBIDDEN, message);
  }
}

export class InternalServerError extends BaseError {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno en el servidor");
  }
}
