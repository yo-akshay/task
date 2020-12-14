import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AcceptedTypeGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const types = this.reflector.get<[string]>('acceptedType', context.getHandler());
        const headers = context.switchToHttp().getRequest().headers;

        if (headers.accept && headers.accept != '*/*') {
            if (types.includes(headers.accept)) {
                return true;
            } else {
                throw new HttpException(`${headers.accept} is not acceptable`, HttpStatus.NOT_ACCEPTABLE);
            }
        }

        return true;
    }
}
