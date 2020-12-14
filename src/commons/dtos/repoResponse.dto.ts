export class BranchInfo {
    name: String;
    sha: String;
}

export class RepoDetails {
    name: String;
    ownerLogin: String;
    branches: BranchInfo[];
}