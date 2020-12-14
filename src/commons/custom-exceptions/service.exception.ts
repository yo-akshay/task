import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceException extends HttpException {
    constructor(message: String) {
      super(message, HttpStatus.BAD_REQUEST);
    }
  }