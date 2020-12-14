import { Injectable } from '@nestjs/common';
import { BranchInfo, RepoDetails } from '../dtos/repoResponse.dto';
import { TaskParamDto } from '../dtos/taskParam.dto';
import { GithubService } from '../helper-services/github-service';

@Injectable()
export class TaskService {
    constructor(private readonly githubService: GithubService) { }

    async getForkRepoInfo(params: TaskParamDto, fork: boolean): Promise<RepoDetails[]> {
        const repos = await this.githubService.listUserRepositories(params.username);

        let repoDetails: RepoDetails[] = new Array<RepoDetails>();

        for (let i = 0; i < repos.data.length; i++) {

            let repoDetail: RepoDetails;

            if (repos.data[i].fork == fork) {
                let branchInfos: BranchInfo[] = new Array<BranchInfo>();

                const branches = await this.githubService.listBranches(repos.data[i].owner.login, repos.data[i].name);

                for (let j = 0; j < branches.data.length; j++) {
                    branchInfos.push({ name: branches.data[j].name, sha: branches.data[j].commit.sha });
                }

                repoDetail = {
                    name: repos.data[i].name,
                    ownerLogin: repos.data[i].owner.login,
                    branches: branchInfos
                };
            }

            if (repoDetail)
                repoDetails.push(repoDetail);
        }

        return repoDetails;
    }
}