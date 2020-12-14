import { IsString } from "class-validator";

export class TaskParamDto {

    @IsString()
    username: String

};
