import { HttpModule, Module } from '@nestjs/common';
import { GithubService } from './helper-services/github-service';
import { TaskService } from './services/task.service';


@Module({
  imports: [HttpModule],
  providers: [GithubService, TaskService],
  exports: [GithubService, TaskService]
})
export class CommonsModule { }
