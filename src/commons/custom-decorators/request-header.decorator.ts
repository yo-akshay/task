import { SetMetadata } from '@nestjs/common';

export const Accept = (types: object) => SetMetadata('acceptedType', types);