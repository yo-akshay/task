import { HttpException, HttpStatus } from '@nestjs/common';

export class RepositoryException extends HttpException {
    constructor(message: String) {
      super(message, HttpStatus.BAD_REQUEST);
    }
  }