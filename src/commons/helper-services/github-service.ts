
import { HttpException, HttpService, Injectable } from '@nestjs/common';
import config from '../configs/config';

@Injectable()
export class GithubService {

    constructor(private readonly httpService: HttpService) { }

    async listUserRepositories(username: String): Promise<any> {
        try {
            return await this.httpService.get(`${config().baseUrl}/users/${username}/repos`).toPromise();
        } catch (err) {
            console.log(err);
            throw new HttpException(err.message, err.response.status);
        }
    }

    async listBranches(owner: String, repo: String): Promise<any> {
        try {
            return await this.httpService.get(`${config().baseUrl}/repos/${owner}/${repo}/branches`).toPromise();
        } catch (err) {
            console.log(err);
            throw new HttpException(err.message, err.response.status);
        }
    }

}

