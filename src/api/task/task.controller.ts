import { Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, Query, UseGuards } from '@nestjs/common';
import { Accept } from 'src/commons/custom-decorators/request-header.decorator';
import { TaskParamDto } from 'src/commons/dtos/taskParam.dto';
import { AcceptedTypeGuard } from 'src/commons/guards/accept-type.guard';
import { Helpers } from 'src/commons/helpers/utility.helpers';
import { Response } from 'src/commons/interfaces/response.interface';
import { TaskService } from 'src/commons/services/task.service';

@UseGuards(AcceptedTypeGuard)
@Controller("task")
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Get("/:username")
    @Accept(['application/json'])
    async getReposInfo(@Param() params: TaskParamDto,
        @Query('fork', new DefaultValuePipe(false), ParseBoolPipe) fork: boolean): Promise<Response> {
        const info = await this.taskService.getForkRepoInfo(params, fork);
        return Helpers.sendJsonResponse(info, 'Repositories');
    }
}
