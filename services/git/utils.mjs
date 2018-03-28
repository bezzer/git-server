import path from "path";
import fs from "fs-extra";
import Nodegit from "nodegit";

import { REPOS_DIR } from "../../config";

const IS_BARE = 1;

export const getRepoPath = (user, repo) =>
  path.join(REPOS_DIR, user, `${repo}.git`);

export const createRepo = async (user, repo) => {
  const repoPath = getRepoPath(user, repo);
  await fs.mkdirs(repoPath);

  return Nodegit.Repository.init(repoPath, IS_BARE);
};

export const openRepo = (user, repo) =>
  Nodegit.Repository.open(getRepoPath(user, repo));

export const getCommit = (repo, commit) => {
  let result;
  try {
    result = repo.getCommit(commit);
  } catch (error) {
    result = repo.getBranchCommit(commit);
  }

  return result;
};
