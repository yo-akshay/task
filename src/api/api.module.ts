import { Module } from '@nestjs/common';
import { TaskModule } from './task';


@Module({
    imports: [
        TaskModule
    ]

})
export class ApiModule { }
